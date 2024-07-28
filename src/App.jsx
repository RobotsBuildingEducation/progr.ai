import "regenerator-runtime/runtime";
import "@babel/polyfill";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  Input,
  HStack,
  Spinner,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import MonacoEditor from "@monaco-editor/react";
import ReactBash from "react-bash";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useChatCompletion } from "./hooks/useChatCompletion";
import { SunsetCanvas } from "./elements/SunsetCanvas";
import EducationalModal from "./components/LearnModal/EducationalModal";

const phraseToSymbolMap = {
  equals: "=",
  equal: "=",
  plus: "+",
  minus: "-",
  asterisk: "*",
  slash: "/",
  "open parenthesis": "(",
  "close parenthesis": ")",
  "open bracket": "[",
  "close bracket": "]",
  "open brace": "{",
  "close brace": "}",
  semicolon: ";",
};

const applySymbolMappings = (text) => {
  let modifiedText = text.toLowerCase();
  Object.keys(phraseToSymbolMap).forEach((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, "gi");
    modifiedText = modifiedText.replace(regex, phraseToSymbolMap[phrase]);
  });
  return modifiedText;
};

const AwardScreen = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/step/0"); // Navigate to the first step to restart the quiz
  };

  return (
    <Box textAlign="center" p={5}>
      <Text fontSize="2xl" fontWeight="bold">
        Congratulations!
      </Text>
      <Text>You have completed the quiz. Well done!</Text>
      <Button mt={4} colorScheme="teal" onClick={handleRestart}>
        Restart Quiz
      </Button>
    </Box>
  );
};

const VoiceInput = ({
  value,
  onChange,
  isCodeEditor,
  isTextInput = false,
  resetVoiceState,
  useVoice = false,
  isTerminal = false,
  stopListening,
  setFeedback,
  resetFeedbackMessages,
  step,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [aiListening, setAiListening] = useState(false);
  const [aiTranscript, setAiTranscript] = useState("");
  const [generateResponse, setGenerateResponse] = useState(false);
  const { resetMessages, messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  // New variables for educational material
  const {
    resetMessages: resetEducationalMessages,
    messages: educationalMessages,
    submitPrompt: submitEducationalPrompt,
  } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  const [educationalContent, setEducationalContent] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    let modifiedTranscript = transcript.toLowerCase();

    if (isCodeEditor) {
      modifiedTranscript = applySymbolMappings(modifiedTranscript);
    }

    if (listening && !aiListening) {
      onChange(modifiedTranscript);
    } else if (listening && aiListening) {
      setAiTranscript(modifiedTranscript);
      onChange(modifiedTranscript); // Display AI transcript in the input field
    }

    // Reset the timeout whenever the transcript changes
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    if (aiListening && modifiedTranscript) {
      pauseTimeoutRef.current = setTimeout(() => {
        handleAiStop();
      }, 1000); // 1 second
    } else if (isListening && modifiedTranscript) {
      pauseTimeoutRef.current = setTimeout(() => {
        handleVoiceStop();
      }, 1000); // 1 second
    }
  }, [transcript, listening, onChange, isCodeEditor, aiListening]);

  useEffect(() => {
    if (!listening && isListening) {
      setIsListening(false);
    } else if (!listening && aiListening) {
      setAiListening(false);
    }
  }, [listening]);

  useEffect(() => {
    if (generateResponse) {
      handleGenerateResponse();
    }
  }, [generateResponse]);

  if (!browserSupportsSpeechRecognition && useVoice) {
    return <span>Your browser doesn't support speech recognition.</span>;
  }

  const handleVoiceStart = () => {
    resetFeedbackMessages();
    setFeedback("");
    setIsListening(true);
    setAiListening(false);
    resetTranscript();
    resetMessages();
    onChange(""); // Clear input when starting voice
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleVoiceStop = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    let finalTranscript = transcript.toLowerCase();
    if (isCodeEditor) {
      finalTranscript = applySymbolMappings(finalTranscript);
    }
    resetTranscript();
    resetMessages();
    onChange(finalTranscript);
  };

  const handleAiStart = () => {
    resetFeedbackMessages();
    setFeedback("");
    setAiListening(true);
    setIsListening(false);
    resetTranscript();
    resetMessages();
    onChange(""); // Clear input when starting AI
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleAiStop = () => {
    setAiListening(false);
    SpeechRecognition.stopListening();
    setGenerateResponse(true); // Set flag to generate response
  };

  const handleGenerateResponse = async () => {
    try {
      await submitPrompt([
        {
          content:
            aiTranscript +
            ` The JSON format should be { input: "${aiTranscript}", output: "your_answer" }. The output should strictly answer what is requested in javascript. Absolutely no other text or data should be included or communicated.`,
          role: "user",
        },
      ]);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
    setAiTranscript("");
    setGenerateResponse(false); // Reset flag
  };

  useEffect(() => {
    if (resetVoiceState) {
      setIsListening(false);
      setAiListening(false);
      SpeechRecognition.stopListening();
    }
  }, [resetVoiceState]);

  useEffect(() => {
    if (stopListening && (isListening || aiListening)) {
      handleVoiceStop();
      handleAiStop();
    }
  }, [stopListening]);

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        const jsonResponse = JSON.parse(lastMessage.content);
        onChange(jsonResponse.output); // Replace the input with the final output
      } else {
        onChange(lastMessage.content); // Stream the response as it comes in
      }
    }
  }, [messages, onChange]);

  // New function for handling the "Learn" button click
  const handleLearnClick = async () => {
    onOpen();
    await submitEducationalPrompt([
      {
        content: `Generate educational material about ${JSON.stringify(
          step
        )} with code examples and explanations. Make it enriching and create a useful flow where the ideas build off of each other tom encourage challenge and learning. The JSON format should be { input: "${JSON.stringify(
          step
        )}", output: [{ code: "code_example", explanation: "explanation" }] }. Additionally the code should consider line breaks and formatting because it will be formatted after completion`,
        role: "user",
      },
    ]);
  };

  useEffect(() => {
    if (educationalMessages?.length > 0) {
      const lastMessage = educationalMessages[educationalMessages.length - 1];
      if (!lastMessage.meta.loading) {
        const jsonResponse = JSON.parse(lastMessage.content);
        if (Array.isArray(jsonResponse.output)) {
          setEducationalContent(jsonResponse.output);
        } else {
          setEducationalContent([]);
        }
      } else {
        setEducationalContent([]);
      }
    }
  }, [educationalMessages]);

  console.log("educationalMessages", educationalMessages);
  return (
    <VStack spacing={4} alignItems="center" width="100%">
      {useVoice || isTerminal ? (
        <HStack spacing={4} alignItems="center">
          <Button onClick={handleVoiceStart}>Use Voice To Text</Button>
          <Button onClick={handleAiStart}>Use Voice To AI</Button>
          <Button onClick={handleLearnClick} variant={"outline"}>
            Learn
          </Button>
        </HStack>
      ) : null}

      {isListening && (
        <HStack spacing={2} alignItems="center">
          <SunsetCanvas />
          <small>Listening...</small>
        </HStack>
      )}
      {aiListening && (
        <HStack spacing={2} alignItems="center">
          <SunsetCanvas />
          <small>Listening...</small>
        </HStack>
      )}

      {isCodeEditor ? (
        <Box width="100%" height="400px" position="relative">
          <MonacoEditor
            height="100%"
            width="100%"
            language="javascript"
            theme="light"
            value={value}
            onChange={(value) => onChange(value.toLowerCase())}
            options={{
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </Box>
      ) : (
        <Input
          value={aiListening ? aiTranscript : value}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          placeholder="Type your response or use voice..."
          width="100%"
        />
      )}

      <EducationalModal
        isOpen={isOpen}
        onClose={onClose}
        educationalMessages={educationalMessages}
        educationalContent={educationalContent}
      />
    </VStack>
  );
};

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

function TerminalComponent({
  inputValue,
  setInputValue,
  isSending,
  isTerminal,
  resetVoiceState,
  stopListening,
  setFeedback,
  resetFeedbackMessages,
  step,
}) {
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
      executeCommand(inputValue.toLowerCase());
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
    <>
      <VoiceInput
        value={inputValue.toLowerCase()}
        onChange={setInputValue}
        isCodeEditor={false}
        isTerminal={isTerminal}
        resetVoiceState={resetVoiceState}
        stopListening={stopListening}
        setFeedback={setFeedback}
        resetFeedbackMessages={resetFeedbackMessages}
        step={step}
      />
      <ReactBash
        structure={structure}
        history={history}
        prefix={`user@mock-terminal:${cwd}$`}
      />
    </>
  );
}

const Step = ({ currentStep }) => {
  const { stepIndex } = useParams();
  const currentStepIndex = parseInt(stepIndex, 10);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [resetVoiceState, setResetVoiceState] = useState(false);
  const [stopListening, setStopListening] = useState(false);
  const { resetMessages, messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });
  const navigate = useNavigate();

  const step = steps[currentStep];

  const handleInputChange = (value) => {
    setInputValue(value);
    // setIsCorrect(null);
    setFeedback("");
  };

  const handleAnswerClick = async () => {
    setIsSending(true);
    setResetVoiceState(true);
    setStopListening(true);
    setInputValue(""); // Clear input after answering
    try {
      const response = await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }" with the following answer "${inputValue.toLowerCase()}". Is this answer correct? Return the response using a json interface like { isCorrect: boolean, feedback: string }`,
          role: "user",
        },
      ]);

      // if (response && response.length > 0 && response[0].content) {
      //   const jsonResponse = JSON.parse(response[0].content);
      //   setIsCorrect(jsonResponse.isCorrect);
      //   setFeedback(jsonResponse.feedback);
      // } else {
      //   console.error("Unexpected response format:", response);
      // }
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
    setIsSending(false);
    setResetVoiceState(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        console.log("hello?");
        console.log(lastMessage);
        const jsonResponse = JSON.parse(lastMessage.content);
        console.log("jsonResponse");
        setIsCorrect(jsonResponse.isCorrect);
        setFeedback(jsonResponse.feedback);
      }
    }
  }, [messages]);

  useEffect(() => {
    setInputValue("");
    setFeedback("");
    setIsCorrect(null);
    resetMessages();
  }, [step]);

  const handleNextClick = () => {
    if (currentStep === steps.length - 1) {
      navigate("/award"); // Navigate to the award screen if it's the last step
    } else {
      navigate(`/step/${currentStep + 1}`);
    }
  };

  const handleBackClick = () => {
    navigate(`/step/${currentStep - 1}`);
  };

  console.log("isCorrect", isCorrect);

  return (
    <VStack spacing={4} width="100%">
      <Text fontSize="2xl">{step.title}</Text>
      <Text>{step.description}</Text>
      {step.question && <Text>{step.question.questionText}</Text>}
      {step.isText && (
        <VoiceInput
          value={inputValue}
          onChange={handleInputChange}
          isCodeEditor={false}
          isTextInput={true}
          resetVoiceState={resetVoiceState}
          useVoice={true}
          stopListening={stopListening}
          setFeedback={setFeedback}
          resetFeedbackMessages={resetMessages}
          step={step}
        />
      )}
      {step.isCode && !step.isTerminal && (
        <VoiceInput
          value={inputValue}
          onChange={handleInputChange}
          isCodeEditor={true}
          resetVoiceState={resetVoiceState}
          useVoice={true}
          stopListening={stopListening}
          setFeedback={setFeedback}
          resetFeedbackMessages={resetMessages}
          step={step}
        />
      )}
      {step.isCode && step.isTerminal && (
        <Box width="100%">
          <TerminalComponent
            inputValue={inputValue.toLowerCase()}
            setInputValue={setInputValue}
            isSending={isSending}
            isTerminal={true}
            stopListening={stopListening}
            resetVoiceState={resetVoiceState}
            setFeedback={setFeedback}
            resetFeedbackMessages={resetMessages}
            step={step}
          />
        </Box>
      )}
      <HStack spacing={4}>
        {currentStep > 0 && (
          <Button colorScheme="teal" onClick={handleBackClick}>
            Back
          </Button>
        )}
        {step.title === "Welcome to the Program-AI App!" ? (
          <Button colorScheme="teal" onClick={handleNextClick}>
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
        {isCorrect && (
          <Button colorScheme="teal" onClick={handleNextClick}>
            Next Question
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
};

const steps = [
  {
    title: "Welcome to the Program-AI App!",
    description:
      "Press 'Let's start' to begin your journey in learning how to code.",
  },
  {
    title: "Step 1: Understanding the Goal of Coding",
    description:
      "In this step, you will learn about the primary goal of coding or programming.",
    isText: true,
    question: {
      questionText: "What is the primary goal of coding or programming?",
    },
  },
  {
    title: "Step 2: Understanding Logic in Programming",
    description:
      "In this step, you will learn about logic in the context of programming.",
    isText: true,
    question: {
      questionText: "What is logic in the context of programming?",
    },
  },
  {
    title: "Step 3: Introduction to Variables",
    description:
      "In this step, you will learn about variables and how to use them in your code.",
    isText: true,
    question: {
      questionText: "Define a variable in your own words.",
    },
  },
  {
    title: "Step 4: Declaring Variables in JavaScript",
    description:
      "In this step, you will learn how to declare a variable in JavaScript.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: "How do you declare a variable in JavaScript?",
    },
  },
  {
    title: "Step 5: Introduction to Objects",
    description:
      "In this step, you will learn what an object is in programming.",
    isText: true,
    question: {
      questionText: "What is an object in programming?",
    },
  },
  {
    title: "Step 6: Creating a Simple Class",
    description:
      "In this step, you will write a simple class definition in JavaScript.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Write a simple class definition in JavaScript for a \`Car\` object with properties for \`make\` and \`model\`, and a method to display the car's details.`,
    },
  },
  {
    title: "Step 7: Understanding the Constructor Method",
    description:
      "In this step, you will learn about the purpose of the `constructor` method in a class.",
    isText: true,
    question: {
      questionText:
        "Explain the purpose of the `constructor` method in a class.",
    },
  },
  {
    title: "Step 8: Creating an Instance of a Class",
    description:
      "In this step, you will learn how to create an instance of a class in JavaScript.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: "How do you create an instance of a class in JavaScript?",
    },
  },
  {
    title: "Step 9: Declaring a Method in a Class",
    description:
      "In this step, you will learn how to declare a method inside a class.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Declare a method named `updateModel` in the `Car` class that updates the `model` property.",
    },
  },
  {
    title: "Step 10: Using the `this` Keyword",
    description:
      "In this step, you will understand the `this` keyword in the context of a class.",
    isText: true,
    question: {
      questionText:
        "Explain the role of the `this` keyword inside a class method.",
    },
  },
  {
    title: "Step 11: Adding Properties to an Object",
    description:
      "In this step, you will learn how to add properties to an object in JavaScript.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: "Add a new property `year` to the `Car` class.",
    },
  },
  {
    title: "Step 12: Accessing Object Properties",
    description:
      "In this step, you will learn how to access properties of an object in JavaScript.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Create an instance of the `Car` class and access its `make` property.",
    },
  },
  {
    title: "Step 13: Modifying Object Properties",
    description:
      "In this step, you will learn how to modify properties of an object in JavaScript.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Modify the `model` property of an instance of the `Car` class.",
    },
  },
  {
    title: "Step 14: Understanding Inheritance",
    description:
      "In this step, you will learn about inheritance in object-oriented programming.",
    isText: true,
    question: {
      questionText: "What is inheritance in object-oriented programming?",
    },
  },
  {
    title: "Step 15: Implementing Inheritance",
    description:
      "In this step, you will implement inheritance in JavaScript by extending a class.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Extend the `Car` class to create a `ElectricCar` class with an additional property `batteryLife`.",
    },
  },
  {
    title: "Step 16: Overriding Methods",
    description:
      "In this step, you will learn how to override methods in a subclass.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Override the `displayDetails` method in the `ElectricCar` class to include `batteryLife`.",
    },
  },
  {
    title: "Step 17: Understanding Encapsulation",
    description:
      "In this step, you will learn about encapsulation in object-oriented programming.",
    isText: true,
    question: {
      questionText: "What is encapsulation in object-oriented programming?",
    },
  },
  {
    title: "Step 18: Implementing Encapsulation",
    description:
      "In this step, you will implement encapsulation by using getter and setter methods.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Add getter and setter methods for the `batteryLife` property in the `ElectricCar` class.",
    },
  },
  {
    title: "Step 19: Creating and Using an Array of Objects",
    description:
      "In this step, you will create and use an array of objects in JavaScript.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Create an array of `Car` objects and iterate through it using a loop to print the details of each car.",
    },
  },
  {
    title: "Step 20: Combining Concepts",
    description:
      "In this step, you will combine various concepts learned to create a small project.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText:
        "Create a small project that defines a `Person` class, uses inheritance to create a `Student` class, and demonstrates encapsulation and arrays of objects.",
    },
  },
  {
    title: "Step 3: Terminal Code Example",
    description: "In this step, you will type your code as if in a terminal.",
    isCode: true,
    isTerminal: true,
    question: {
      questionText: "Type a command using the command line",
    },
  },
  {
    title: "Step 1: Review of Lesson One",
    description:
      "Let's quickly review lesson one where we learned about organizing data with code, including objects, functions, loops, and logic.",
    isText: true,
    question: {
      questionText: "What are the four main concepts we covered in lesson one?",
    },
  },
  {
    title: "Step 2: Introduction to React Components",
    description:
      "In this step, you will learn about React components and their importance in creating user interfaces.",
    isText: true,
    question: {
      questionText: "What is a React component?",
    },
  },
  {
    title: "Step 3: Understanding React Hooks",
    description:
      "In this step, you will learn about React hooks and how they are used to manage state and side effects in functional components.",
    isText: true,
    question: {
      questionText: "What is a hook in React and why is it useful?",
    },
  },
  {
    title: "Step 4: Creating a Simple React Component",
    description:
      "In this step, you will create a simple React component that displays a Tweet.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Write a simple React component that displays a Tweet with the user's name, handle, and text.`,
    },
  },
  {
    title: "Step 5: Managing State with useState Hook",
    description:
      "In this step, you will learn how to use the useState hook to manage the state of a component.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Modify the Tweet component to include a like button that toggles the liked state using the useState hook.`,
    },
  },
  {
    title: "Step 6: Handling Events in React",
    description:
      "In this step, you will learn how to handle events in React, such as clicks.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Add an event handler to the like button that updates the liked state when clicked.`,
    },
  },
  {
    title: "Step 7: Component Properties",
    description:
      "In this step, you will learn about passing properties to components in React.",
    isText: true,
    question: {
      questionText:
        "What are properties in a React component and how are they used?",
    },
  },
  {
    title: "Step 8: Updating Component State",
    description:
      "In this step, you will learn how to update the state of a component based on user interactions.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Update the Tweet component to increment the like count each time the like button is clicked.`,
    },
  },
  {
    title: "Step 9: Creating a New React Project",
    description:
      "In this step, you will create a new React project using Create React App.",
    isTerminal: true,
    question: {
      questionText: `Use the terminal to create a new React project named "tweet-app" using Create React App.`,
    },
  },
  {
    title: "Step 10: Running a React Project",
    description:
      "In this step, you will learn how to run your React project locally.",
    isTerminal: true,
    question: {
      questionText: `Use the terminal to navigate to the "tweet-app" directory and start the development server.`,
    },
  },
  {
    title: "Step 11: Understanding JSX",
    description:
      "In this step, you will learn about JSX and how it is used to describe the UI in React components.",
    isText: true,
    question: {
      questionText: "What is JSX and why is it used in React?",
    },
  },
  {
    title: "Step 12: Styling React Components",
    description:
      "In this step, you will learn how to style React components using CSS.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Add styles to the Tweet component to improve its appearance.`,
    },
  },
  {
    title: "Step 13: Using Flexbox for Layouts",
    description:
      "In this step, you will learn how to use Flexbox to create layouts in React.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Update the Tweet component to use Flexbox for laying out the user information and tweet content.`,
    },
  },
  {
    title: "Step 14: Adding More State with useState",
    description:
      "In this step, you will learn how to manage multiple pieces of state in a component using the useState hook.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Add a retweet button to the Tweet component that tracks the number of retweets.`,
    },
  },
  {
    title: "Step 15: Working with Props and State Together",
    description:
      "In this step, you will learn how to work with both props and state in a React component.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Update the Tweet component to receive the initial tweet data as props and manage the like and retweet counts as state.`,
    },
  },
  {
    title: "Step 16: Lifting State Up",
    description:
      "In this step, you will learn how to lift state up to a common ancestor component to share state between components.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Create a parent component that manages the state for multiple Tweet components and passes the state and event handlers as props.`,
    },
  },
  {
    title: "Step 17: Understanding Component Lifecycle",
    description:
      "In this step, you will learn about the lifecycle of React components and how to use useEffect hook to manage side effects.",
    isText: true,
    question: {
      questionText:
        "What is the component lifecycle in React and what is the purpose of the useEffect hook?",
    },
  },
  {
    title: "Step 18: Fetching Data with useEffect",
    description:
      "In this step, you will learn how to fetch data from an API using the useEffect hook.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Update the Tweet component to fetch tweet data from an API when the component mounts using the useEffect hook.`,
    },
  },
  {
    title: "Step 19: Building a Complete Tweet App",
    description:
      "In this step, you will combine everything you have learned to build a complete Tweet app.",
    isCode: true,
    isTerminal: false,
    question: {
      questionText: `Build a complete Tweet app that fetches tweets from an API, displays them using the Tweet component, and allows users to like and retweet.`,
    },
  },
  {
    title: "Step 20: Deploying Your React App",
    description:
      "In this step, you will learn how to deploy your React app to a hosting service like Vercel or Netlify.",
    isTerminal: true,
    question: {
      questionText: `Use the terminal to deploy your "tweet-app" to a hosting service of your choice.`,
    },
  },
  {
    title: "Introduction to Backend Engineering",
    description:
      "In this step, you will learn about what backend software engineering is and why it is important.",
    isText: true,
    question: {
      questionText:
        "What is backend software engineering and why is it important in building applications?",
    },
  },
  {
    title: "Main Lessons Overview",
    description:
      "In this step, you will identify the main lessons covered in the backend engineering course.",
    isText: true,
    question: {
      questionText:
        "List the main lessons covered in the backend engineering course.",
    },
  },
  {
    title: "Relating Backend to Real World",
    description:
      "In this step, you will relate the operations of a kitchen in a restaurant to backend engineering.",
    isText: true,
    question: {
      questionText:
        "How can we relate the operations of a kitchen in a restaurant to backend engineering?",
    },
  },
  {
    title: "Understanding Operating Systems",
    description:
      "In this step, you will learn why understanding operating systems is important in backend engineering.",
    isText: true,
    question: {
      questionText:
        "Why is it important to understand the operating system when studying backend engineering?",
    },
  },
  {
    title: "Using Terminal Commands",
    description:
      "In this step, you will learn basic terminal commands to interact with the operating system.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to list all files and directories in the current directory.",
    },
  },
  {
    title: "Navigating File System",
    description:
      "In this step, you will use the terminal to navigate through the file system.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to navigate to a directory named `backend_project`.",
    },
  },
  {
    title: "Creating Users Concept",
    description:
      "In this step, you will understand the concept of creating users in backend systems.",
    isText: true,
    question: {
      questionText:
        "What is the process of creating users in a backend system?",
    },
  },
  {
    title: "Database Foundations",
    description:
      "In this step, you will learn about the foundations of databases in backend engineering.",
    isText: true,
    question: {
      questionText:
        "What are the main types of databases used in backend engineering?",
    },
  },
  {
    title: "Understanding Backend Clouds",
    description:
      "In this step, you will learn about backend clouds and their significance.",
    isText: true,
    question: {
      questionText: "What are backend clouds and why are they important?",
    },
  },
  {
    title: "Connecting Systems",
    description:
      "In this step, you will learn how to connect different systems in a backend environment.",
    isText: true,
    question: {
      questionText:
        "How do you connect different systems in a backend environment?",
    },
  },
  {
    title: "Database Tables",
    description:
      "In this step, you will understand how to create tables in a SQL database.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to create a table named `users` in a SQL database with columns for ID, name, and email.",
    },
  },
  {
    title: "Storing Data Responsibly",
    description:
      "In this step, you will learn about responsible data storage practices.",
    isText: true,
    question: {
      questionText:
        "What are some best practices for storing data responsibly in a backend system?",
    },
  },
  {
    title: "Using Key-Value Pairs",
    description:
      "In this step, you will learn about key-value pairs in non-relational databases.",
    isText: true,
    question: {
      questionText:
        "Explain the concept of key-value pairs in non-relational databases.",
    },
  },
  {
    title: "Handling User Data",
    description:
      "In this step, you will learn how to handle user data in backend systems.",
    isCode: true,
    question: {
      questionText: `Write a code snippet to create a user object with properties for username, email, and password.`,
    },
  },
  {
    title: "Creating a New User",
    description:
      "In this step, you will create a new user in a backend system using a terminal command.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to add a new user to the `users` table in your SQL database.",
    },
  },
  {
    title: "Understanding Authentication",
    description:
      "In this step, you will learn about authentication processes in backend systems.",
    isText: true,
    question: {
      questionText:
        "What is authentication and why is it important in backend systems?",
    },
  },
  {
    title: "Authorization Servers",
    description:
      "In this step, you will learn about the role of authorization servers.",
    isText: true,
    question: {
      questionText: "What are authorization servers and how do they work?",
    },
  },
  {
    title: "Using Environment Variables",
    description:
      "In this step, you will learn about using environment variables in backend development.",
    isTerminal: true,
    question: {
      questionText:
        "Set an environment variable for your database connection string in your terminal.",
    },
  },
  {
    title: "Database Relationships",
    description:
      "In this step, you will learn about relationships in databases.",
    isCode: true,
    question: {
      questionText:
        "Write a code snippet to define a one-to-many relationship between users and posts in a database.",
    },
  },
  {
    title: "Creating API Endpoints",
    description:
      "In this step, you will learn how to create API endpoints for a backend application.",
    isCode: true,
    question: {
      questionText:
        "Write a code snippet to create a REST API endpoint to retrieve user data.",
    },
  },
  {
    title: "Connecting to a Database",
    description:
      "In this step, you will learn how to connect a backend application to a database.",
    isCode: true,
    question: {
      questionText:
        "Write a code snippet to connect to a MongoDB database using Node.js.",
    },
  },
  {
    title: "Creating a User Authentication System",
    description:
      "In this step, you will create a simple user authentication system.",
    isCode: true,
    question: {
      questionText:
        "Write a code snippet to create a user authentication system using JWT in Node.js.",
    },
  },
  {
    title: "Deploying a Backend Application",
    description:
      "In this step, you will learn how to deploy a backend application to a cloud service.",
    isCode: true,
    question: {
      questionText:
        "Write a code snippet to deploy a Node.js application to Heroku.",
    },
  },
  {
    title: "Introduction to Full Application Development",
    description:
      "Learn how to piece together everything you've learned to build a complete application.",
    isText: true,
    question: {
      questionText:
        "What tools and resources can you use if you come across something you want to learn more about while building an application?",
    },
  },
  {
    title: "Installing VSCode",
    description:
      "Install Visual Studio Code (VSCode), the code editor for writing your code.",
    isText: true,
    question: {
      questionText: "Why is VSCode an important tool for developers?",
    },
  },
  {
    title: "Installing Node.js",
    description:
      "Install Node.js, which lets you build JavaScript applications.",
    isText: true,
    question: {
      questionText: "What is the purpose of Node.js in JavaScript development?",
    },
  },
  {
    title: "Installing npm",
    description:
      "Install npm (Node Package Manager) to manage packages and dependencies in your project.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to install npm globally with administrator permissions.",
    },
  },
  {
    title: "Creating a Project Folder",
    description: "Create a new folder for your project.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to create a new folder named 'The Digital Border'.",
    },
  },
  {
    title: "Opening Project in VSCode",
    description: "Open your project folder in VSCode.",
    isText: true,
    question: {
      questionText: "Describe the steps to open a project folder in VSCode.",
    },
  },
  {
    title: "Opening Terminal in VSCode",
    description: "Open the in-app command line terminal in VSCode.",
    isText: true,
    question: {
      questionText: "How do you open the terminal in VSCode?",
    },
  },
  {
    title: "Starting a React Project with Vite",
    description: "Start a new React project using Vite.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to create a new React project with Vite. What command do you use?",
    },
  },
  {
    title: "Configuring and Installing Dependencies",
    description: "Configure your project and install necessary dependencies.",
    isTerminal: true,
    question: {
      questionText:
        "Navigate into your project folder and install dependencies using npm. What command do you use?",
    },
  },
  {
    title: "Running the React Application",
    description: "Run your React application in development mode.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to build and run your React application. What commands do you use?",
    },
  },
  {
    title: "Setting Up Firebase",
    description: "Set up Firebase for your project.",
    isText: true,
    question: {
      questionText: "What are the steps to set up Firebase for your project?",
    },
  },
  {
    title: "Installing Firebase Tools",
    description: "Install Firebase tools globally.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to install Firebase tools globally. What command do you use?",
    },
  },
  {
    title: "Initializing Firebase",
    description:
      "Initialize Firebase in your project and authenticate your account.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to initialize Firebase and authenticate your account. What command do you use?",
    },
  },
  {
    title: "Activating Firebase Services",
    description:
      "Activate authentication, Firestore, and hosting services in Firebase.",
    isText: true,
    question: {
      questionText:
        "Which Firebase services need to be activated for this project?",
    },
  },
  {
    title: "Deploying the Application",
    description: "Deploy your application using Firebase hosting.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to deploy your application to Firebase hosting. What command do you use?",
    },
  },
  {
    title: "Creating Users",
    description:
      "Install Firebase and react-firebaseui to create users in your application.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to install Firebase and react-firebaseui. What command do you use?",
    },
  },
  {
    title: "Enabling Google Sign-In",
    description:
      "Enable Google Sign-In method in your Firebase authentication settings.",
    isText: true,
    question: {
      questionText:
        "What steps do you follow to enable Google Sign-In in Firebase authentication settings?",
    },
  },
  {
    title: "Connecting Firebase to Your Code",
    description:
      "Retrieve Firebase configuration keys and connect them to your code.",
    isCode: true,
    question: {
      questionText:
        "Write the code to initialize Firebase in your project using the configuration keys.",
    },
  },
  {
    title: "Rendering Sign-In Button",
    description:
      "Render a sign-in button in your React application using Firebase and react-firebaseui.",
    isCode: true,
    question: {
      questionText:
        "Write the code to render a sign-in button using Firebase and react-firebaseui.",
    },
  },
  {
    title: "Displaying User Data",
    description: "Use useEffect to display user data when they log in.",
    isCode: true,
    question: {
      questionText:
        "Write the code to display user data using the useEffect hook when they log in.",
    },
  },
  {
    title: "Creating a Header Component",
    description:
      "Create a header component to display user information based on their login state.",
    isCode: true,
    question: {
      questionText:
        "Write the code for a header component that displays different content based on whether the user is logged in.",
    },
  },
  {
    title: "Updating User Profile",
    description:
      "Update the user profile information in your Firebase database.",
    isCode: true,
    question: {
      questionText:
        "Write the code to update user profile information in Firebase Firestore.",
    },
  },
  {
    title: "Deploying Updated Code",
    description:
      "Deploy your updated application with Firebase authentication and user data display.",
    isTerminal: true,
    question: {
      questionText:
        "Use the terminal to build and deploy your updated application. What commands do you use?",
    },
  },
  {
    title: "Summary and Review",
    description:
      "Review the steps taken to build and deploy your full application.",
    isText: true,
    question: {
      questionText:
        "Summarize the key steps taken to build and deploy your application using React and Firebase.",
    },
  },
  {
    title: "Introduction to GitHub",
    description:
      "Learn about using GitHub to collaborate with other developers.",
    isText: true,
    question: {
      questionText: "What is GitHub and why is it important for developers?",
    },
  },
  {
    title: "Using GitHub Commands",
    description: "Learn the basic GitHub commands for managing your code.",
    isText: true,
    question: {
      questionText:
        "List and describe the basic GitHub commands for managing your code.",
    },
  },
  {
    title: "Introduction to Data Structures and Algorithms",
    description:
      "Understand the importance and challenges of learning data structures and algorithms.",
    isText: true,
    question: {
      questionText:
        "Why do data structures and algorithms often push people away from computer science?",
    },
  },
  {
    title: "Programming Languages and Autocorrect Technology",
    description:
      "Explore how programming languages work and how computers understand code.",
    isText: true,
    question: {
      questionText:
        "How does autocorrect technology work, and how do computers understand code?",
    },
  },
  {
    title: "Tokens in Code",
    description:
      "Break down code into tokens to understand how computers interpret information.",
    isCode: true,
    question: {
      questionText:
        'List the possible tokens in the following code: let musician = new Musician("Drake"); let top_song = musician.getTopSong();',
    },
  },
  {
    title: "Breaking Down Strings into Characters",
    description:
      "Understand how strings are broken down into characters and further into machine code.",
    isCode: true,
    question: {
      questionText:
        'Write the code to break down the string "Drake" into an array of characters.',
    },
  },
  {
    title: "Character Mapping",
    description: "Map characters to their corresponding indices.",
    isCode: true,
    question: {
      questionText:
        'Write a JavaScript object that maps the characters of the string "Drake" to their corresponding indices.',
    },
  },
  {
    title: "Binary Conversion",
    description: "Convert characters to their binary representation.",
    isCode: true,
    question: {
      questionText:
        'Write the binary representation for each character in the string "Drake".',
    },
  },
  {
    title: "Understanding Data Structures",
    description: "Learn how data structures store and reference information.",
    isText: true,
    question: {
      questionText:
        "Why is it important to understand how computers reserve space and create addresses to reference information?",
    },
  },
  {
    title: "Introduction to Linked Lists",
    description: "Learn about the basic concepts of linked lists.",
    isText: true,
    question: {
      questionText:
        "What are linked lists, and why are they important for understanding more advanced data structures like trees and graphs?",
    },
  },
  {
    title: "Building a Linked List",
    description: "Construct a simple linked list in JavaScript.",
    isCode: true,
    question: {
      questionText:
        'Write the JavaScript code to create a linked list with the following values: "meta", "instagram", "reels".',
    },
  },
  {
    title: "Depth-First Search Algorithm",
    description: "Understand and implement a depth-first search algorithm.",
    isCode: true,
    question: {
      questionText:
        "Write a depth-first search algorithm in JavaScript that counts the number of null locations in a tree.",
    },
  },
  {
    title: "Creating a Tree Structure",
    description:
      "Build a simple tree structure to practice depth-first search.",
    isCode: true,
    question: {
      questionText:
        "Write the JavaScript code to create the following tree structure: { alphabet: { google: { chrome: true } }, meta: { facebook: { threads: null } } }",
    },
  },
  {
    title: "Traversing a Linked List",
    description:
      "Implement a method to traverse a linked list and return the last item.",
    isCode: true,
    question: {
      questionText:
        "Write a method in the LinkedList class that traverses the list and returns the last item.",
    },
  },
  {
    title: "Reversing a Linked List",
    description: "Reverse the direction of a linked list.",
    isCode: true,
    question: {
      questionText: "Write the code to reverse a linked list in JavaScript.",
    },
  },
  {
    title: "Understanding Depth-First and Breadth-First Search",
    description:
      "Learn the differences between depth-first search and breadth-first search.",
    isText: true,
    question: {
      questionText:
        "Explain the difference between depth-first search and breadth-first search algorithms.",
    },
  },
  {
    title: "Depth-First Search Application",
    description: "Apply depth-first search to a practical example.",
    isCode: true,
    question: {
      questionText:
        "Write a depth-first search algorithm to find a specific value in a tree structure.",
    },
  },
  {
    title: "Algorithm Optimization",
    description: "Explore ways to optimize algorithms for better performance.",
    isText: true,
    question: {
      questionText:
        "What are some common techniques used to optimize algorithms for better performance?",
    },
  },
  {
    title: "Linked List Class Implementation",
    description: "Implement the LinkedList and ListItem classes in JavaScript.",
    isCode: true,
    question: {
      questionText:
        "Write the JavaScript code to implement the LinkedList and ListItem classes.",
    },
  },
  {
    title: "Practical Linked List Application",
    description: "Apply the LinkedList class to a real-world scenario.",
    isCode: true,
    question: {
      questionText:
        "Write the code to create a linked list of company departments and traverse through it.",
    },
  },
  {
    title: "Exploring the N-Queens Problem",
    description: "Understand the N-Queens problem and its complexity.",
    isText: true,
    question: {
      questionText:
        "What is the N-Queens problem, and why is it considered complex?",
    },
  },
  {
    title: "Implementing Backtracking",
    description: "Implement a backtracking algorithm to solve a problem.",
    isCode: true,
    question: {
      questionText:
        "Write a backtracking algorithm to solve the N-Queens problem for a 4x4 board.",
    },
  },

  // Add more steps as needed
];

function App() {
  console.log("steps", steps.length);
  return (
    <Router>
      <Box textAlign="center" fontSize="xl" p={5}>
        <Routes>
          <Route path="/" element={<Step currentStep={0} />} />
          {steps.map((_, index) => (
            <Route
              key={index}
              path={`/step/${index}`}
              element={<Step currentStep={index} />}
            />
          ))}
          <Route path="/award" element={<AwardScreen />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
