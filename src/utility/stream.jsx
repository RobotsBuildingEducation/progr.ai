import React, { useState } from "react";
import { ReadableStream } from "web-streams-polyfill";

// Encrypt the API key
export const encryptApiKey = (apiKey, secret) => {
  return CryptoJS.AES.encrypt(apiKey, secret).toString();
};

// Decrypt the API key
export const decryptApiKey = (encryptedApiKey, secret) => {
  const bytes = CryptoJS.AES.decrypt(encryptedApiKey, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};
// Converts the OpenAI API params + chat messages list + an optional AbortSignal into a shape that
// the fetch interface expects.
export const getOpenAiRequestOptions = (
  { apiKey, model, ...restOfApiParams },
  messages,
  signal
) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  method: "POST",
  body: JSON.stringify({
    model,
    // Includes all settings related to how the user wants the OpenAI API to execute their request.
    ...restOfApiParams,
    messages,
    stream: true,
  }),
  signal,
});

const CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";

const textDecoder = new TextDecoder("utf-8");

// Takes a set of fetch request options and calls the onIncomingChunk and onCloseStream functions
// as chunks of a chat completion's data are returned to the client, in real-time.
export const openAiStreamingDataHandler = async (
  requestOpts,
  onIncomingChunk,
  onCloseStream
) => {
  const beforeTimestamp = Date.now();

  const response = await fetch(CHAT_COMPLETIONS_URL, requestOpts);

  if (!response.ok) {
    throw new Error(
      `Network response was not ok: ${response.status} - ${response.statusText}`
    );
  }

  if (!response.body) {
    throw new Error("No body included in POST response object");
  }

  let content = "";
  let role = "";
  const textDecoder = new TextDecoder();

  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      return pump();
      async function pump() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          return pump();
        });
      }
    },
  });

  let buffer = "";

  for await (const newData of stream) {
    const decodedData = textDecoder.decode(newData);
    buffer += decodedData;

    let lines = buffer.split("\n");
    buffer = lines.pop(); // Keep the last line as it might be incomplete

    for (let line of lines) {
      // console.log("line", line);
      line = line.replace(/^data:\s*/, "").trim();
      if (line === "" || line === "[DONE]") continue;

      try {
        const chunk = JSON.parse(line);

        const contentChunk = (chunk.choices[0].delta.content ?? "").replace(
          /^`\s*/,
          "`"
        );
        const roleChunk = chunk.choices[0].delta.role ?? "";

        const isFinal = chunk.choices[0].finish_reason === "stop";
        // console.log("isFinal", isFinal);

        content = `${content}${contentChunk}`;
        role = `${role}${roleChunk}`;

        onIncomingChunk(contentChunk, roleChunk, isFinal);
      } catch (e) {
        console.error("JSON parsing error:", e);
        // Optionally: Log the erroneous line for debugging
        console.error("Failed line:", line);
      }
    }
  }

  onCloseStream(beforeTimestamp);

  return { content, role };
};

const MILLISECONDS_PER_SECOND = 1000;

// Utility method for transforming a chat message decorated with metadata to a more limited shape
// that the OpenAI API expects.
const officialOpenAIParams = ({ content, role }) => ({ content, role });

// Utility method for transforming a chat message that may or may not be decorated with metadata
// to a fully-fledged chat message with metadata.
const createChatMessage = ({ content, role, ...restOfParams }) => ({
  content,
  role,
  timestamp: restOfParams.timestamp ?? Date.now(),
  meta: {
    loading: false,
    responseTime: "",
    chunks: [],
    ...restOfParams.meta,
  },
});

// Utility method for updating the last item in a list.
export const updateLastItem = (msgFn) => (currentMessages) =>
  currentMessages.map((msg, i) => {
    if (currentMessages.length - 1 === i) {
      return msgFn(msg);
    }
    return msg;
  });

export const useChatCompletion = (apiParams) => {
  const [messages, _setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null);

  // Abort an in-progress streaming response
  const abortResponse = () => {
    if (controller) {
      controller.abort();
      setController(null);
    }
  };

  // Reset the messages list as long as a response isn't being loaded.
  const resetMessages = () => {
    if (!loading) {
      _setMessages([]);
    }
  };

  // Overwrites all existing messages with the list of messages passed to it.
  const setMessages = (newMessages) => {
    if (!loading) {
      _setMessages(newMessages.map(createChatMessage));
    }
  };

  // When new data comes in, add the incremental chunk of data to the last message.
  const handleNewData = (chunkContent, chunkRole, isFinal = false) => {
    _setMessages(
      updateLastItem((msg) => ({
        content: `${msg.content}${chunkContent}`,
        role: `${msg.role}${chunkRole}`,
        timestamp: 0,
        meta: {
          ...msg.meta,
          chunks: [
            ...msg.meta.chunks,
            {
              content: chunkContent,
              role: chunkRole,
              timestamp: Date.now(),
              final: isFinal,
            },
          ],
        },
      }))
    );
  };

  // Handles what happens when the stream of a given completion is finished.
  const closeStream = (beforeTimestamp) => {
    // Determine the final timestamp, and calculate the number of seconds the full request took.
    const afterTimestamp = Date.now();
    const diffInSeconds =
      (afterTimestamp - beforeTimestamp) / MILLISECONDS_PER_SECOND;
    const formattedDiff = diffInSeconds.toFixed(2) + " sec.";

    // Update the messages list, specifically update the last message entry with the final
    // details of the full request/response.
    _setMessages(
      updateLastItem((msg) => ({
        ...msg,
        timestamp: afterTimestamp,
        meta: {
          ...msg.meta,
          loading: false,
          responseTime: formattedDiff,
        },
      }))
    );
  };

  const submitPrompt = React.useCallback(
    async (newMessages, isConversation = false, isCheckAnswer = false) => {
      if (messages[messages.length - 1]?.meta?.loading) return;
      if (!newMessages || newMessages.length < 1) {
        return;
      }

      setLoading(true);
      let copyMessages = messages;
      for (let i = 0; i < copyMessages.length; i++) {
        if (isConversation) {
          if (
            copyMessages[i].role === "user" &&
            i !== copyMessages.length - 1
          ) {
            copyMessages.splice(i, 1);
            // copyMessages[i].role = "user";
            // copyMessages[i].content = "new message: " + copyMessages[i].content;
          }
        }
      }

      const updatedMessages = [
        ...(isCheckAnswer ? [] : copyMessages),
        ...newMessages.map(createChatMessage),
        createChatMessage({
          content: "",
          role: "",
          timestamp: 0,
          meta: { loading: true },
          what: false,
        }),
      ];

      _setMessages(updatedMessages);

      const newController = new AbortController();
      const signal = newController.signal;
      setController(newController);

      const requestOpts = getOpenAiRequestOptions(
        apiParams,
        updatedMessages
          .filter((m, i) => updatedMessages.length - 1 !== i)
          .map(officialOpenAIParams),
        signal
      );

      try {
        await openAiStreamingDataHandler(
          requestOpts,
          handleNewData,
          closeStream
        );
      } catch (err) {
        if (signal.aborted) {
          console.error(`Request aborted`, err);
        } else {
          console.error(`Error during chat response streaming`, err);
        }
      } finally {
        setController(null);
        setLoading(false);
      }
    },
    [messages]
  );

  return {
    messages,
    loading,
    submitPrompt,
    abortResponse,
    resetMessages,
    setMessages,
  };
};
