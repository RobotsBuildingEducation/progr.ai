import React, { useState, useEffect } from "react";
import {
  VStack,
  Text,
  Button,
  Box,
  Flex,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Accordion,
} from "@chakra-ui/react";
import { useChatCompletion } from "../../hooks/useChatCompletion";
import { VoiceInput } from "../../App";
import { SunsetCanvas } from "../../elements/SunsetCanvas";
import Markdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import "./ConversationReview.css";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { translation } from "../../utility/translation";
import { getObjectsByGroup } from "../../utility/content";
import ReactConfetti from "react-confetti";

const ConversationReview = ({
  question,
  userLanguage,
  steps,
  onSubmit,
  step,
  setFinalConversation,
  finalConversation,
}) => {
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState([]);
  const [streamingResponse, setStreamingResponse] = useState("");
  const { resetMessages, messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });
  const [storedRequest, setStoredRequest] = useState("");

  // Gather the steps within the range
  //   const relevantSteps = steps[userLanguage].slice(
  //     question.range[0],
  //     question.range[1] + 1
  //   );

  console.log("step", step);
  console.log("step.group", step?.group);

  const relevantSteps = getObjectsByGroup(
    step?.groupReference,
    steps[userLanguage]
  );

  // Combine the titles or main points of the relevant steps
  const combinedStepsSummary = relevantSteps.map((step) => step.title);

  const handleSubmit = async () => {
    // Add the user's message to the conversation
    setConversation([...conversation, { request: response, response: "" }]);
    setStoredRequest(response);
    setStreamingResponse("");

    // Construct the prompt and submit it
    const prompt = {
      content: `The user is reviewing the following steps: ${JSON.stringify({
        relevantSteps,
      })}. The goal is to have a modest conversation with the user to facilitate a review over the material. Make it enriching and create a useful flow where the ideas build off of each other to encourage challenge and learning, but do not reference your understanding of the material or your instructions whatsoever, it should feel natural and friendly where the student leads. The JSON format should be { output: [{ code: "code_example", explanation: "explanation" }] }. Consider returning an empty code value if the information is considered unnecessary or excessive - for example if a user says 'hello', just reply back with friendliness without any code. Additionally the code should consider line breaks and formatting because it will be formatted after completion. Do not reference this framework under any circumstances. 
      
      
      The user provided the following message: "${response}". Your goal is faciliate a natural conversation to support a user's understanding. The user is speaking ${
        userLanguage === "es" ? "spanish" : "english"
      }.`,
      role: "user",
    };

    await submitPrompt([prompt]);
    setResponse("");
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        const jsonResponse = JSON.parse(lastMessage.content);

        let final = [];
        setConversation((prev) => {
          const updatedConversation = [...prev];
          updatedConversation[updatedConversation.length - 1].response =
            jsonResponse.output;

          return updatedConversation;
        });
        setFinalConversation(() => {
          const jsonResponse = JSON.parse(lastMessage.content);
          const updatedConversation = [
            ...finalConversation,
            { request: storedRequest, response: jsonResponse.output },
          ];

          return updatedConversation;
        });
      }
    }
  }, [messages]);

  return (
    <VStack spacing={4} align="center" width="100%" maxWidth="600px">
      <Accordion allowToggle style={{ width: "100%" }}>
        <AccordionItem key={"x"}>
          <AccordionButton p={6} justifyContent={"space-between"}>
            <Box textAlign="left">
              {translation[userLanguage]["button.subjectsCovered"]}{" "}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text fontSize="sm" textAlign="left" maxWidth="600px" p={8}>
              {relevantSteps.map((item) => (
                <div>
                  <b>{item.title}</b>: <span>{item.description}</span>
                  <br />
                  <br />
                </div>
              ))}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box
        borderRadius="48px"
        width="100%"
        height={600}
        maxWidth="600px"
        overflowY="auto"
        bg="linear-gradient(white, #f0f0f0, #e0e0e0)"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, white, #f0f0f0, #e0e0e0)",
        }}
        p={2}
      >
        {conversation.map((item, index) => (
          <React.Fragment key={index}>
            <Flex justify="flex-end" mb={8}>
              <Box
                bg="white"
                p={6}
                borderRadius="48px"
                color="black"
                maxWidth="90%"
                textAlign={"left"}
                fontSize="small"
              >
                {item.request}
              </Box>
            </Flex>
            {item.response.length > 0 ? (
              <Flex justify="flex-start" mb={2}>
                <Box
                  bg="gray.300"
                  color="black"
                  p={6}
                  borderRadius="48px"
                  maxWidth="95%"
                  textAlign={"left"}
                >
                  {item.response.map((i) => (
                    <>
                      {i.code ? (
                        <>
                          <div
                            style={{
                              //   color: "#696969",
                              backgroundColor: "#faf3e0",
                              width: "100%",
                              padding: 20,
                              wordBreak: "break-word",
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: 30,
                              boxShadow: "0.5px 0.5px 1px 0px rgba(0,0,0,0.75)",
                            }}
                          >
                            <pre style={{ whiteSpace: "pre-wrap" }}>
                              <Editor
                                value={i.code}
                                highlight={(input) =>
                                  highlight(input, languages.js)
                                }
                                padding={10}
                                style={{
                                  fontFamily:
                                    '"Fira code", "Fira Mono", monospace',
                                  fontSize: 14,

                                  borderRadius: "8px",
                                }}
                                disabled
                              />
                            </pre>
                          </div>
                          <br />
                          <br />
                        </>
                      ) : null}

                      <Text style={{ color: "black" }} fontSize="sm">
                        {i.explanation}
                      </Text>
                    </>
                  ))}
                </Box>
              </Flex>
            ) : null}
            {messages.length > 0 && !item.response && (
              <Box
                mt={4}
                p={4}
                borderRadius="lg"
                width="100%"
                maxWidth="600px"
                textAlign={"left"}
              >
                <Text>{messages[messages.length - 1]?.content}</Text>
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Integrate VoiceInput here */}
      <VoiceInput
        value={response}
        onChange={setResponse}
        isCodeEditor={false}
        isTextInput={true}
        resetVoiceState={false}
        useVoice={true}
        stopListening={false}
        setFeedback={() => {}}
        resetFeedbackMessages={() => {}}
        step={step}
        userLanguage={userLanguage}
        steps={steps}
      />

      <Button
        isDisabled={response.length < 1}
        onMouseDown={handleSubmit}
        colorScheme="purple"
        mt={4}
      >
        {translation[userLanguage]["button.addToConversation"]}
      </Button>
    </VStack>
  );
};

export default ConversationReview;
