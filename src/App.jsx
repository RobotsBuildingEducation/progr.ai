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
  useDisclosure,
  useToast,
  Checkbox,
  Link,
  Textarea,
  Progress,
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
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";
import { useNOSTR } from "./hooks/useNOSTR";
import { createUser, getUserStep, incrementUserStep } from "./utility/nosql";
import { steps } from "./utility/content";
import { PrivateRoute } from "./PrivateRoute";
import { doc, getDoc } from "firebase/firestore";
import { database } from "./database/firebaseResources";

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

  return (
    <VStack spacing={4} alignItems="center">
      {useVoice || isTerminal ? (
        <HStack spacing={4} justifyContent={"center"} maxWidth={"400px"}>
          <Button onClick={handleVoiceStart}>Voice To Text</Button>
          <Button onClick={handleAiStart}>Voice To AI</Button>
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
        <Box
          width="100%"
          height="400px"
          position="relative"
          style={{ border: "1px solid black" }}
        >
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
        <Textarea
          type="textarea"
          maxWidth={"333px"}
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

  const { publishEvent } = useNOSTR(
    localStorage.getItem("local_publicKey"),
    localStorage.getItem("local_privateKey")
  );
  const navigate = useNavigate();

  const step = steps[currentStep];

  const calculateProgress = () => {
    console.log("progress", (currentStep / (steps.length - 1)) * 100);
    return (currentStep / (steps.length - 1)) * 100;
  };

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

        if (jsonResponse.isCorrect) {
          const npub = localStorage.getItem("local_publicKey");
          incrementUserStep(npub);
        }
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
      navigate("/award");
    } else {
      publishEvent("I just completed question 2 on https://program-ai.app");
      navigate(`/step/${currentStep + 1}`);
    }
  };

  const handleBackClick = () => {
    if (currentStep === 1) {
      navigate(`/`);
    } else {
      navigate(`/step/${currentStep - 1}`);
    }
  };

  console.log("isCorrect", isCorrect);

  return (
    <VStack spacing={4} width="100%" mt={24}>
      <VStack textAlign={"left"} style={{ width: "100%", maxWidth: 400 }}>
        <b style={{ fontSize: "60%" }}>Progress</b>
        <Progress
          value={calculateProgress()}
          size="xs"
          colorScheme="teal"
          width="100%"
          mb={4}
        />
      </VStack>
      <Text fontSize="xl">
        {currentStep}. {step.title}
      </Text>
      {/* <Text>{step.description}</Text> */}
      {step.question && <Text fontSize="sm">{step.question.questionText}</Text>}
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
        {/* {currentStep > 0 && (
          <Button colorScheme="teal" onClick={handleBackClick}>
            Back
          </Button>
        )} */}
        {step.title === "Welcome to the Program AI App!" ? (
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

const Home = ({ isSignedIn, setIsSignedIn }) => {
  const [view, setView] = useState("buttons");
  const [userName, setUserName] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [keys, setKeys] = useState(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const { generateKeys, authenticate, publishEvent } = useNOSTR(
    localStorage.getItem("local_publicKey"),
    localStorage.getItem("local_privateKey")
  );

  const navigate = useNavigate();
  const toast = useToast();

  const handleCreateAccount = async () => {
    const newKeys = await generateKeys(userName);
    setKeys(newKeys);
    localStorage.setItem("displayName", userName);
    setIsSignedIn(true);
    setView("created");

    // Create user in Firestore
    await createUser(newKeys.publicKey, userName);
  };

  const handleSignIn = async () => {
    await authenticate(secretKey);
    const npub = localStorage.getItem("local_publicKey");
    const userName = localStorage.getItem("displayName");

    // Check if user exists in Firestore and create if necessary
    const userDoc = doc(database, "users", npub);
    const userSnapshot = await getDoc(userDoc);
    if (!userSnapshot.exists()) {
      await createUser(npub, userName);
    }

    const currentStep = await getUserStep(npub); // Retrieve the current step
    setIsSignedIn(true);
    navigate(`/step/${currentStep}`); // Navigate to the user's current step
  };

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleLaunchApp = () => {
    if (isCheckboxChecked) {
      navigate("/step/1");
    }
  };

  const handleCopyKeys = () => {
    const keysToCopy = `${keys.privateKey}`;
    navigator.clipboard.writeText(keysToCopy);
    toast({
      title: "Keys copied.",
      description: "Your keys have been copied to the clipboard.",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    if (view === "buttons" || view === "createAccount") {
      setIsSignedIn(false);
      localStorage.clear();
    }
  }, [view]);

  return (
    <Box
      textAlign="center"
      p={5}
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {view === "buttons" && (
        <VStack spacing={4}>
          <VStack spacing={4} width="95%" maxWidth="720px">
            <Text fontSize="2xl">Welcome to Program AI App!</Text>
            <Text size="sm">
              Get it over with. Use intelligent assistance to work through 100
              coding questions.
            </Text>
          </VStack>
          <HStack>
            <Button colorScheme="teal" onClick={() => setView("createAccount")}>
              Create Account
            </Button>
            <Button colorScheme="teal" onClick={() => setView("signIn")}>
              Sign In
            </Button>
          </HStack>
        </VStack>
      )}
      {view === "createAccount" && (
        <VStack spacing={4}>
          <Text fontSize="sm">Create a user name. It can be anything!</Text>
          <Input
            style={{ maxWidth: 300 }}
            placeholder="Enter a user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <HStack>
            <Button onClick={() => setView("buttons")}>Back</Button>
            <Button colorScheme="teal" onClick={handleCreateAccount}>
              Create
            </Button>
          </HStack>
        </VStack>
      )}
      {view === "signIn" && (
        <VStack spacing={4}>
          <Text fontSize="sm">Enter your nostr secret key</Text>

          <Input
            placeholder="Enter your secret key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <HStack>
            <Button onClick={() => setView("buttons")}>Back</Button>
            <Button colorScheme="teal" onClick={handleSignIn}>
              Sign In
            </Button>
          </HStack>
        </VStack>
      )}
      {view === "created" && keys && (
        <VStack spacing={4}>
          <Text width="95%" maxWidth="720px">
            That's all we need! <br />
            Your account now works on a number of decentralized apps. Use your
            key to sign into apps like ours,{" "}
            {isCheckboxChecked ? (
              <Link href="https://robotsbuildingeducation.com" color="teal.500">
                ROX the learning assistant
              </Link>
            ) : (
              "ROX the learning assistant"
            )}{" "}
            or social platforms like{" "}
            {isCheckboxChecked ? (
              <Link href="https://primal.net/home" color="teal.500">
                Primal
              </Link>
            ) : (
              "Primal"
            )}
            .
          </Text>
          <Button onClick={handleCopyKeys} variant={"outline"}>
            🔑 Copy Key
          </Button>
          <br />
          <HStack>
            <Checkbox
              direction="row"
              isChecked={isCheckboxChecked}
              onChange={handleCheckboxChange}
              style={{ textAlign: "left" }}
              width="95%"
              maxWidth="350px"
            >
              <Text fontSize="x-small" fontWeight={"bolder"}>
                I understand that my key allows me to sign into different apps
                that may contain important and private data like Bitcoin. I have
                safely stored my keys.
              </Text>
            </Checkbox>
          </HStack>
          <HStack>
            <Button onClick={() => setView("createAccount")}>Back</Button>
            <Button
              colorScheme="teal"
              onClick={handleLaunchApp}
              isDisabled={!isCheckboxChecked}
            >
              Launch App
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      const npub = localStorage.getItem("local_publicKey");
      if (npub) {
        setIsSignedIn(true);
        const currentStep = await getUserStep(npub);
        navigate(`/step/${currentStep}`);
      }
      setLoading(false);
    };

    initializeApp();
  }, [navigate]);

  if (loading) {
    return <Spinner />; // Show a loading spinner while initializing
  }

  return (
    <Box textAlign="center" fontSize="xl" p={5}>
      {isSignedIn && (
        <SettingsMenu isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
          }
        />
        {steps.map((_, index) => (
          <Route
            key={index}
            path={`/step/${index}`}
            element={
              <PrivateRoute>
                <Step currentStep={index} />
              </PrivateRoute>
            }
          />
        ))}
        <Route path="/award" element={<AwardScreen />} />
      </Routes>
    </Box>
  );
}

export const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
