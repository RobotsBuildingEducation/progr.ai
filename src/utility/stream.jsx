import React, { useState } from "react";
import { ReadableStream } from "web-streams-polyfill";

// Converts the OpenAI API params + chat messages list + an optional AbortSignal into a shape that
// the fetch interface expects.
export const getOpenAiRequestOptions = (
  { apiKey, model, ...restOfApiParams },
  messages,
  signal
) => ({
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${apiKey}`,
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

// const CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";
const CHAT_COMPLETIONS_URL =
  "https://us-central1-progr-ai.cloudfunctions.net/app/prompt";

const textDecoder = new TextDecoder("utf-8");

// Utility function to simulate a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Takes a set of fetch request options and calls the onIncomingChunk and onCloseStream functions
// as chunks of a chat completion's data are returned to the client, in real-time.
/**
 * Handles streaming data from the OpenAI API, properly assembling and parsing JSON objects from incoming data chunks.
 * @param {Object} requestOpts - The options for the fetch request.
 * @param {Function} onIncomingChunk - Callback function to handle each parsed content chunk.
 * @param {Function} onCloseStream - Callback function to handle the closing of the stream.
 * @returns {Promise<{ content: string, role: string }>} - The assembled content and role from the stream.
 */
/**
 * Handles streaming data from the OpenAI API, properly assembling and parsing JSON objects from incoming data chunks.
 * @param {Object} requestOpts - The options for the fetch request.
 * @param {Function} onIncomingChunk - Callback function to handle each parsed content chunk.
 * @param {Function} onCloseStream - Callback function to handle the closing of the stream.
 * @returns {Promise<{ content: string, role: string }>} - The assembled content and role from the stream.
 */
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
  let buffer = "";

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let done = false;

  // Utility function to simulate a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // Process the buffer to extract complete data messages
      let dataMessages = buffer.split("\n\n");
      buffer = dataMessages.pop(); // Keep the incomplete part

      for (let dataMessage of dataMessages) {
        dataMessage = dataMessage.trim();

        if (dataMessage === "") continue;

        if (dataMessage.startsWith("data:")) {
          const dataStr = dataMessage.slice("data:".length).trim();

          if (dataStr === "[DONE]") {
            // Indicate that the final chunk has been received
            onIncomingChunk("", "", null, true);
            onCloseStream(beforeTimestamp);
            return { content, role };
          } else {
            try {
              const parsed = JSON.parse(dataStr);

              const contentChunk = parsed.choices?.[0]?.delta?.content ?? "";
              const roleChunk = parsed.choices?.[0]?.delta?.role ?? "";
              const finishReason = parsed.choices?.[0]?.finish_reason ?? null;

              if (contentChunk || roleChunk) {
                content += contentChunk;
                role += roleChunk;

                // Introduce a small delay to simulate streaming animation
                await delay(5); // Adjust the delay as needed (in milliseconds)

                // Call the callback with the new data
                onIncomingChunk(contentChunk, roleChunk, parsed, false);
              }

              // Check if this is the final chunk based on finish_reason
              if (finishReason) {
                // Indicate that the final chunk has been received
                onIncomingChunk("", "", null, true);
              }
            } catch (error) {
              console.error("Error parsing JSON:", error, "Data:", dataStr);
              // Handle parsing error, perhaps ignore this line
            }
          }
        }
      }
    }
  }

  // Process any remaining data in the buffer
  if (buffer.trim() !== "") {
    const dataMessage = buffer.trim();

    if (dataMessage.startsWith("data:")) {
      const dataStr = dataMessage.slice("data:".length).trim();

      if (dataStr === "[DONE]") {
        // Indicate that the final chunk has been received
        onIncomingChunk("", "", null, true);
        onCloseStream(beforeTimestamp);
        return { content, role };
      } else {
        try {
          const parsed = JSON.parse(dataStr);

          const contentChunk = parsed.choices?.[0]?.delta?.content ?? "";
          const roleChunk = parsed.choices?.[0]?.delta?.role ?? "";
          const finishReason = parsed.choices?.[0]?.finish_reason ?? null;

          if (contentChunk || roleChunk) {
            content += contentChunk;
            role += roleChunk;

            // Introduce a small delay to simulate streaming animation
            await delay(5); // Adjust the delay as needed (in milliseconds)

            // Call the callback with the new data
            onIncomingChunk(contentChunk, roleChunk, parsed, false);
          }

          // Check if this is the final chunk based on finish_reason
          if (finishReason) {
            // Indicate that the final chunk has been received
            onIncomingChunk("", "", null, true);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error, "Data:", dataStr);
          // Handle parsing error, perhaps ignore this line
        }
      }
    }
  }

  // Indicate that the final chunk has been received
  onIncomingChunk("", "", null, true);
  onCloseStream(beforeTimestamp);
  return { content, role };
};

/**
 * Extracts complete JSON objects from a string buffer.
 * @param {string} buffer - The string buffer containing JSON data.
 * @returns {Array<{ jsonString: string, endIndex: number }>} - An array of complete JSON objects and their end positions in the buffer.
 */
function extractJSONObjects(buffer) {
  const jsonObjects = [];
  let startIndex = null;
  let braceCount = 0;

  for (let i = 0; i < buffer.length; i++) {
    const char = buffer[i];

    if (char === "{") {
      if (braceCount === 0) {
        startIndex = i;
      }
      braceCount++;
    } else if (char === "}") {
      braceCount--;
      if (braceCount === 0 && startIndex !== null) {
        const jsonString = buffer.substring(startIndex, i + 1);
        jsonObjects.push({ jsonString, endIndex: i + 1 });
        startIndex = null;
      }
    }
  }

  return jsonObjects;
}

/**
 * Example usage of the openAiStreamingDataHandler function.
 */
async function exampleUsage() {
  const requestOpts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YOUR_API_KEY`,
    },
    body: JSON.stringify({
      // Your request payload
    }),
  };

  const onIncomingChunk = (contentChunk, roleChunk, parsedData) => {
    // Handle each incoming chunk (e.g., update the UI)
    console.log("New chunk received:", contentChunk);
  };

  const onCloseStream = (timestamp) => {
    // Handle the closing of the stream
    console.log("Stream closed at:", new Date(timestamp).toISOString());
  };

  try {
    const result = await openAiStreamingDataHandler(
      requestOpts,
      onIncomingChunk,
      onCloseStream
    );

    console.log("Final content:", result.content);
    console.log("Role:", result.role);
  } catch (error) {
    console.error("Error during streaming:", error);
  }
}

const MILLISECONDS_PER_SECOND = 1000;

// Utility method for transforming a chat message decorated with metadata to a more limited shape
// that the OpenAI API expects.
const officialOpenAIParams = ({ content, role }) => ({ content, role });

// Utility method for transforming a chat message that may or may not be decorated with metadata
// to a fully-fledged chat message with metadata.
const createChatMessage = ({ content, role, ...restOfParams }) => {
  return {
    content,
    role,
    timestamp: restOfParams.timestamp ?? Date.now(),
    meta: {
      loading: false,
      responseTime: "",
      chunks: [],
      ...restOfParams.meta,
    },
  };
};

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

  // When new data comes in, add the incremental chunk of data to the last message with simulated delay
  // When new data comes in, add the incremental chunk of data to the last message
  const handleNewData = async (
    chunkContent,
    chunkRole,
    chunkObject = null,
    isFinal = false
  ) => {
    _setMessages(
      updateLastItem((msg) => {
        const updatedChunks = [
          ...msg.meta.chunks,
          {
            content: chunkContent,
            role: chunkRole,
            timestamp: Date.now(),
            final: isFinal,
          },
        ];

        return {
          ...msg,
          content: `${msg.content}${chunkContent}`,
          role: msg.role || chunkRole,
          meta: {
            ...msg.meta,
            chunks: updatedChunks,
          },
        };
      })
    );
  };

  // Handles what happens when the stream of a given completion is finished.
  const closeStream = (beforeTimestamp) => {
    const afterTimestamp = Date.now();
    const diffInSeconds =
      (afterTimestamp - beforeTimestamp) / MILLISECONDS_PER_SECOND;
    const formattedDiff = diffInSeconds.toFixed(2) + " sec.";

    _setMessages(
      updateLastItem((msg) => {
        return {
          ...msg,
          timestamp: afterTimestamp,
          meta: {
            ...msg.meta,
            loading: false,
            responseTime: formattedDiff,
            done: true,
          },
        };
      })
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
          if (copyMessages[i].role !== "user") {
            copyMessages[i].role = "user";
            copyMessages[i].content = "new message: " + copyMessages[i].content;
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
