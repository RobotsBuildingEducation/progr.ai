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
  Select,
  FormControl,
  FormLabel,
  Switch,
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
import {
  createUser,
  getUserData,
  getUserStep,
  incrementUserStep,
  updateUserData,
} from "./utility/nosql";
import { steps } from "./utility/content";
import { PrivateRoute } from "./PrivateRoute";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { database } from "./database/firebaseResources";
import { translation } from "./utility/translation";
import { useCashuWallet } from "./hooks/useCashuWallet";
import { Dashboard } from "./components/Dashboard/Dashboard";

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
  let modifiedText = text;
  Object.keys(phraseToSymbolMap).forEach((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, "gi");
    modifiedText = modifiedText.replace(regex, phraseToSymbolMap[phrase]);
  });
  return modifiedText;
};

const AwardScreen = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/q/0"); // Navigate to the first step to restart the quiz
  };

  return (
    <Box textAlign="center" p={5}>
      <Text fontSize="2xl" fontWeight="bold">
        Congratulations!
      </Text>
      <Text>You have completed the quiz. Well done!</Text>
      <Button mt={4} colorScheme="purple" onMouseDown={handleRestart}>
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
  userLanguage,
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
    let modifiedTranscript = transcript;

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
    SpeechRecognition.startListening({
      continuous: true,
      language: userLanguage === "en" ? "en-US" : "es-MX",
    });
  };

  const handleVoiceStop = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    let finalTranscript = transcript;
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
    SpeechRecognition.startListening({
      continuous: true,
      language: userLanguage === "en" ? "en-US" : "es-MX",
    });
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
            ` The JSON format should be { input: "${aiTranscript}", output: "your_answer" }. The output should strictly answer what is requested in javascript. Absolutely no other text or data should be included or communicated. Lastly the user is speaking in ${
              userLanguage === "en" ? "english" : "spanish"
            }`,
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
        )}", output: [{ code: "code_example", explanation: "explanation" }] }. Additionally the code should consider line breaks and formatting because it will be formatted after completion. Lastly the user is speaking in ${
          userLanguage === "en" ? "english" : "spanish"
        }`,
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
          <Button
            onMouseDown={handleVoiceStart}
            colorScheme="purple"
            variant={"outline"}
          >
            {translation[userLanguage]["app.button.voiceToText"]}
          </Button>
          <Button
            onMouseDown={handleAiStart}
            colorScheme="purple"
            variant={"outline"}
          >
            {" "}
            {translation[userLanguage]["app.button.voiceToAI"]}
          </Button>
          <Button colorScheme="purple" onMouseDown={handleLearnClick}>
            {translation[userLanguage]["app.button.learn"]}
          </Button>
        </HStack>
      ) : null}

      {isListening && (
        <HStack spacing={2} alignItems="center">
          <SunsetCanvas />
          <small> {translation[userLanguage]["app.listening"]}</small>
        </HStack>
      )}
      {aiListening && (
        <HStack spacing={2} alignItems="center">
          <SunsetCanvas />
          <small> {translation[userLanguage]["app.listening"]}</small>
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
            onChange={(value) => onChange(value, resetMessages)}
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
          height={"150px"}
          value={aiListening ? aiTranscript : value}
          onChange={(e) => {
            console.log("e", e.target.value);
            console.log("aiTranscript", aiTranscript);
            console.log("aiListening", aiListening);

            onChange(e.target.value);
          }}
          placeholder={translation[userLanguage]["app.input.placeholder"]}
          width="100%"
        />
      )}

      <EducationalModal
        isOpen={isOpen}
        onClose={onClose}
        educationalMessages={educationalMessages}
        educationalContent={educationalContent}
        userLanguage={userLanguage}
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
  userLanguage,
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
    <>
      <VoiceInput
        value={inputValue}
        onChange={setInputValue}
        isCodeEditor={false}
        isTerminal={isTerminal}
        resetVoiceState={resetVoiceState}
        stopListening={stopListening}
        setFeedback={setFeedback}
        resetFeedbackMessages={resetFeedbackMessages}
        step={step}
        userLanguage={userLanguage}
      />
      <div
        style={{ width: "100%", maxWidth: "600px", marginTop: 12, height: 300 }}
      >
        <ReactBash
          structure={structure}
          history={history}
          prefix={`user@mock-terminal:${cwd}$`}
        />
      </div>
    </>
  );
}

const Step = ({ currentStep, userLanguage, setUserLanguage }) => {
  const { stepIndex } = useParams();
  const currentStepIndex = parseInt(stepIndex, 10);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [resetVoiceState, setResetVoiceState] = useState(false);
  const [stopListening, setStopListening] = useState(false);
  const [streak, setStreak] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [interval, setInterval] = useState(0);
  const { cashTap } = useCashuWallet(true);

  const { resetMessages, messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  const { publishEvent } = useNOSTR(
    localStorage.getItem("local_publicKey"),
    localStorage.getItem("local_privateKey")
  );

  const navigate = useNavigate();
  const step = steps[userLanguage][currentStep];

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("local_publicKey");
      const userData = await getUserData(userId);

      setStreak(userData.streak || 0);
      setStartTime(new Date(userData.startTime));
      setEndTime(new Date(userData.endTime));
      setInterval(userData.timer || 0);

      const currentTime = new Date();
      if (currentTime > new Date(userData.endTime)) {
        setStreak(0);
        const newEndTime = new Date(
          currentTime.getTime() + (userData.timer || 0) * 60000
        );
        setStartTime(currentTime);
        setEndTime(newEndTime);
        await updateUserData(
          userId,
          userData.timer,
          0,
          currentTime,
          newEndTime
        );
      }
    };

    fetchUserData();
  }, []);

  const calculateProgress = () => {
    return ((currentStep - 1) / (steps[userLanguage].length - 1)) * 100;
  };

  const handleInputChange = (value, resetter = null) => {
    setInputValue(value);
    if (resetter) {
      resetter();
    }
    // setFeedback("");
  };

  const handleAnswerClick = async () => {
    setIsSending(true);
    setResetVoiceState(true);
    setStopListening(true);
    setInputValue("");

    await submitPrompt([
      {
        content: `The user is answering the following question "${
          step.question.questionText
        }" with the following answer "${inputValue}". Is this answer correct? Return the response using a json interface like { isCorrect: boolean, feedback: string }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction. The user is speaking ${
          userLanguage === "es" ? "spanish" : "english"
        }.`,
        role: "user",
      },
    ]);

    cashTap();

    setIsSending(false);
    setResetVoiceState(false);
  };

  const storeCorrectAnswer = async (step, answer) => {
    const userId = localStorage.getItem("local_publicKey");
    const answerRef = collection(database, `users/${userId}/answers`);
    await addDoc(answerRef, {
      step: currentStep,
      question: step.question.questionText,
      correctAnswer: answer,
      timestamp: new Date(),
    });

    const currentTime = new Date();
    let newStreak = streak;

    if (currentTime <= new Date(endTime)) {
      newStreak += 1; // Increment streak if within time
    } else {
      newStreak = 1; // Reset streak if not within time
    }

    const newEndTime = new Date(currentTime.getTime() + interval * 60000);
    setStartTime(currentTime);
    setEndTime(newEndTime);
    setStreak(newStreak);

    await updateUserData(userId, interval, newStreak, currentTime, newEndTime);
    // setFeedback(answer);
    console.log("Updated User Data after Correct Answer:", {
      userId,
      timer: interval,
      streak: newStreak,
      startTime: currentTime.toISOString(),
      endTime: newEndTime.toISOString(),
    });
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        const jsonResponse = JSON.parse(lastMessage.content);
        console.log("JSONRESPON", jsonResponse);
        setIsCorrect(jsonResponse.isCorrect);
        console.log("run");
        setFeedback(jsonResponse.feedback);

        if (jsonResponse.isCorrect) {
          const npub = localStorage.getItem("local_publicKey");
          incrementUserStep(npub);
          storeCorrectAnswer(step, jsonResponse.feedback);
        }
      }
    }
  }, [messages]);

  useEffect(() => {
    console.log("RUN");
    setInputValue("");
    setFeedback("");
    setIsCorrect(null);
    resetMessages();
  }, [step]);

  const handleNextClick = () => {
    if (currentStep === steps.length - 1) {
      navigate("/award");
    } else {
      handleInputChange(null);
      publishEvent("I just completed question 2 on https://program-ai.app");
      navigate(`/q/${currentStep + 1}`);
    }
  };

  const handleBackClick = () => {
    if (currentStep === 1) {
      navigate(`/`);
    } else {
      navigate(`/q/${currentStep - 1}`);
    }
  };

  console.log("Fdb", feedback);
  console.log("msg", messages);
  return (
    <VStack spacing={4} width="100%" mt={24}>
      <VStack textAlign={"left"} style={{ width: "100%", maxWidth: 400 }}>
        <b style={{ fontSize: "60%" }}>
          {translation[userLanguage]["app.progress"]} :{" "}
          {calculateProgress().toFixed(2)}% |{" "}
          {translation[userLanguage]["app.streak"]}: {streak}
        </b>
        <Progress
          value={calculateProgress()}
          size="xs"
          colorScheme="purple"
          width="100%"
          mb={4}
        />
      </VStack>
      <Text fontSize="xl">
        {currentStep}. {step.title}
      </Text>
      {step.question && <Text fontSize="sm">{step.question.questionText}</Text>}

      {step.isText && (
        <VoiceInput
          value={inputValue}
          onChange={setInputValue}
          isCodeEditor={false}
          isTextInput={true}
          resetVoiceState={resetVoiceState}
          useVoice={true}
          stopListening={stopListening}
          setFeedback={setFeedback}
          resetFeedbackMessages={resetMessages}
          step={step}
          userLanguage={userLanguage}
        />
      )}
      {step.isCode && !step.isTerminal && (
        <VoiceInput
          value={inputValue}
          onChange={setInputValue}
          isCodeEditor={true}
          resetVoiceState={resetVoiceState}
          useVoice={true}
          stopListening={stopListening}
          setFeedback={setFeedback}
          resetFeedbackMessages={resetMessages}
          step={step}
          userLanguage={userLanguage}
        />
      )}
      {step.isCode && step.isTerminal && (
        <Box
          width="100%"
          justifyContent="center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TerminalComponent
            inputValue={inputValue}
            setInputValue={setInputValue}
            isSending={isSending}
            isTerminal={true}
            stopListening={stopListening}
            resetVoiceState={resetVoiceState}
            setFeedback={setFeedback}
            resetFeedbackMessages={resetMessages}
            step={step}
            userLanguage={userLanguage}
          />
        </Box>
      )}
      <HStack spacing={4}>
        {step.title === "Welcome to the Program AI App!" ? (
          <Button colorScheme="purple" onMouseDown={handleNextClick}>
            Let's start
          </Button>
        ) : (
          step.question && (
            <Button onMouseDown={handleAnswerClick} isLoading={isSending}>
              {translation[userLanguage]["app.button.answer"]}
            </Button>
          )
        )}
        {isCorrect && (
          <Button variant={"outline"} onMouseDown={handleNextClick}>
            {translation[userLanguage]["app.button.nextQuestion"]}{" "}
          </Button>
        )}
      </HStack>
      {messages.length > 0 && !feedback && (
        <Box mt={4} p={4} borderRadius="lg" width="100%" maxWidth="640px">
          <Text>{messages[messages.length - 1]?.content}</Text>
        </Box>
      )}
      {feedback && (
        <Box mt={4} p={4} borderRadius="lg" width="100%" maxWidth="640px">
          <Text color={isCorrect ? "green.500" : "red.500"}>{feedback}</Text>
        </Box>
      )}
    </VStack>
  );
};

const Home = ({ isSignedIn, setIsSignedIn, userLanguage, setUserLanguage }) => {
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

    // Create user in Firestore with language preference
    await createUser(newKeys.publicKey, userName, userLanguage);
  };

  const handleSignIn = async () => {
    await authenticate(secretKey);
    const npub = localStorage.getItem("local_publicKey");
    const userName = localStorage.getItem("displayName");

    // Check if user exists in Firestore and create if necessary
    const userDoc = doc(database, "users", npub);
    const userSnapshot = await getDoc(userDoc);
    if (!userSnapshot.exists()) {
      await createUser(npub, userName, userLanguage);
    }

    const currentStep = await getUserStep(npub); // Retrieve the current step
    setIsSignedIn(true);
    navigate(`/q/${currentStep}`); // Navigate to the user's current step
  };

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleLaunchApp = () => {
    if (isCheckboxChecked) {
      navigate("/q/1");
    }
  };

  const handleCopyKeys = () => {
    const keysToCopy = `${keys.privateKey}`;
    navigator.clipboard.writeText(keysToCopy);
    toast({
      title: translation[userLanguage]["toast.title.keysCopied"],
      description: translation[userLanguage]["toast.description.keysCopied"],
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    if (view === "buttons" || view === "createAccount") {
      setIsSignedIn(false);
      const translateValue = localStorage.getItem("userLanguage");
      localStorage.clear();
      if (translateValue) {
        localStorage.setItem("userLanguage", translateValue);
      }
    }
  }, [view]);

  const handleToggle = async () => {
    const newLanguage = userLanguage === "en" ? "es" : "en";
    setUserLanguage(newLanguage);

    // Update local storage
    localStorage.setItem("userLanguage", newLanguage);

    // Update Firestore
    const npub = localStorage.getItem("local_publicKey");
    if (npub) {
      const userDoc = doc(database, "users", npub);
      await updateDoc(userDoc, {
        language: newLanguage,
      });
    }
  };

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
            <HStack spacing={2} alignItems="center">
              <SunsetCanvas />
            </HStack>
            <Text fontSize="2xl">
              {translation[userLanguage]["landing.welcome"]}
            </Text>
            <Text fontSize="sm">
              {translation[userLanguage]["landing.introduction"]}
            </Text>
            <FormControl
              display="flex"
              alignItems="center"
              style={{ justifyContent: "center" }}
              m={2}
            >
              <FormLabel htmlFor="language-toggle" mb="0">
                {userLanguage === "en" ? "English" : "Español"}
              </FormLabel>
              <Switch
                colorScheme="purple"
                id="language-toggle"
                isChecked={userLanguage === "es"}
                onChange={handleToggle}
              />
            </FormControl>
          </VStack>

          <HStack>
            <Button
              colorScheme="purple"
              variant={"outline"}
              onMouseDown={() => setView("createAccount")}
            >
              {translation[userLanguage]["landing.button.createAccount"]}
            </Button>
            <Button
              colorScheme="purple"
              variant={"outline"}
              onMouseDown={() => setView("signIn")}
            >
              {translation[userLanguage]["landing.button.signIn"]}{" "}
            </Button>
          </HStack>
        </VStack>
      )}
      {view === "createAccount" && (
        <VStack spacing={4}>
          <Text fontSize="sm">
            {" "}
            {translation[userLanguage]["createAccount.instructions"]}{" "}
          </Text>
          <Input
            style={{ maxWidth: 300 }}
            placeholder={
              translation[userLanguage]["createAccount.input.placeholder"]
            }
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <HStack>
            <Button variant="outline" onMouseDown={() => setView("buttons")}>
              {" "}
              {translation[userLanguage]["button.back"]}
            </Button>
            <Button
              onMouseDown={handleCreateAccount}
              colorScheme="purple"
              variant={"outline"}
            >
              {translation[userLanguage]["button.create"]}
            </Button>
          </HStack>
        </VStack>
      )}
      {view === "signIn" && (
        <VStack spacing={4}>
          <Text fontSize="sm">
            {translation[userLanguage]["signIn.instructions"]}
          </Text>
          <Input
            placeholder={translation[userLanguage]["signIn.input.placeholder"]}
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <HStack>
            <Button variant="outline" onMouseDown={() => setView("buttons")}>
              {translation[userLanguage]["button.back"]}
            </Button>
            <Button
              onMouseDown={handleSignIn}
              colorScheme="purple"
              variant={"outline"}
            >
              {translation[userLanguage]["landing.button.signIn"]}
            </Button>
          </HStack>
        </VStack>
      )}
      {view === "created" && keys && (
        <VStack spacing={4}>
          <Text width="95%" maxWidth="720px">
            {translation[userLanguage]["createAccount.successMessage"]} <br />
            <Text fontSize="sm">
              {translation[userLanguage]["createAccount.awareness"]}
              {isCheckboxChecked ? (
                <Link
                  href="https://robotsbuildingeducation.com"
                  color="teal.500"
                  style={{ textDecoration: "underline" }}
                >
                  {translation[userLanguage]["createAccount.roxLink"]}
                </Link>
              ) : (
                translation[userLanguage]["createAccount.roxLink"]
              )}{" "}
              {translation[userLanguage]["or"] + " "}
              {isCheckboxChecked ? (
                <Link
                  href="https://primal.net/home"
                  color="teal.500"
                  style={{ textDecoration: "underline" }}
                >
                  {translation[userLanguage]["createAccount.primalLink"]}
                </Link>
              ) : (
                translation[userLanguage]["createAccount.primalLink"]
              )}
              .
            </Text>
          </Text>
          <Button onMouseDown={handleCopyKeys}>
            🔑 {translation[userLanguage]["button.copyKey"]}
          </Button>

          <HStack>
            <Checkbox
              colorScheme="purple"
              direction="row"
              isChecked={isCheckboxChecked}
              onChange={handleCheckboxChange}
              style={{ textAlign: "left" }}
              width="95%"
              maxWidth="350px"
            >
              <Text fontSize="x-small" fontWeight={"bolder"}>
                {translation[userLanguage]["createAccount.checkbox.disclaimer"]}
              </Text>
            </Checkbox>
          </HStack>
          <HStack>
            <Button
              variant="outline"
              onMouseDown={() => setView("createAccount")}
            >
              {" "}
              {translation[userLanguage]["button.back"]}
            </Button>
            <Button
              onMouseDown={handleLaunchApp}
              isDisabled={!isCheckboxChecked}
              colorScheme="purple"
              variant={"outline"}
            >
              {translation[userLanguage]["createAccount.button.launchApp"]}
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
  const [currentStep, setCurrentStep] = useState(0); // State to store current step
  const [userLanguage, setUserLanguage] = useState("en"); // State to store user language preference
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      const npub = localStorage.getItem("local_publicKey");
      if (npub && window.location.pathname !== "/dashboard") {
        setIsSignedIn(true);
        const step = await getUserStep(npub); // Fetch the current step
        setCurrentStep(step);

        // Fetch user language preference
        const userDoc = doc(database, "users", npub);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserLanguage(userData.language || "en"); // Set user language preference
          localStorage.setItem("userLanguage", userData.language);
        }

        navigate(`/q/${step}`);
      }

      if (localStorage.getItem("userLanguage")) {
        setUserLanguage(localStorage.getItem("userLanguage") || "en");
      } else {
        localStorage.setItem("userLanguage", "en");
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
        <SettingsMenu
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          steps={steps}
          userLanguage={userLanguage}
          setUserLanguage={setUserLanguage}
          currentStep={currentStep} // Pass current step to SettingsMenu
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
              userLanguage={userLanguage}
              setUserLanguage={setUserLanguage}
            />
          }
        />
        {steps[userLanguage].map((_, index) => (
          <Route
            key={index}
            path={`/q/${index}`}
            element={
              <PrivateRoute>
                <Step
                  currentStep={index}
                  userLanguage={userLanguage}
                  setUserLanguage={setUserLanguage}
                />
              </PrivateRoute>
            }
          />
        ))}
        <Route path="/award" element={<AwardScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
