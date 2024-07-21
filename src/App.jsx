import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Input,
  HStack,
  Progress,
} from "@chakra-ui/react";
import MonacoEditor from "@monaco-editor/react";
import { useChatCompletion } from "./hooks/useChatCompletion";

// Define the steps with a single question and answer per step
const steps = [
  {
    title: "Welcome to Progr!",
    description:
      "Press 'Let's start' to begin your journey in learning how to code.",
  },
  {
    title: "Step 1: Introduction to Variables",
    description:
      "In this step, you will learn about variables and how to use them in your code.",
    isText: true,
    question: {
      questionText: "What is a variable?",
      answer: "",
    },
  },
  {
    title: "Step 2: Declaring Variables in JavaScript",
    description:
      "In this step, you will learn how to declare a variable in JavaScript.",
    isCode: true,
    question: {
      questionText: "How do you declare a variable in JavaScript?",
      answer: "",
    },
  },
  // Add more steps as needed
];

function Step({ step, onNext, onBack }) {
  const [inputValue, setInputValue] = useState(step?.question?.answer || "");
  const [isSending, setIsSending] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // New state for checking correctness
  const [feedback, setFeedback] = useState(""); // New state for storing feedback
  const { messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsCorrect(null); // Reset correctness state when input changes
    setFeedback(""); // Reset feedback state when input changes
  };

  const handleCodeChange = (value) => {
    setInputValue(value);
    setIsCorrect(null); // Reset correctness state when input changes
    setFeedback(""); // Reset feedback state when input changes
  };

  const handleAnswerClick = async () => {
    setIsSending(true);
    try {
      const response = await submitPrompt([
        {
          content: `The user is answering the following question "${step.question.questionText}" with the following answer "${inputValue}". Is this answer correct? Return the response using a json interface like { isCorrect: boolean, feedback: string }`,
          role: "user",
        },
      ]);

      if (response && response.length > 0 && response[0].content) {
        const jsonResponse = JSON.parse(response[0].content);
        setIsCorrect(jsonResponse.isCorrect);
        setFeedback(jsonResponse.feedback);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
    setIsSending(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        const jsonResponse = JSON.parse(lastMessage.content);
        setIsCorrect(jsonResponse.isCorrect);
        setFeedback(jsonResponse.feedback);
      }
    }
  }, [messages]);

  useEffect(() => {
    // Clear input fields when moving to the next question
    setInputValue(step?.question?.answer || "");
  }, [step]);

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl">{step.title}</Text>
      <Text>{step.description}</Text>
      {step.question && <Text>{step.question.questionText}</Text>}
      {step.isText && (
        <Input
          placeholder="Type your response here..."
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
      {step.isCode && (
        <Box width="100%" height="400px">
          <MonacoEditor
            height="400px"
            language="javascript"
            theme="light"
            value={inputValue}
            onChange={handleCodeChange}
          />
        </Box>
      )}
      <HStack spacing={4}>
        {onBack && (
          <Button colorScheme="teal" onClick={onBack}>
            Back
          </Button>
        )}
        {step.title === "Welcome to Progr!" ? (
          <Button colorScheme="teal" onClick={onNext}>
            Let's start
          </Button>
        ) : (
          step.question && (
            <Button
              colorScheme="teal"
              onClick={handleAnswerClick}
              isLoading={isSending}
            >
              Answer
            </Button>
          )
        )}
        {isCorrect === true && (
          <Button colorScheme="teal" onClick={onNext}>
            Next Step
          </Button>
        )}
      </HStack>
      {feedback && (
        <Box mt={4} p={4} borderWidth={1} borderRadius="lg" width="100%">
          <Text color={isCorrect ? "green.500" : "red.500"}>{feedback}</Text>
        </Box>
      )}
    </VStack>
  );
}

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentStepIndex((prevIndex) => prevIndex + 1);
  };

  const handleBackClick = () => {
    setCurrentStepIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <Box textAlign="center" fontSize="xl" p={5}>
      <Progress value={(currentStepIndex / steps.length) * 100} mb={4} />
      {currentStepIndex < steps.length ? (
        <Step
          step={steps[currentStepIndex]}
          onNext={handleNextClick}
          onBack={currentStepIndex > 0 ? handleBackClick : null}
        />
      ) : (
        <Text>Congratulations! You've completed all the steps.</Text>
      )}
    </Box>
  );
}

export default App;
