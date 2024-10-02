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
import { useAlertStore } from "../../../useAlertStore";
import { usePasscodeModalStore } from "../../../usePasscodeModalStore";
import { PasscodeModal } from "../../PasscodeModal/PasscodeModal";

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
  const { alert, hideAlert, showAlert } = useAlertStore();
  const { openPasscodeModal } = usePasscodeModalStore();

  useEffect(() => {
    if (messages?.length > 0) {
      try {
        const lastMessage = messages[messages.length - 1];
        const isLastMessage =
          lastMessage.meta.chunks[lastMessage.meta.chunks.length - 1]?.final;

        if (isLastMessage) {
          const jsonResponse = lastMessage.content;
          setSuggestion(jsonResponse);
          setIsLoading(false);
        } else {
          setSuggestion(lastMessage.content);
        }
      } catch (error) {
        showAlert("warning", translation[userLanguage]["ai.error"]);
        const delay = (ms) =>
          new Promise((resolve) => setTimeout(resolve, 4000));
        delay().then(() => {
          hideAlert();
        });
      }
    }
  }, [messages]);

  const fetchUserAnswers = async () => {
    const userId = localStorage.getItem("local_npub");
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

      console.log("USER ANSWERS", userAnswers);

      await submitPrompt([
        {
          content: `The individual is learning about computer science and how to code in 130 steps, starting with elementary knowledge and ending with the ability to create apps and understand algorithms. Based on the user's completed steps: ${JSON.stringify(
            userAnswers
          )}, suggest the next best topic for them to learn. Explain why it's best. Respond as if you're talking to the individual. Do not include code or headers headers/titles formatting - at most simply bold test to indicate sections. Format in minimalist markdown. The user is speaking in ${
            userLanguage === "en" ? "English" : "Spanish"
          }`,
          role: "user",
        },
      ]);
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      setSuggestion("Error fetching suggestion");
      setIsLoading(false);
    }
  };

  const handleModalCheck = (functionCall) => {
    const storedPasscode = localStorage.getItem("features_passcode");
    if (storedPasscode !== import.meta.env.VITE_PATREON_FEATURES_PASSCODE) {
      openPasscodeModal();
    } else {
      functionCall();
    }
  };

  return (
    <>
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
                  colorScheme="purple"
                  onMouseDown={() => handleModalCheck(handleSuggestNext)}
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
              <br />
              <VStack align="stretch">
                <b>
                  {" "}
                  {
                    translation[userLanguage][
                      "modal.adaptiveLearning.stepsTaken"
                    ]
                  }
                </b>
                {steps[userLanguage].map((step, index) => (
                  <Text
                    key={index}
                    color={index <= currentStep - 1 ? "green.500" : "gray.500"}
                  >
                    {index !== 0 ? index + ". " + step.title : ""}
                  </Text>
                ))}
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onMouseDown={onClose}>
              {translation[userLanguage]["button.close"]}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <PasscodeModal userLanguage={userLanguage} />
    </>
  );
};
