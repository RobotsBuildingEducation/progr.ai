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
            ` The JSON format should be { input: "${aiTranscript}", output: "your_answer" }. The output should strictly answer what is requested. Absolutely no other text or data should be included or communicated.`,
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

  return (
    <VStack spacing={4} alignItems="center" width="100%">
      {useVoice || isTerminal ? (
        <HStack spacing={4} alignItems="center">
          <Button onClick={handleVoiceStart}>Use Voice To Text</Button>

          <Button onClick={handleAiStart}>Use Voice To AI</Button>
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
      {/* {aiTranscript && !aiListening && generateResponse && (
        <Button onClick={handleGenerateResponse}>Generate Response</Button>
      )} */}

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
        resetFeedbackMessages={resetMessages}
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
    title: "Step 1: Introduction to Variables",
    description:
      "In this step, you will learn about variables and how to use them in your code.",
    isText: true,
    question: {
      questionText: "What is a variable?",
      answer:
        "A variable is a storage location identified by a memory address and a symbolic name.",
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
      answer:
        "You declare a variable using var, let, or const followed by the variable name.",
    },
  },
  {
    title: "Step 3: Terminal Code Example",
    description: "In this step, you will type your code as if in a terminal.",
    isCode: true,
    isTerminal: true,
    question: {
      questionText: "Type a command using the command line",
      answer: "Commands are used to perform specific tasks in the terminal.",
    },
  },
  // Add more steps as needed
];

function App() {
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
