import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useChatCompletion } from "../../../hooks/useChatCompletion";

import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../database/firebaseResources";
import { translation } from "../../../utility/translation";

export const KnowledgeLedgerModal = ({
  isOpen,
  onClose,
  steps,
  currentStep,
  userLanguage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const { submitPrompt, messages, resetMessages } = useChatCompletion();

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        const jsonResponse = lastMessage.content;
        setSuggestion(jsonResponse);
        setIsLoading(false);
      } else {
        setSuggestion(lastMessage.content);
      }
    }
  }, [messages]);

  const fetchUserAnswers = async () => {
    const userId = localStorage.getItem("local_publicKey");
    const answersRef = collection(database, `users/${userId}/answers`);
    const answerDocs = await getDocs(answersRef);
    const answers = answerDocs.docs.map((doc) => doc.data());
    return answers;
  };

  const handleSuggestNext = async () => {
    setIsLoading(true);
    setSuggestion("");
    resetMessages();
    try {
      const userAnswers = await fetchUserAnswers();
      console.log("user answers", userAnswers);
      await submitPrompt([
        {
          content: `Based on the user's completed steps and their answers: ${JSON.stringify(
            userAnswers
          )}, suggest the next best topic for them to learn. Explain why it's best. Respond as if you're talking to the individual. Do not include code or headers headers/titles formatting - at most simply bold test to indicate sections. Format in minimalist markdown.`,
          role: "user",
        },
      ]);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      setSuggestion("Error fetching suggestion");
      setIsLoading(false);
    }
  };

  console.log("suggestion", suggestion);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {" "}
          {translation[userLanguage]["modal.adaptiveLearning.title"]}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll">
          <Box maxHeight="400px">
            <Box mt={4}>
              <Button
                colorScheme="green"
                onClick={handleSuggestNext}
                isDisabled={isLoading}
                variant={"outline"}
              >
                {isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  translation[userLanguage][
                    "modal.adaptiveLearning.recommendButton"
                  ]
                )}
              </Button>
              <br />
              <br />
              {suggestion && (
                <Box
                  mt={4}
                  style={{
                    width: "100%",
                  }}
                >
                  <Markdown
                    components={ChakraUIRenderer()}
                    children={suggestion}
                    // skipHtml
                  />
                </Box>
              )}
            </Box>
            <VStack align="stretch">
              <b>
                {" "}
                {translation[userLanguage]["modal.adaptiveLearning.stepsTaken"]}
              </b>
              {steps[localStorage.getItem("userLanguage")].map(
                (step, index) => (
                  <Text
                    key={index}
                    color={index <= currentStep - 1 ? "green.500" : "gray.500"}
                  >
                    {index !== 0 ? index + ". " + step.title : ""}
                  </Text>
                )
              )}
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>
            {translation[userLanguage]["button.close"]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
