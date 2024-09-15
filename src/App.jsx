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
  Heading,
  OrderedList,
  ListItem,
  Icon,
  IconButton,
  Fade,
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
  useLocation,
} from "react-router-dom";

import { useChatCompletion } from "./hooks/useChatCompletion";
import { SunsetCanvas } from "./elements/SunsetCanvas";
import EducationalModal from "./components/LearnModal/EducationalModal";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";
import { useSharedNostr } from "./hooks/useNOSTR";
import {
  createUser,
  getUserData,
  getUserStep,
  incrementToFinalAward,
  incrementUserStep,
  updateUserData,
} from "./utility/nosql";
import { getObjectsByGroup, steps } from "./utility/content";
import { PrivateRoute } from "./PrivateRoute";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database } from "./database/firebaseResources";
import { translation } from "./utility/translation";
import { useCashuWallet } from "./hooks/useCashuWallet";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { isUnsupportedBrowser } from "./utility/browser";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoShareOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import MultipleChoiceQuestion from "./components/MultipleChoice/MultipleChoice";
import SelectOrderQuestion from "./components/SelectOrder/SelectOrder";

import Confetti from "react-confetti";
import { About } from "./About";
import ConversationReview from "./components/ConversationReview/ConversationReview";
import RandomCharacter, {
  FadeInComponent,
  PanLeftComponent,
  PanRightComponent,
  RiseUpAnimation,
} from "./elements/RandomCharacter";
import MultipleAnswerQuestion from "./components/MultipleAnswerQuestion/MultipleAnswerQuestion";
import { DataTags } from "./elements/DataTag";
import { transcript } from "./utility/transcript";
import AwardModal from "./components/AwardModal/AwardModal";
import CodeCompletionQuestion from "./components/CodeCompletionQuestion/CodeCompletionQuestion";
import useCashuStore from "./useCashuStore";

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

const AwardScreen = (userLanguage) => {
  const [documentIds, setDocumentIds] = useState([]); // State to store document IDs

  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/q/0"); // Navigate to the first step to restart the quiz
  };

  useEffect(() => {
    // Retrieve user ID from local storage
    const userID = localStorage.getItem("local_npub");

    // Push to Firestore "completed" collection
    const saveCompletionData = async () => {
      if (userID) {
        try {
          // Create a reference to the document using the userID
          const docRef = doc(database, "completed", userID);

          // Set the document with the current timestamp
          await setDoc(docRef, {
            completedAt: new Date().toISOString(),
          });

          console.log("Completion data saved to Firestore!");
        } catch (error) {
          console.error("Error saving completion data: ", error);
        }
      }
    };

    const fetchCompletedDocuments = async () => {
      try {
        const completedCollection = collection(database, "completed");
        const querySnapshot = await getDocs(completedCollection);

        // Extract document IDs
        const ids = querySnapshot.docs.map((doc) => doc.id);
        setDocumentIds(ids); // Set document IDs in state
      } catch (error) {
        console.error("Error fetching document IDs: ", error);
      }
    };

    fetchCompletedDocuments();

    saveCompletionData();
  }, []);

  console.log("translation", translation);
  console.log("language", userLanguage);
  console.log("x", translation[userLanguage.userLanguage]["badBrowser.header"]);
  return (
    <Box
      textAlign="center"
      p={5}
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "48px",
          width: "100%",
        }}
      >
        <img
          src={
            "https://res.cloudinary.com/dtkeyccga/image/upload/v1724208228/Screenshot_2024-08-20_at_7.43.28_PM_fioetr.png"
          }
          height={300}
          width={375}
          style={{ boxShadow: "0px 0.25px 0.25px 0.5px rgba(0,0,0, 0.25)" }}
        />
      </div>
      <br />
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Text fontSize="2xl" fontWeight="bold">
          {translation[userLanguage.userLanguage]["congratulations"]}
        </Text>
        <Text fontSize="medium">
          {translation[userLanguage.userLanguage]["congrats.message"]}
        </Text>
        <br />
        <Text fontSize={"sm"}>
          {translation[userLanguage.userLanguage]["congrats.connect"]}
        </Text>
        <br />
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {documentIds.length > 0 ? (
            documentIds.map((id) => (
              <li key={id}>
                <a href={`https://primal.net/p/${id}`} target="_blank">
                  https://primal.net/p/{id.substr(0, 8)}
                </a>
              </li>
            ))
          ) : (
            <Text fontSize="sm">
              {translation[userLanguage.userLanguage]["loading"]}
            </Text>
          )}
        </ul>
      </div>
    </Box>
  );
};
export const VoiceInput = ({
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
  currentStep,
  steps = [],
  isSingleLineText = false,
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [aiListening, setAiListening] = useState(false);
  const [aiTranscript, setAiTranscript] = useState("");
  const [generateResponse, setGenerateResponse] = useState(false);
  const { resetMessages, messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });
  const [isWarningNotDismissed, setIsWarningNotDismissed] = useState(true);

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
  const toast = useToast();

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
      }, 1750); // 1 second
    } else if (isListening && modifiedTranscript) {
      pauseTimeoutRef.current = setTimeout(() => {
        handleVoiceStop();
      }, 1750); // 1 second
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

  if (!browserSupportsSpeechRecognition || !browserSupportsSpeechRecognition) {
    alert("Your browser doesn't support speech recognition.");
    return <span>Your browser doesn't support speech recognition.</span>;
  }
  const handleCopyKeys = () => {
    const keysToCopy = `${localStorage.getItem("local_nsec")}`;
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

  const handleVoiceStart = () => {
    resetFeedbackMessages();
    setFeedback("");
    // setGrade("");
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
    onChange(finalTranscript.toLocaleLowerCase());
  };

  const handleAiStart = () => {
    resetFeedbackMessages();
    setFeedback("");
    // setGrade("");
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

    if (!step?.isConversationReview) {
      await submitEducationalPrompt([
        {
          content: `Generate educational material about ${JSON.stringify(
            step
          )} with code examples and explanations. Make it enriching and create a useful flow where the ideas build off of each other to encourage challenge and learning. The JSON format should be { output: [{ code: "code_example", explanation: "explanation" }] }. Additionally the code should consider line breaks and formatting because it will be formatted after completion. Lastly the user is speaking in ${
            userLanguage === "en" ? "english" : "spanish"
          }`,
          role: "user",
        },
      ]);
    } else {
      const relevantSteps = getObjectsByGroup(
        step?.groupReference,
        steps[userLanguage]
      );

      await submitEducationalPrompt([
        {
          content: `Generate educational material about ${JSON.stringify(
            relevantSteps
          )} with code examples and explanations. Make it enriching and create a useful flow where the ideas build off of each other to encourage challenge and learning. The JSON format should be { input: "${JSON.stringify(
            step
          )}", output: [{ code: "code_example", explanation: "explanation" }] }. Additionally the code should consider line breaks and formatting because it will be formatted after completion. Lastly the user is speaking in ${
            userLanguage === "en" ? "english" : "spanish"
          }`,
          role: "user",
        },
      ]);
    }
  };
  // Dynamically adjust the height of the textarea as the content changes
  useEffect(() => {
    if (isTextInput) {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height based on content
      }
    }
  }, [value]); // Re-run effect every time the value changes

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

  const textareaRef = useRef(null);

  return (
    <VStack spacing={4} alignItems="center" width="100%" maxWidth={"600px"}>
      {useVoice || isTerminal ? (
        <HStack spacing={4} justifyContent={"center"} maxWidth={"400px"}>
          <Button
            onMouseDown={handleVoiceStart}
            colorScheme="purple"
            variant={"outline"}
            // isDisabled={isUnsupportedBrowser()}
          >
            {translation[userLanguage]["app.button.voiceToText"]}
          </Button>
          <Button
            onMouseDown={handleAiStart}
            colorScheme="purple"
            variant={"outline"}
            // isDisabled={isUnsupportedBrowser()}
          >
            {" "}
            {translation[userLanguage]["app.button.voiceToAI"]}
          </Button>
          <Button colorScheme="purple" onMouseDown={handleLearnClick}>
            {translation[userLanguage]["app.button.learn"]}
          </Button>
        </HStack>
      ) : null}
      {isWarningNotDismissed && isUnsupportedBrowser() && currentStep === 5 ? (
        <>
          <br />
          <VStack
            p={4}
            pt={8}
            style={{
              backgroundColor: "rgba(207,124,208, 1)",
              color: "white",
              borderRadius: "64px",
            }}
          >
            <Button onMouseDown={() => setIsWarningNotDismissed(false)}>
              {translation[userLanguage]["button.dismiss"]}
            </Button>
            <Button onMouseDown={handleCopyKeys}>
              🔑 {translation[userLanguage]["button.copyKey"]}
            </Button>
            <Heading size="lg">
              {translation[userLanguage]["badBrowser.header"]}{" "}
            </Heading>
            <Text p={8} pt={0} textAlign={"left"}>
              {translation[userLanguage]["badBrowser.bodyOne"]}&nbsp;
              {isUnsupportedBrowser()}{" "}
              {translation[userLanguage]["badBrowser.bodyTwo"]}{" "}
              <b>{translation[userLanguage]["badBrowser.bodyThree"]}</b>
            </Text>{" "}
            <OrderedList p={8} pt={0} textAlign={"left"}>
              <ListItem>
                <span style={{ display: "flex" }}>
                  <IconButton mr={"2"} isDisabled icon={<IoIosMore />} />
                  {translation[userLanguage]["badBrowser.stepOne"]}
                  &nbsp;
                </span>
              </ListItem>
              <br />
              <ListItem>
                <span style={{ display: "flex" }}>
                  <IconButton mr={"2"} isDisabled icon={<IoShareOutline />} />
                  {translation[userLanguage]["badBrowser.stepTwo"]}
                  &nbsp;
                </span>
              </ListItem>
              <br />
              <ListItem>
                <span style={{ display: "flex" }}>
                  <IconButton mr={"2"} isDisabled icon={<PlusSquareIcon />} />
                  {translation[userLanguage]["badBrowser.stepThree"]} &nbsp;
                </span>
              </ListItem>
            </OrderedList>
            <Text p={8} pt={0} textAlign={"left"}>
              {translation[userLanguage]["badBrowser.footer"]}{" "}
            </Text>
          </VStack>
        </>
      ) : null}

      {isListening && (
        <HStack spacing={2} alignItems="center">
          <SunsetCanvas />
          <FadeInComponent speed="0.25s">
            <Text
              fontSize={"smaller"}
              backgroundColor="white"
              color="black"
              fontWeight={"bold"}
              borderRadius="8px"
              padding="10px"
            >
              {" "}
              {translation[userLanguage]["app.listening"]}
            </Text>
          </FadeInComponent>
        </HStack>
      )}
      {aiListening && (
        <HStack spacing={2} alignItems="center">
          <SunsetCanvas />
          <FadeInComponent speed="0.25s">
            <Text
              fontSize={"smaller"}
              backgroundColor="white"
              color="black"
              fontWeight={"bold"}
              borderRadius="8px"
              padding="10px"
            >
              {" "}
              {translation[userLanguage]["app.listening"]}
            </Text>
          </FadeInComponent>
        </HStack>
      )}

      {isCodeEditor ? (
        <Box
          width="99%"
          height="400px"
          bg="white"
          style={{
            padding: 15,
            borderRadius: "8px",
            border: "1px solid black",
          }}
        >
          <MonacoEditor
            height="100%"
            width="100%"
            language="javascript"
            // theme="light"
            value={value}
            onChange={(value) => onChange(value, resetMessages)}
            options={{
              fontSize: "10px",
              wordWrap: "off",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              minimap: {
                enabled: false,
              },
            }}
          />
        </Box>
      ) : isSingleLineText ? (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={translation[userLanguage]["app.input.placeholder"]}
          maxWidth="600px"
          width="100%"
          style={{ boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.35)" }}
        />
      ) : (
        <Textarea
          ref={textareaRef}
          style={{ boxShadow: "0px 0px 24px -20px rgba(0,0,0,0.75)" }}
          type="textarea"
          maxWidth={"100%"}
          minHeight={isTerminal ? "100px" : "400px"}
          value={aiListening ? aiTranscript : value}
          onChange={(e) => {
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
      value: translation[userLanguage]["mockTerminal.welcomeMessage"],
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
              value: translation[userLanguage]["mockTerminal.help"],
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
              {
                value: `cat: ${filePath}: ${translation[userLanguage]["mockTerminal.noSuchFile"]}`,
              },
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
            setHistory([
              ...history,
              {
                value: `${translation[userLanguage]["mockTerminal.directory"]} ${newDir} created.`,
              },
            ]);
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

  useEffect(() => {
    const commands = ["mkdir new_folder"];

    commands.forEach((command) => {
      const parts = command.split(" ");
      const cmd = parts[0];
      const arg = parts[1];

      const customExtensions = {
        mkdir: {
          exec: ({ structure, history, cwd }, command) => {
            const args = command.split(" ");
            const newDir = args[1];
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
              setHistory([
                ...history,
                {
                  value: `${translation[userLanguage]["mockTerminal.directory"]} ${newDir} created.`,
                },
              ]);
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
        touch: {
          exec: ({ structure, history, cwd }, command) => {
            const args = command.split(" ");
            const newFile = args[1];
            const currentDir =
              cwd === "/"
                ? structure
                : cwd
                    .split("/")
                    .filter((p) => p)
                    .reduce((acc, dir) => acc[dir], structure);

            if (!currentDir[newFile]) {
              currentDir[newFile] = "";
              setStructure({ ...structure });
              setHistory([...history, { value: `File ${newFile} created.` }]);
            } else {
              setHistory([
                ...history,
                {
                  value: `bash: touch: cannot create file '${newFile}': File exists`,
                },
              ]);
            }
          },
        },
      };

      customExtensions[cmd].exec({ structure, history, cwd }, command);
    });
  }, []);

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
          isDisabled
          structure={structure}
          history={history}
          prefix={`${translation[userLanguage]["mockTerminal.userName"]}${cwd}$`}
        />
      </div>
    </>
  );
}

const Step = ({
  currentStep,
  userLanguage,
  setUserLanguage,
  postNostrContent,
  assignExistingBadgeToNpub,
}) => {
  const { stepIndex } = useParams();
  const currentStepIndex = parseInt(stepIndex, 10);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // For Multiple Choice
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [items, setItems] = useState([]); // For Select Order
  const [isSending, setIsSending] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [resetVoiceState, setResetVoiceState] = useState(false);
  const [stopListening, setStopListening] = useState(false);
  const [streak, setStreak] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [interval, setInterval] = useState(0);
  const { cashTap } = useCashuStore();
  const [grade, setGrade] = useState("");

  const { resetMessages, messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  const navigate = useNavigate();
  const step = steps[userLanguage][currentStep];

  const [isPostingWithNostr, setIsPostingWithNostr] = useState(false);

  const [finalConversation, setFinalConversation] = useState([]);

  const {
    isOpen: isAwardModalOpen,
    onOpen: onAwardModalOpen,
    onClose: onAwardModalClose,
  } = useDisclosure();

  // Fetch user data and manage streaks and timers
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("local_npub");
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
    // onAwardModalOpen();
  }, []);

  // Initialize items for Select Order question
  useEffect(() => {
    if (step.isSelectOrder) {
      setItems(step.question.options.sort(() => Math.random() - 0.5));
    }
  }, [step]);

  useEffect(() => {
    if (isCorrect) {
      cashTap();

      postNostrContent(
        `${translation[userLanguage]["nostrContent.answeredQuestion.1"]} ${currentStep} ${translation[userLanguage]["nostrContent.answeredQuestion.2"]} ${grade}% ${translation[userLanguage]["nostrContent.answeredQuestion.3"]} https://program-ai.app \n\n${step.question?.questionText} #LearnWithNostr https://m.primal.net/KBLq.png`
      );
      if (step.isConversationReview) {
        assignExistingBadgeToNpub(transcript[step.groupReference]["address"]);

        onAwardModalOpen();
      }
    }
  }, [isCorrect]);

  // Calculate progress through the steps
  const calculateProgress = () => {
    return ((currentStep - 1) / (steps[userLanguage].length - 1)) * 100;
  };

  // Handle input change
  const handleInputChange = (value, resetter = null) => {
    setInputValue(value);
    if (resetter) {
      resetter();
    }
  };

  // Handle answer submission
  const handleAnswerClick = async () => {
    resetMessages();
    setFeedback("");
    setGrade("");
    setIsSending(true);
    setResetVoiceState(true);
    setStopListening(true);

    let answer = inputValue;
    if (step.isMultipleChoice) {
      answer = selectedOption;
    } else if (step.isCodeCompletion) {
      answer = selectedOption;
    } else if (step.isSelectOrder) {
      answer = items;
    } else if (step.isConversationReview) {
      answer = finalConversation;
    } else if (step.isMultipleAnswerChoice) {
      answer = selectedOptions;
    }

    if (step.isConversationReview) {
      const relevantSteps = getObjectsByGroup(
        step?.groupReference,
        steps[userLanguage]
      );

      await submitPrompt([
        {
          content: `The user is having a conversation and reviewing the following subjects"${JSON.stringify(
            relevantSteps
          )}". The user provided the following conversation "${JSON.stringify(
            answer
          )}". The answer is always correct since this is just a check-in feature. Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string  }. Do not mention the previous details. Your feedback will include a grade ranging from 0-100 based on the quality of the conversation. Be a tough grader and don't be afraid to give users a failing grade or even a 0 if a user inputs nothing relevant to the conversation. Be tough and fair and don't worry about being nice. If the information they put is irrelevant, straight up just flunk them with a 0. Always include the grade in every circumstance. Do not include the answer or solution in your feedback as there is none and the "answer" is always correct, therefore isCorrect is always true. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    } else if (step.isSelectOrder) {
      await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }". The answer to the question is an array [${step.question.answer}]
          and the user provided the following answer array [${answer}]. Is this answer correct?Determine by comparing the two arrays rather than observing your opinion over the correctness of an answer. Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string  }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction.  Your feedback will include a grade ranging from 0-100 based on the quality of the answer -  however if the answer is correct just reward a 100. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    } else if (step.isMultipleChoice || step.isCodeCompletion) {
      await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }". The question's answer is defined as ${
            step.question.answer
          } and the user submitted the following answer array: ${answer}. Is this answer correct? Determine by strictly comparing the question's answer and the submitted user answer. Only the question's answer is acceptabe. Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  -  however if the answer is correct just reward a 100. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    } else if (step.isSingleLineText) {
      await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }". The answer to the question is defined as ${
            step.question.answer
          } and the user submitted the following answer: ${answer}. Is this answer correct or logically equivalent? Determine by comparing the defined answer and the submitted answer. Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  -  however if the answer is correct just reward a 100. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    } else if (step.isMultipleAnswerChoice) {
      await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }". The answer to the question is defined as ${JSON.stringify(
            step.question.answer
          )} and the user submitted the following answer array ${JSON.stringify(
            answer
          )}. Is this answer correct? Determine by comparing the defined answer and the submitted answer. Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  -  however if isCorrect is true just reward a 100. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    } else if (step.isText) {
      await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }" with the following answer "${answer}". Is this answer correct? Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string, comprehensive: boolean }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction. Do not be super opinionated - if the user essentially got the answer right then just accept it. If it appears the user provided or attempted depth of understanding, provide a score of 100. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  - however award a grade of 100 if comprehensive boolean is true. If the answer is correct but lazy, award a grade of less than an 80 but higher than a 50 . The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    } else if (step.isTerminal) {
      await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }" with the following answer "${answer}". Is this answer correct? Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction, also dont be super opinionated - if the user essentially got the answer right then just accept it. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  - however if the answer is correct just award a 100. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    } else {
      await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }" with the following answer "${answer}". Is this answer correct? Return the response using a json interface like { isCorrect: boolean,  feedback: string, grade: string, comprehensive: boolean }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction, also dont be super opinionated - if the user essentially got the answer right then just accept it. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  - however if the answer is correct, provide a grade of 100. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    }

    if (isCorrect) {
      setInputValue("");
      setSelectedOption(""); // Reset the selected option after submission
    } else {
    }

    setIsSending(false);
    setResetVoiceState(false);
  };

  const validateMultipleChoiceAnswers = (selectedOptions, correctAnswers) => {
    // // Check if selected options are the same as correct answers
    // if (selectedOptions.length !== correctAnswers.length) {
    //   return false;
    // }
    // let areChoicesCorrect = selectedOptions.every((option) =>
    //   correctAnswers.includes(option)
    // );
    // setIsCorrect(areChoicesCorrect);
    // if (areChoicesCorrect) {
    //   setFeedback("Correct! Well done.");
    // } else {
    //   setFeedback("Incorrect. Try again.");
    // }
  };

  // Store correct answers in the database
  const storeCorrectAnswer = async (step, feedback) => {
    const userId = localStorage.getItem("local_npub");
    const answerRef = collection(database, `users/${userId}/answers`);
    await addDoc(answerRef, {
      title: step.title,
      description: step.description,
      step: currentStep,
      question: step.question.questionText,
      feedback: feedback,
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
  };

  // Stream messages and handle feedback
  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.meta.loading) {
        const jsonResponse = JSON.parse(lastMessage.content);

        setIsCorrect(jsonResponse.isCorrect);
        setFeedback(jsonResponse.feedback);

        if (jsonResponse.isCorrect) {
          setGrade(jsonResponse.grade);
        }
      }
    }
  }, [messages]);

  // Reset state for a new step
  useEffect(() => {
    setInputValue("");
    setFeedback("");
    setFeedback("");
    setIsCorrect(null);
    resetMessages();
  }, [step]);

  // Navigate to the next step
  const handleNextClick = async () => {
    console.log("currentStep...", currentStep);
    if (currentStep >= steps[userLanguage].length - 1) {
      const npub = localStorage.getItem("local_npub");
      await incrementToFinalAward(npub);
      navigate("/award");
    } else {
      setIsPostingWithNostr(true);

      try {
        const npub = localStorage.getItem("local_npub");
        await incrementUserStep(npub);
        await storeCorrectAnswer(step, feedback);

        setIsPostingWithNostr(false);
        navigate(`/q/${currentStep + 1}`);
      } catch (error) {
        setIsPostingWithNostr(false);
      }
    }
  };

  // Navigate back to the previous step
  const handleBackClick = () => {
    if (currentStep === 1) {
      navigate(`/`);
    } else {
      navigate(`/q/${currentStep - 1}`);
    }
  };

  const {
    resetMessages: resetEducationalMessages,
    messages: educationalMessages,
    submitPrompt: submitEducationalPrompt,
  } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  const [educationalContent, setEducationalContent] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // New function for handling the "Learn" button click
  const handleLearnClick = async () => {
    onOpen();
    await submitEducationalPrompt([
      {
        content: `Generate educational Javascript material about ${JSON.stringify(
          step
        )} with code examples and explanations. Make it enriching and create a useful flow where the ideas build off of each other to encourage challenge and learning. The JSON format should be { input: "${JSON.stringify(
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

  const getColorScheme = (group) => {
    const colorMap = {
      tutorial: "gray",
      1: "pink",
      2: "purple",
      3: "cyan",
      4: "blue",
      5: "teal",
      6: "green",
    };

    // Default to a medium shade if group doesn't match any key
    console.log("colorMap", colorMap[group]);
    return colorMap[group] || "purple.500";
  };
  const lightenColor = (color, percent) => {
    // Remove the '#' character if it's there
    const hex = color.replace(/^#/, "");

    // Convert hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calculate the new color, increasing brightness
    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));

    // Convert back to hex and return
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const getBackgroundScheme = (group) => {
    const colorMap = {
      tutorial: "#808080", // Gray
      1: "#ff69b4", // Pink
      2: "#800080", // Purple
      3: "#00ffff", // Cyan
      4: "#0000ff", // Blue
      5: "#008080", // Teal
      6: "#008000", // Green
    };

    const color = colorMap[group] || "#800080"; // Fallback to purple
    return lightenColor(color, 0.9); // Lighten by 50%
  };

  return (
    <VStack spacing={4} width="100%" mt={24}>
      <VStack textAlign={"left"} style={{ width: "100%", maxWidth: 400 }}>
        <b style={{ fontSize: "60%" }}>
          {translation[userLanguage]["app.progress"]} :{" "}
          {calculateProgress().toFixed(2)}% |{" "}
          {translation[userLanguage]["chapter"]}: {step.group}&nbsp;|&nbsp;
          {translation[userLanguage]["app.streak"]}: {streak}
        </b>
        <Progress
          value={calculateProgress()}
          size="md"
          colorScheme={getColorScheme(step.group)}
          width="100%"
          mb={4}
          borderRadius="4px"
          background={getBackgroundScheme(step.group)}
        />
      </VStack>
      <Text fontSize="xl">
        <b>
          {currentStep}. {step.title}
        </b>
      </Text>
      {step.question && (
        <Text
          mt={"-2"}
          style={{
            width: "100%",
            maxWidth: 400,
            width: "fit-content",
            color: "gray",
          }}
          fontSize="sm"
          mb={3}
          // textAlign={"left"}
        >
          <span style={{ textDecoration: "none" }}>{step.description}</span>
        </Text>
      )}

      {step.question && (
        <Text
          style={{ width: "100%", maxWidth: 400, width: "fit-content" }}
          fontSize="medium"
          textAlign={"left"}
        >
          {step.question.questionText}
        </Text>
      )}

      {step.isSingleLineText && (
        <VoiceInput
          value={inputValue}
          onChange={setInputValue}
          isCodeEditor={false}
          isTextInput={false}
          isSingleLineText={true}
          resetVoiceState={resetVoiceState}
          useVoice={true}
          stopListening={stopListening}
          setFeedback={setFeedback}
          resetFeedbackMessages={resetMessages}
          step={step}
          userLanguage={userLanguage}
        />
      )}
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
      {step.isCodeCompletion && (
        <CodeCompletionQuestion
          step={step}
          question={step.question}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onLearnClick={handleLearnClick}
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
          currentStep={currentStep}
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
      {step.isMultipleChoice && (
        <MultipleChoiceQuestion
          question={step.question}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          userLanguage={userLanguage}
          onLearnClick={handleLearnClick}
        />
      )}
      {step.isMultipleAnswerChoice && (
        <MultipleAnswerQuestion
          question={step.question}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onLearnClick={handleLearnClick}
          userLanguage={userLanguage}
        />
      )}
      {step.isSelectOrder && (
        <SelectOrderQuestion
          items={items}
          setItems={setItems}
          onLearnClick={handleLearnClick}
          userLanguage={userLanguage}
          step={step}
        />
      )}
      {step.isConversationReview && (
        <ConversationReview
          question={step.question}
          userLanguage={userLanguage}
          steps={steps}
          step={step}
          onSubmit={handleAnswerClick} // Or any other relevant logic
          setFinalConversation={setFinalConversation}
          finalConversation={finalConversation}
        />
      )}
      {isPostingWithNostr ? (
        <SunsetCanvas />
      ) : (
        <>
          {messages.length > 0 && !feedback && (
            <Box mt={0} p={4} borderRadius="lg" width="100%" maxWidth={"600px"}>
              <Text textAlign={"left"}>
                {messages[messages.length - 1]?.content}
              </Text>
            </Box>
          )}
          {feedback && (
            <FadeInComponent>
              <Box
                mt={0}
                p={4}
                borderRadius="3xl"
                width="100%"
                maxWidth="600px"
                background={isCorrect ? "#dcecfc" : "#fcdcdc"}
                transition="0.2s all ease-in-out"
                borderBottomRightRadius={"0px"}
              >
                <Text
                  textAlign={"left"}
                  color={isCorrect ? "blue.500" : "red.500"}
                >
                  {feedback}{" "}
                  {grade ? (
                    <DataTags
                      userLanguage={userLanguage}
                      grade={translation[userLanguage]["tags.grade"] + grade}
                    />
                  ) : null}
                </Text>{" "}
              </Box>
            </FadeInComponent>
          )}{" "}
          {feedback && (
            <div
              style={{
                width: "100%",
                maxWidth: "600px",
                display: "flex",
                justifyContent: "flex-end",
                padding: 0,
                marginTop: "-36px",
              }}
            >
              <RiseUpAnimation speed="0.1s">
                <RandomCharacter />
              </RiseUpAnimation>
            </div>
          )}
          <HStack spacing={4}>
            {step.question && !isSending ? (
              <Button
                fontSize="sm"
                onMouseDown={handleAnswerClick}
                isLoading={isSending}
                mb={4}
                boxShadow={"0px 0.5px 0.5px 1px black"}
              >
                {translation[userLanguage]["app.button.answer"]}
              </Button>
            ) : (
              <SunsetCanvas speed={"0.25"} />
            )}

            {isCorrect && (
              <>
                <Button
                  background="white"
                  variant={"outline"}
                  onMouseDown={handleNextClick}
                  mb={4}
                  boxShadow={"0px 0.5px 0.5px 1px black"}
                >
                  {translation[userLanguage]["app.button.nextQuestion"]}{" "}
                </Button>
              </>
            )}
          </HStack>
        </>
      )}

      <EducationalModal
        isOpen={isOpen}
        onClose={onClose}
        educationalMessages={educationalMessages}
        educationalContent={educationalContent}
        userLanguage={userLanguage}
      />

      <>
        <AwardModal
          isOpen={isAwardModalOpen}
          onClose={onAwardModalClose}
          // educationalMessages={educationalMessages}
          // educationalContent={educationalContent}
          userLanguage={userLanguage}
          step={step}
          isCorrect={isCorrect}
        />
      </>
    </VStack>
  );
};

const Home = ({
  isSignedIn,
  setIsSignedIn,
  userLanguage,
  setUserLanguage,
  generateNostrKeys,
  auth,
  view,
  setView,
}) => {
  // const [view, setView] = useState("buttons");
  const [loadingMessage, setLoadingMessage] = useState(
    "createAccount.isCreating"
  );
  const [userName, setUserName] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [keys, setKeys] = useState(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  // localStorage.getItem("local_npub"),
  // localStorage.getItem("local_nsec")

  const navigate = useNavigate();
  const toast = useToast();
  // const { width, height } = useWindow();
  // const { authWithSigner } = useSharedNostr();

  const handleCreateAccount = async () => {
    setIsCreatingAccount(true);
    const newKeys = await generateNostrKeys(
      userName,
      setLoadingMessage,
      translation[userLanguage]["nostrContent.onboardedProfileAbout"],
      translation[userLanguage]["nostrContent.introductionPost"]
    );
    setKeys(newKeys);

    localStorage.setItem("displayName", userName);

    const defaultInterval = 2880;
    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + defaultInterval * 60000);

    // Create user in Firestore with language preference
    await createUser(newKeys.npub, userName, userLanguage);
    await updateUserData(
      newKeys.npub,
      defaultInterval, // Set the default interval for the streak
      0, // Initial streak count is 0
      currentTime, // Start time
      endTime // End time, 48 hours from start time
    );
    setIsSignedIn(true);
    setView("created");
    setIsCreatingAccount(false);
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    await auth(secretKey);
    const npub = localStorage.getItem("local_npub");
    const userName = localStorage.getItem("displayName");

    // Check if user exists in Firestore and create if necessary
    const userDoc = doc(database, "users", npub);
    const userSnapshot = await getDoc(userDoc);
    if (!userSnapshot.exists()) {
      await createUser(npub, userName, userLanguage);
    }

    const currentStep = await getUserStep(npub); // Retrieve the current step
    setIsSigningIn(false);
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
    const keysToCopy = `${localStorage.getItem("local_nsec")}`;
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
    const npub = localStorage.getItem("local_npub");
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
      p={0}
      style={{
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {view === "buttons" && (
        <>
          <VStack spacing={4}>
            <VStack spacing={4} width="95%" maxWidth="600px" mb={4}>
              <HStack spacing={2} alignItems="center">
                <SunsetCanvas />{" "}
                {isCreatingAccount ? (
                  <Text
                    fontSize={"smaller"}
                    backgroundColor="white"
                    color="black"
                    fontWeight={"bold"}
                    borderRadius="8px"
                    padding="10px"
                    width="250px"
                    height="110px"
                    display="flex"
                    alignItems={"center"}
                    textAlign={"left"}
                    justifyContent={"center"}
                  >
                    {translation[userLanguage][loadingMessage]}
                  </Text>
                ) : null}
              </HStack>

              <Text fontSize="3xl">
                {translation[userLanguage]["landing.welcome"]}
              </Text>
              <Text fontSize="medium">
                {translation[userLanguage]["landing.introduction"]}
              </Text>
            </VStack>

            {/* 
              <div>{isCreatingAccount ? <SunsetCanvas /> : null}</div> */}
            <Text fontSize="sm" maxWidth={"600px"}>
              {" "}
              <b>{translation[userLanguage]["createAccount.instructions"]} </b>
            </Text>
            <Input
              style={{ maxWidth: 300 }}
              placeholder={
                translation[userLanguage]["createAccount.input.placeholder"]
              }
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <VStack>
              <Button
                onMouseDown={handleCreateAccount}
                colorScheme="cyan"
                variant={"outline"}
                isDisabled={userName.length < 1}
                style={{ width: "150px" }}
              >
                {translation[userLanguage]["landing.button.createAccount"]}
              </Button>
              {/* <div>{translation[userLanguage]["or"]}</div> */}
              <Button
                colorScheme="purple"
                variant={"outline"}
                onMouseDown={() => setView("signIn")}
                style={{ width: "150px" }}
              >
                {translation[userLanguage]["landing.button.signIn"]}{" "}
              </Button>

              <br />
              <br />
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

              <Button
                variant="ghost"
                onMouseDown={() => navigate("/about")}
                textDecoration={"underline"}
              >
                {translation[userLanguage]["button.about"]}
              </Button>
            </VStack>
          </VStack>
        </>
      )}

      {view === "signIn" && (
        <VStack spacing={4}>
          <div>{isSigningIn ? <SunsetCanvas /> : null}</div>

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

            {/* <Button onMouseDown={authWithSigner} colorScheme="purple">
                signin with extension
              </Button> */}
          </HStack>
        </VStack>
      )}
      {view === "created" && keys && (
        <VStack spacing={4}>
          <Confetti
            // gravity={0.75}
            numberOfPieces={100}
            recycle={false}
            colors={["#FFCCCC", "#CCEFFF", "#D9A8FF", "#FF99CC", "#FFD1B3"]} // Array of colors matching the logo
          />
          <PanRightComponent>
            <Text
              p={4}
              maxWidth="600px"
              textAlign={"left"}
              style={{ backgroundColor: "#dcecfc" }}
              borderRadius="24px"
              borderBottomRightRadius={"0px"}
            >
              <Text>
                {translation[userLanguage]["createAccount.successMessage"]}
              </Text>{" "}
              <Text fontSize="sm" maxWidth={"300px"}>
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
          </PanRightComponent>
          <div
            style={{
              width: "100%",
              maxWidth: "300px",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "-36px",
              marginRight: "-16px",
            }}
          >
            {" "}
            <RiseUpAnimation>
              <RandomCharacter />
            </RiseUpAnimation>
          </div>

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
            <Button variant="outline" onMouseDown={() => setView("buttons")}>
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
  const [view, setView] = useState("buttons");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // State to store current step
  const [userLanguage, setUserLanguage] = useState("en"); // State to store user language preference
  const navigate = useNavigate();
  const location = useLocation();

  const {
    generateNostrKeys,
    auth,
    postNostrContent,
    assignExistingBadgeToNpub,
  } = useSharedNostr(
    localStorage.getItem("local_npub"),
    localStorage.getItem("local_nsec")
  );

  const handleToggle = async () => {
    const newLanguage = userLanguage === "en" ? "es" : "en";
    setUserLanguage(newLanguage);

    // Update local storage
    localStorage.setItem("userLanguage", newLanguage);

    // Update Firestore
    const npub = localStorage.getItem("local_npub");
    if (npub) {
      const userDoc = doc(database, "users", npub);
      await updateDoc(userDoc, {
        language: newLanguage,
      });
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      const npub = localStorage.getItem("local_npub");
      if (npub && window.location.pathname !== "/dashboard") {
        auth(localStorage.getItem("local_nsec"));
        setIsSignedIn(true);
        const step = await getUserStep(npub); // Fetch the current step
        setCurrentStep(step);

        // Fetch user language preference
        const userDoc = doc(database, "users", npub);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          console.log("userData.userLanguage", userData.language);
          setUserLanguage(userData.userLanguage || "en"); // Set user language preference
          localStorage.setItem("userLanguage", userData.language);
        }

        if (location.pathname === "/about") {
        } else if (step === "award") {
          navigate("/award");
        } else {
          navigate(`/q/${step}`);
        }
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
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
        textAlign="center"
        fontSize="xl"
        p={4}
      >
        <SunsetCanvas />
      </Box>
    );
  }

  // let list = steps["en"];
  // let finalOutcome = [];
  // for (let i = 0; i < list.length; i++) {
  //   if (list[i].isConversationReview) {
  //     finalOutcome.push({
  //       index: i,
  //       obj: list[i],
  //     });
  //   }
  // }

  return (
    <Box textAlign="center" fontSize="xl" p={4}>
      {isSignedIn && (
        <SettingsMenu
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          steps={steps}
          userLanguage={userLanguage}
          setUserLanguage={setUserLanguage}
          currentStep={currentStep} // Pass current step to SettingsMenu
          view={view}
          setView={setView}
          step={steps[userLanguage][currentStep]}
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
              generateNostrKeys={generateNostrKeys}
              auth={auth}
              view={view}
              setView={setView}
            />
          }
        />
        {location.pathname !== "/about" &&
          steps?.[userLanguage]?.map((_, index) => (
            <Route
              key={index}
              path={`/q/${index}`}
              element={
                <PrivateRoute>
                  <Step
                    currentStep={index}
                    userLanguage={userLanguage}
                    setUserLanguage={setUserLanguage}
                    postNostrContent={postNostrContent}
                    assignExistingBadgeToNpub={assignExistingBadgeToNpub}
                  />
                </PrivateRoute>
              }
            />
          ))}
        <Route
          path="/award"
          element={<AwardScreen userLanguage={userLanguage} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/about"
          element={
            <About userLanguage={userLanguage} handleToggle={handleToggle} />
          }
        />
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
