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
import ReactBash from "react-bash";
import { useChatCompletion } from "./hooks/useChatCompletion";

const steps = [
  {
    title: "Welcome to the Program-AI App!",
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
    isTerminal: false,
    question: {
      questionText: "How do you declare a variable in JavaScript?",
      answer: "",
    },
  },
  {
    title: "Step 3: Terminal Code Example",
    description: "In this step, you will type your code as if in a terminal.",
    isCode: true,
    isTerminal: true,
    question: {
      questionText: "Type a command using the command line",
      answer: "",
    },
  },
  // Add more steps as needed
];

const fileSystem = {
  "/": {
    home: {
      user: {
        documents: {
          "file1.txt": "This is the content of file1.txt",
          "file2.txt": "This is the content of file2.txt",
        },
        pictures: {},
      },
    },
    etc: {
      config: {
        "config1.cfg": "",
        "config2.cfg": "",
      },
    },
    var: {
      log: {
        "log1.log": "",
        "log2.log": "",
      },
    },
  },
};

const envVariables = {
  USER: "mockuser",
  PATH: "/usr/bin:/bin:/usr/sbin:/sbin",
};

function TerminalComponent({ inputValue, setInputValue, isSending }) {
  const [structure, setStructure] = useState(fileSystem);
  const [history, setHistory] = useState([
    {
      value:
        "Welcome to the mock terminal. Use basic commands to navigate the file system.",
    },
  ]);
  const [cwd, setCwd] = useState("/");

  useEffect(() => {
    if (isSending) {
      executeCommand(inputValue);
    }
  }, [isSending]);

  const executeCommand = (command) => {
    const parts = command.split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);

    const customSetup = {
      help: {
        exec: () => {
          setHistory([
            ...history,
            {
              value:
                "Available commands: help, clear, ls, cat, mkdir, cd, pwd, echo, printenv, whoami",
            },
          ]);
        },
      },
      clear: {
        exec: () => {
          setHistory([]);
        },
      },
      ls: {
        exec: () => {
          const currentDir =
            cwd === "/"
              ? structure
              : cwd
                  .split("/")
                  .filter((p) => p)
                  .reduce((acc, dir) => acc[dir], structure);
          const content = Object.keys(currentDir).join("  ");
          setHistory([...history, { value: content }]);
        },
      },
      cat: {
        exec: () => {
          const filePath = args[0];
          const fileContent = filePath
            .split("/")
            .filter((p) => p)
            .reduce((acc, dir) => acc[dir], structure);
          if (typeof fileContent === "string") {
            setHistory([...history, { value: fileContent }]);
          } else {
            setHistory([
              ...history,
              { value: `cat: ${filePath}: No such file` },
            ]);
          }
        },
      },
      mkdir: {
        exec: () => {
          const newDir = args[0];
          const currentDir =
            cwd === "/"
              ? structure
              : cwd
                  .split("/")
                  .filter((p) => p)
                  .reduce((acc, dir) => acc[dir], structure);

          if (!currentDir[newDir]) {
            currentDir[newDir] = {};
            setStructure({ ...structure });
            setHistory([...history, { value: `Directory ${newDir} created.` }]);
          } else {
            setHistory([
              ...history,
              {
                value: `bash: mkdir: cannot create directory '${newDir}': File exists`,
              },
            ]);
          }
        },
      },
      cd: {
        exec: () => {
          const newDir = args[0] || "/";
          const path = newDir === "/" ? [] : newDir.split("/").filter((p) => p);
          let currentDir = structure;
          let newCwd = "/";

          for (let i = 0; i < path.length; i++) {
            if (currentDir[path[i]]) {
              currentDir = currentDir[path[i]];
              newCwd += (newCwd === "/" ? "" : "/") + path[i];
            } else {
              setHistory([
                ...history,
                {
                  value: `bash: cd: ${newDir}: No such file or directory`,
                },
              ]);
              return;
            }
          }

          setCwd(newCwd);
          setHistory([...history, { value: `user@mock-terminal:${newCwd}$` }]);
        },
      },
      pwd: {
        exec: () => {
          setHistory([...history, { value: cwd }]);
        },
      },
      echo: {
        exec: () => {
          const message = args.join(" ");
          setHistory([...history, { value: message }]);
        },
      },
      printenv: {
        exec: () => {
          const envList = Object.entries(envVariables)
            .map(([key, value]) => `${key}=${value}`)
            .join("\n");
          setHistory([...history, { value: envList }]);
        },
      },
      whoami: {
        exec: () => {
          setHistory([...history, { value: envVariables.USER }]);
        },
      },
    };

    if (customSetup[cmd]) {
      customSetup[cmd].exec();
    } else {
      setHistory([...history, { value: `bash: ${cmd}: command not found` }]);
    }
  };

  return (
    <ReactBash
      structure={structure}
      history={history}
      prefix={`user@mock-terminal:${cwd}$`}
    />
  );
}

function Step({ step, onNext, onBack }) {
  const [inputValue, setInputValue] = useState(step?.question?.answer || "");
  const [isSending, setIsSending] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // New state for checking correctness
  const [feedback, setFeedback] = useState(""); // New state for storing feedback
  const { messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  const handleInputChange = (value) => {
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
          onChange={(e) => handleInputChange(e.target.value)}
        />
      )}
      {step.isCode && !step.isTerminal && (
        <Box width="100%" height="400px">
          <MonacoEditor
            height="400px"
            language="javascript"
            theme="light"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Box>
      )}
      {step.isCode && step.isTerminal && (
        <Box>
          <Input
            placeholder="Enter command"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <br />
          <br />
          <TerminalComponent
            inputValue={inputValue}
            setInputValue={setInputValue}
            isSending={isSending}
          />
        </Box>
      )}
      <HStack spacing={4}>
        {onBack && (
          <Button colorScheme="teal" onClick={onBack}>
            Back
          </Button>
        )}
        {step.title === "Welcome to the Program-AI App!" ? (
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
      {messages.length > 0 && !feedback && (
        <Box mt={4} p={4} borderWidth={1} borderRadius="lg" width="100%">
          <Text fontWeight="bold">Feedback:</Text>
          <Text>{messages[messages.length - 1]?.content}</Text>
        </Box>
      )}
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
