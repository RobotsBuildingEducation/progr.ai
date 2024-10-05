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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
import { SunsetCanvas, BigSunset } from "./elements/SunsetCanvas";
import EducationalModal from "./components/LearnModal/EducationalModal";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu";
import { useSharedNostr } from "./hooks/useNOSTR";
import {
  createUser,
  getUserData,
  getUserStep,
  incrementToFinalAward,
  incrementToSubscription,
  incrementUserStep,
  updateUserData,
} from "./utility/nosql";
import {
  getObjectsByGroup,
  steps,
  tutorial_interface,
} from "./utility/content";
import { PrivateRoute } from "./PrivateRoute";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { database, analytics } from "./database/firebaseResources";
import { logEvent } from "firebase/analytics";
import { translation } from "./utility/translation";
import { useCashuWallet } from "./hooks/useCashuWallet";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { isUnsupportedBrowser } from "./utility/browser";
import { EmailIcon, PlusSquareIcon, RepeatIcon } from "@chakra-ui/icons";
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
import isEmpty from "lodash/isEmpty";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useAlertStore } from "./useAlertStore";
import CountdownTimer from "./elements/CountdownTimer";

import { PasscodeModal } from "./components/PasscodeModal/PasscodeModal";
import { usePasscodeModalStore } from "./usePasscodeModalStore";

// logEvent(analytics, "page_view", {
//   page_location: "https://program-ai.app/",
// });

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
  handleModalCheck,
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
  const { alert, hideAlert, showAlert } = useAlertStore();

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
      if (step.isConversationReview) {
        const relevantSteps = getObjectsByGroup(
          step?.group,
          steps[userLanguage]
        );
        console.log("relevant steps", relevantSteps);
        await submitPrompt([
          {
            content:
              aiTranscript +
              `The JSON format should be minified as { "input": "${aiTranscript}", "output": "your_answer" }. Do not include any line breaks and make certain the JSON is valid and parsable. The user is working on a review of the subjects studied: ${JSON.stringify(relevantSteps)}. The output should strictly answer what is requested in javascript and should include newline characters and white space for formatting because it will be parsed and rendered for display. Absolutely no other text or data should be included or communicated. Lastly the user is speaking in ${
                userLanguage === "en" ? "english" : "spanish"
              }`,
            role: "user",
          },
        ]);
      } else {
        await submitPrompt([
          {
            content:
              aiTranscript +
              ` The JSON format should be minified as { "input": "${aiTranscript}", "output": "your_answer" }. Do not include any line breaks and make certain the JSON is valid and parsable. The output should strictly answer what is requested in javascript and should include newline characters and white space for formatting because it will be parsed and rendered for display. Absolutely no other text or data should be included or communicated. Lastly the user is speaking in ${
                userLanguage === "en" ? "english" : "spanish"
              }`,
            role: "user",
          },
        ]);
      }
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

      const isLastMessage =
        lastMessage.meta.chunks[lastMessage.meta.chunks.length - 1]?.final;

      if (isLastMessage) {
        console.log("LAST MESSAGE", lastMessage);
        let jsonResponse = {};
        try {
          jsonResponse = JSON.parse(lastMessage.content);
          console.log("JSON", jsonResponse);
        } catch (error) {
          jsonResponse = lastMessage.content;
        }
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
          )} with code examples and explanations. Make it enriching and create a useful flow where the ideas build off of each other to encourage challenge and learning. The JSON format should be { output: [{ code: "code_example", explanation: "explanation" }] }. Additionally the code should consider line breaks, whitespace and formatting in the JSON because it will be formatted and rendered after completion. Lastly the user is speaking in ${
            userLanguage === "en" ? "english" : "spanish"
          }`,
          role: "user",
        },
      ]);
    } else {
      const relevantSteps = getObjectsByGroup(step?.group, steps[userLanguage]);

      await submitEducationalPrompt([
        {
          content: `Generate educational material about ${JSON.stringify(
            relevantSteps
          )} with code examples and explanations. Make it enriching and create a useful flow where the ideas build off of each other to encourage challenge and learning. The JSON format should be { "input": "${JSON.stringify(
            step
          )}", output: [{ "code": "code_example", "explanation": "explanation" }] }. Additionally the code should consider line breaks and formatting because it will be formatted after completion. Lastly the user is speaking in ${
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
      try {
        const lastMessage = educationalMessages[educationalMessages.length - 1];
        const isLastMessage =
          lastMessage.meta.chunks[lastMessage.meta.chunks.length - 1]?.final;

        if (isLastMessage) {
          const jsonResponse = JSON.parse(lastMessage.content);
          if (Array.isArray(jsonResponse.output)) {
            setEducationalContent(jsonResponse.output);
          } else {
            setEducationalContent([]);
          }
        } else {
          setEducationalContent([]);
        }
      } catch (error) {
        resetEducationalMessages();
        onClose();

        showAlert("warning", translation[userLanguage]["ai.error"]);
        const delay = (ms) =>
          new Promise((resolve) => setTimeout(resolve, 4000));
        delay().then(() => {
          hideAlert();
        });
      }
    }
  }, [educationalMessages]);

  const textareaRef = useRef(null);

  return (
    <VStack spacing={4} alignItems="center" width="100%" maxWidth={"600px"}>
      {useVoice || isTerminal ? (
        <HStack spacing={4} justifyContent={"center"} maxWidth={"400px"}>
          {/* <Button
            onMouseDown={handleVoiceStart}
            colorScheme="purple"
            variant={"outline"}
            // isDisabled={isUnsupportedBrowser()}
          >
            {translation[userLanguage]["app.button.voiceToText"]}
          </Button> */}
          <Button
            onMouseDown={handleAiStart}
            colorScheme="purple"
            variant={"outline"}
            // isDisabled={isUnsupportedBrowser()}
          >
            {" "}
            {translation[userLanguage]["app.button.voiceToAI"]}
          </Button>
          <Button
            colorScheme="purple"
            onMouseDown={() => handleModalCheck(handleLearnClick)}
          >
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
            theme="light"
            value={
              // generateResponse ? translation[userLanguage]["thinking"] :
              value
            }
            onChange={(value) => onChange(value, resetMessages)}
            options={{
              fontFamily: "initial",
              fontSize: "16px",
              wordWrap: "on", // Enables word wrap
              // wordWrapColumn: 80, // Adjust the column for wrapping
              // wordWrapMinified: true, // Word wrap also for minified code
              // scrollBeyondLastLine: false,
              automaticLayout: true,
              // minimap: {
              //   enabled: false,
              // },
            }}
          />
        </Box>
      ) : isSingleLineText ? (
        <Input
          type="text"
          value={
            // generateResponse ? translation[userLanguage]["thinking"] :
            value
          }
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
          value={
            // generateResponse
            //   ? translation[userLanguage]["thinking"]
            //   :
            aiListening ? aiTranscript : value
          }
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
  handleModalCheck,
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
        handleModalCheck={handleModalCheck}
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
  emailStep,
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
  const { cashTap, loadWallet } = useCashuStore();
  const [grade, setGrade] = useState("");
  const [isTimerExpired, setIsTimerExpired] = useState(true);

  const [step, setStep] = useState(steps[userLanguage][currentStep]);

  const { resetMessages, messages, submitPrompt } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  const navigate = useNavigate();
  const { alert, hideAlert, showAlert } = useAlertStore();

  // const stepContent = steps[userLanguage][currentStep];

  // console.log("STEP xxx", step);

  const [isPostingWithNostr, setIsPostingWithNostr] = useState(false);

  const [finalConversation, setFinalConversation] = useState([]);

  const { openPasscodeModal } = usePasscodeModalStore();

  const {
    isOpen: isAwardModalOpen,
    onOpen: onAwardModalOpen,
    onClose: onAwardModalClose,
  } = useDisclosure();
  const {
    resetMessages: resetNewQuestionMessages,
    messages: newQuestionMessages,
    submitPrompt: submitNewQuestionMessages,
  } = useChatCompletion({
    response_format: { type: "json_object" },
  });

  useEffect(() => {
    setStep(steps[userLanguage][currentStep]);
  }, [userLanguage]);

  // Fetch user data and manage streaks and timers
  useEffect(() => {
    // alert("running..");
    // const stepContent = steps[userLanguage][currentStep];
    // setStep(stepContent);
    const fetchUserData = async () => {
      loadWallet();
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

    const expiryTime = localStorage.getItem("incorrectExpiry");
    if (expiryTime) {
      setIsTimerExpired(false);
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expiryTime)) {
        // Expiry has passed, reset attempts
        localStorage.removeItem("incorrectExpiry");
        localStorage.setItem("incorrectAttempts", 0);
      }
    }
    // onAwardModalOpen();
  }, []);

  // Initialize items for Select Order question
  useEffect(() => {
    // console.log("runrunrunrunrunrun");
    if (step.isSelectOrder) {
      setItems(step.question.options.sort(() => Math.random() - 0.5));
    }
    // console.log("newQuestionMessages", newQuestionMessages);
    // console.log("generatedQuestion", generatedQuestion);

    if (isEmpty(generatedQuestion) && isEmpty(newQuestionMessages)) {
      // alert("it doesnt exist");
      // console.log("running loop?");
      const stepContent = steps[userLanguage][currentStep];
      setStep(stepContent);
    }
  }, [step, currentStep]);

  useEffect(() => {
    if (isCorrect) {
      localStorage.setItem("incorrectAttempts", 0);
      cashTap();

      postNostrContent(
        `${translation[userLanguage]["nostrContent.answeredQuestion.1"]} ${currentStep} ${translation[userLanguage]["nostrContent.answeredQuestion.2"]} ${grade}% ${translation[userLanguage]["nostrContent.answeredQuestion.3"]} https://program-ai.app \n\n${step.question?.questionText} #LearnWithNostr https://m.primal.net/KBLq.png`
      );
      if (step.isConversationReview) {
        assignExistingBadgeToNpub(transcript[step.group]["address"]);

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

  const feedbackRef = useRef(null);

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
      // console.log("review");
      const relevantSteps = getObjectsByGroup(step?.group, steps[userLanguage]);

      await submitPrompt(
        [
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
        ],
        false,
        true
      );
    } else if (step.isSelectOrder) {
      await submitPrompt(
        [
          {
            content: `The user is answering the following question "${
              step.question.questionText
            }". The answer to the question is an array [${step.question.answer}]
          and the user provided the following answer array [${answer}]. Is this answer correct?Determine by comparing the two arrays rather than observing your opinion over the correctness of an answer. Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string  }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction.  Your feedback will include a grade ranging from 0-100 based on the quality of the answer -  however if the answer is correct just reward a 100. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
            role: "user",
          },
        ],
        false,
        true
      );
    } else if (step.isMultipleChoice || step.isCodeCompletion) {
      // console.log("ANSWER", answer);
      // console.log("    step.question.answer", step.question.answer);
      await submitPrompt([
        {
          content: `The user is answering the following question "${
            step.question.questionText
          }". The question's answer is defined as "${
            step.question.answer
          }" and the user submitted the following answer "${answer}". Is this answer correct? Determine by strictly comparing the question's answer and the submitted user answer, they must match. Only the question's answer is acceptable. Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  -  however if the answer is correct just reward a 100. The user is speaking ${
            userLanguage === "es" ? "spanish" : "english"
          }.`,
          role: "user",
        },
      ]);
    } else if (step.isSingleLineText) {
      await submitPrompt(
        [
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
        ],
        false,
        true
      );
    } else if (step.isMultipleAnswerChoice) {
      await submitPrompt(
        [
          {
            content: `The user is answering the following question "${
              step.question.questionText
            }". The answer to the question is defined as ${JSON.stringify(
              step.question.answer
            )} and the user submitted the following answer array ${JSON.stringify(
              answer
            )}. Is this answer correct? Determine by strictly comparing the defined answer and the submitted answer, they must be equivalent in array size and values under every circumstance. Do not allow for any leeway. Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  -  however if isCorrect is true just reward a 100. The user is speaking ${
              userLanguage === "es" ? "spanish" : "english"
            }.`,
            role: "user",
          },
        ],
        false,
        true
      );
    } else if (step.isText) {
      await submitPrompt(
        [
          {
            content: `The user is answering the following question "${
              step.question.questionText
            }" with the following answer "${answer}". Is this answer correct? Return the response using a json interface like { isCorrect: boolean, feedback: string, grade: string, comprehensive: boolean }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction. Do not be super opinionated - if the user essentially got the answer right then just accept it. If it appears the user provided or attempted depth of understanding, provide a score of 100. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  - however award a grade of 100 if comprehensive boolean is true. If the answer is correct but lazy, award a grade of less than an 80 but higher than a 50 . The user is speaking ${
              userLanguage === "es" ? "spanish" : "english"
            }.`,
            role: "user",
          },
        ],
        false,
        true
      );
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
      await submitPrompt(
        [
          {
            content: `The user is answering the following question "${
              step.question.questionText
            }" with the following answer "${answer}". Is this answer correct? Return the response using a json interface like { isCorrect: boolean,  feedback: string, grade: string, comprehensive: boolean }. Do not include the answer or solution in your feedback but suggest or direct the user in the right direction, also dont be super opinionated - if the user essentially got the answer right then just accept it. Your feedback will include a grade ranging from 0-100 based on the quality of the answer  - however if the answer is correct, provide a grade of 100. The user is speaking ${
              userLanguage === "es" ? "spanish" : "english"
            }.`,
            role: "user",
          },
        ],
        false,
        true
      );
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

  const resetAttempts = () => {
    localStorage.removeItem("incorrectAttempts");
    localStorage.removeItem("incorrectExpiry");
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
      // console.log("messages", messages);
      // console.log("messages", messages);
      try {
        const lastMessage = messages[messages.length - 1];

        const isLastMessage =
          lastMessage.meta.chunks[lastMessage.meta.chunks.length - 1]?.final;
        // console.log("last message", lastMessage);
        // if (!lastMessage.meta.loading) {
        if (isLastMessage) {
          // console.log("LAST MESSAGE", lastMessage);
          const jsonResponse =
            JSON?.parse(lastMessage?.content) || lastMessage.conent;
          // const jsonResponse = newQuestionMessages;
          // console.log("JSONxyz", jsonResponse);
          setIsCorrect(jsonResponse.isCorrect);
          setFeedback(jsonResponse.feedback);

          if (jsonResponse.isCorrect) {
            setGrade(jsonResponse.grade);
          } else {
            localStorage.setItem(
              "incorrectAttempts",
              parseInt(localStorage.getItem("incorrectAttempts")) + 1 || 1
            );

            if (localStorage.getItem("incorrectAttempts") >= 5) {
              // Set expiration time 15 minutes ahead
              setIsTimerExpired(false);
              const expiryTime = new Date().getTime() + 15 * 60 * 1000;
              localStorage.setItem("incorrectExpiry", expiryTime);
            }
          }
        }
      } catch (error) {
        // console.log("JSON");
        // console.log("error", error);
        // console.log("error", { error });
        showAlert("warning", translation[userLanguage]["ai.error"]);
        const delay = (ms) =>
          new Promise((resolve) => setTimeout(resolve, 4000));
        delay().then(() => {
          hideAlert();
        });
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
    // console.log("currentStep...", currentStep);
    // console.log("fSTEPS", steps);
    setGeneratedQuestion([]);
    resetNewQuestionMessages();
    if (currentStep === 9) {
      const npub = localStorage.getItem("local_npub");

      if (
        localStorage.getItem("passcode") !==
        import.meta.env.VITE_PATREON_PASSCODE
      ) {
        await incrementToSubscription(npub, currentStep);
        navigate("/subscription");
      } else {
        setIsPostingWithNostr(true);

        try {
          await incrementUserStep(npub);
          await storeCorrectAnswer(step, feedback);

          setIsPostingWithNostr(false);
          navigate(`/q/${currentStep + 1}`);
        } catch (error) {
          setIsPostingWithNostr(false);
        }
      }
    } else if (currentStep >= steps[userLanguage].length - 1) {
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
        )} with code examples and explanations. Make it enriching and create a useful flow where the ideas build off of each other to encourage challenge and learning. The JSON format should be { "input": "${JSON.stringify(
          step
        )}", output: [{ "code": "code_example", "explanation": "explanation" }] }. Additionally the code should consider line breaks and formatting because it will be formatted after completion. Lastly the user is speaking in ${
          userLanguage === "en" ? "english" : "spanish"
        }`,
        role: "user",
      },
    ]);
  };

  useEffect(() => {
    if (educationalMessages?.length > 0) {
      try {
        const lastMessage = educationalMessages[educationalMessages.length - 1];
        const isLastMessage =
          lastMessage.meta.chunks[lastMessage.meta.chunks.length - 1]?.final;

        if (!lastMessage.meta.loading) {
          // if (isLastMessage) {
          const jsonResponse = JSON.parse(lastMessage.content);
          if (Array.isArray(jsonResponse.output)) {
            setEducationalContent(jsonResponse.output);
          } else {
            setEducationalContent([]);
          }
        } else {
          setEducationalContent([]);
        }
      } catch (error) {
        resetEducationalMessages();
        onClose();

        showAlert("warning", translation[userLanguage]["ai.error"]);
        const delay = (ms) =>
          new Promise((resolve) => setTimeout(resolve, 4000));
        delay().then(() => {
          hideAlert();
        });
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
    // console.log("colorMap", colorMap[group]);
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

  let emailText = emailStep;
  if (emailText) {
    if (emailText?.question?.answer) {
      delete emailText.question.answer;
    }
  }
  // console.log("emailtext", emailText);

  const [generatedQuestion, setGeneratedQuestion] = useState(null); // For holding the new generated question

  useEffect(() => {
    try {
      if (newQuestionMessages?.length > 0) {
        const lastMessage = newQuestionMessages[newQuestionMessages.length - 1];
        // const isLastMessage =
        //   lastMessage.meta.chunks[lastMessage.meta.chunks.length - 1]?.final;

        if (!lastMessage.meta.loading) {
          // console.log("THE FINAL", lastMessage);
          const jsonResponse = JSON.parse(lastMessage.content);

          // console.log("NEW QUESTION FINAL JSON", jsonResponse);
          setGeneratedQuestion(jsonResponse);
          setStep(jsonResponse);
          resetNewQuestionMessages();
        }
      }
    } catch (error) {
      console.log("error", error);
      console.log("error", { error });
      resetNewQuestionMessages();

      showAlert("warning", translation[userLanguage]["ai.error"]);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, 4000));
      delay().then(() => {
        hideAlert();
      });
    }
  }, [newQuestionMessages]);

  const handleGenerateNewQuestion = async () => {
    setGeneratedQuestion([]);
    resetNewQuestionMessages();
    const fetchUserAnswers = async () => {
      const userId = localStorage.getItem("local_npub");
      const answersRef = collection(database, `users/${userId}/answers`);
      const answerDocs = await getDocs(answersRef);
      const answers = answerDocs.docs.map((doc) => doc.data());
      return JSON.stringify({ answers: answers });
    };

    const getUserAnsweredSubjects = () => {
      let list = steps[userLanguage];
      let subjects = [];
      for (let i = 1; i < list.length; i++) {
        if (i <= currentStep - 1) {
          subjects.push(list[i].title);
        }
      }

      return JSON.stringify({ solved: subjects });
    };
    try {
      // Construct the prompt for generating a new question
      // Thirdly, the user has answered the following questions and saved them: ${fetchUserAnswers()}

      //
      const prompt = `
        First, The user was working on the following step:
        ${JSON.stringify(step)}.

        Secondly, the user has answered the following subjects: ${getUserAnsweredSubjects()}
        )},


        The request: Create/invent a completely new and custom adaptive question and feel free to explore creativity using the same interface with group, title, description, <question_type> and the custom question object interface. Here are the types of question_types (e.g isMultipleChoice, isCodeCompletion) and their respective question objects that we've used in the tutorial group, so that you can understand how questions are designed to encourage variance in learning: ${JSON.stringify(getObjectsByGroup("tutorial", steps[userLanguage]))}. It is extremely important to understand that the data types used in the "answer" field are specific and must not change under any circumstance, or else the request will fail due to unexpected data type.
        
        Remember to design and inspire a new question, you must select a different but valid question_type than the one you've received, strictly based on the interfaces ive provided with the tutorials. Do not deviate and create a new question type or else the UI will fail with your response. 
        
        Remember, the types are things like isText, isTerminal, isMultipleChoice, isCodeCompletion, etc. But it must strictly be a different UI type than the step that the user started you off with. For example, if the user is sending you an isText: true question, you can't respond with an isText: true output.
        
        Return the question in the proper JSON format as guided.}
      `;

      // console.log("PROMPT", prompt);
      // Submit the prompt to the chat completion API
      await submitNewQuestionMessages([
        {
          content: prompt,
          role: "user",
        },
      ]);

      // // Process the API response once available
      // if (messages?.length > 0) {
      //   const lastMessage = messages[messages.length - 1];
      //   if (!lastMessage.meta.loading) {
      //     const jsonResponse = JSON.parse(lastMessage.content);
      //     setGeneratedQuestion(jsonResponse); // Save the generated question
      //   }
      // }
    } catch (error) {
      console.error("Error generating new question:", error);
    }
  };

  const handleTimerExpire = () => {
    console.log("Timer expired!");
    localStorage.removeItem("incorrectAttempts");
    localStorage.removeItem("incorrectExpiry");
    setIsTimerExpired(true); // Update state or perform any action
  };

  const handleModalCheck = (functionCall) => {
    const storedPasscode = localStorage.getItem("features_passcode");
    if (storedPasscode !== import.meta.env.VITE_PATREON_FEATURES_PASSCODE) {
      openPasscodeModal();
    } else {
      functionCall();
    }
  };
  const emojiMap = ["😖", "😩", "😅", "😱", "🪦"];

  return (
    <VStack spacing={4} width="100%" mt={6}>
      {newQuestionMessages.length > 0 && isEmpty(generatedQuestion) ? (
        <VStack textAlign={"left"} style={{ width: "100%", maxWidth: 400 }}>
          <SunsetCanvas />
          <div
            style={{
              backgroundColor: "white",
              fontWeight: "bold",
              borderRadius: 8,
              padding: 8,
              border: "1px solid #ececec",
            }}
          >
            Analyzing your progress & creating new question card{" "}
          </div>
          <Box mt={0} p={4} borderRadius="lg" width="100%" maxWidth={"600px"}>
            <Text textAlign={"left"}>
              {newQuestionMessages[newQuestionMessages.length - 1]?.content}
            </Text>
          </Box>
        </VStack>
      ) : (
        <>
          <VStack textAlign={"left"} style={{ width: "100%", maxWidth: 400 }}>
            <b style={{ fontSize: "50%" }}>
              <IconButton
                width="12px"
                height="18px"
                boxShadow="0px 0px 0.25px 0.5px #ececec"
                // border="1px solid #ececec"
                background="purple.100"
                opacity="0.75"
                color="purple.600"
                icon={<EmailIcon padding="4px" fontSize="18px" />}
                mr={2}
                onMouseDown={() =>
                  (window.location.href = `mailto:sheilfer@robotsbuildingeducation.com?subject=Program AI ${translation[userLanguage]["email.question"]} ${currentStep}: ${step.question.questionText} | ${step.description}&body=${translation[userLanguage]["email.donotdelete"]}       \n\n ${JSON.stringify(emailText)}  `)
                }
              />
              {translation[userLanguage]["app.progress"]} :{" "}
              {calculateProgress().toFixed(2)}% |{" "}
              {translation[userLanguage]["chapter"]}: {step.group}&nbsp;|&nbsp;
              {translation[userLanguage]["app.streak"]}: {streak}
              &nbsp;
            </b>
            <Progress
              opacity="0.8"
              border="1px solid #ececec"
              boxShadow="0px 0px 0.5px 2px #ececec"
              value={calculateProgress()}
              size="md"
              colorScheme={getColorScheme(step.group)}
              width="100%"
              mb={4}
              borderRadius="4px"
              background={getBackgroundScheme(step.group)}
            />
          </VStack>
          <div style={{ zoom: 0.8 }}>
            <Text fontSize="xl">
              <b>
                <IconButton
                  width="12px"
                  height="18px"
                  boxShadow="0px 0px 0.25px 0.5px #ececec"
                  background="purple.100"
                  opacity="0.75"
                  color="purple.600"
                  icon={<RepeatIcon padding="4px" fontSize="18px" />}
                  mr={2}
                  mt="-2"
                  onMouseDown={() =>
                    handleModalCheck(handleGenerateNewQuestion)
                  }
                />{" "}
                {currentStep}. {step.title}
              </b>
            </Text>
            {step.question && (
              <Text
                // mt={"-2"}
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
                <span style={{ textDecoration: "none" }}>
                  {step.description}
                </span>
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
          </div>

          {step.isSingleLineText && (
            <VoiceInput
              handleModalCheck={handleModalCheck}
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
              handleModalCheck={handleModalCheck}
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
              handleModalCheck={handleModalCheck}
            />
          )}
          {step.isCode && !step.isTerminal && (
            <VoiceInput
              handleModalCheck={handleModalCheck}
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
                handleModalCheck={handleModalCheck}
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
              handleModalCheck={handleModalCheck}
            />
          )}
          {step.isMultipleAnswerChoice && (
            <MultipleAnswerQuestion
              question={step.question}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              onLearnClick={handleLearnClick}
              userLanguage={userLanguage}
              handleModalCheck={handleModalCheck}
            />
          )}
          {step.isSelectOrder && (
            <SelectOrderQuestion
              items={items}
              setItems={setItems}
              onLearnClick={handleLearnClick}
              userLanguage={userLanguage}
              step={step}
              handleModalCheck={handleModalCheck}
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
              handleModalCheck={handleModalCheck}
            />
          )}
          {isPostingWithNostr ? (
            <SunsetCanvas />
          ) : (
            <>
              {localStorage.getItem("incorrectAttempts") &&
              parseInt(localStorage.getItem("incorrectAttempts")) > 0 ? (
                <Text
                  fontSize={"smaller"}
                  background={"#ececec"}
                  borderRadius={12}
                  padding={4}
                >
                  {translation[userLanguage]["lockout.attempts"]} &nbsp;
                  {localStorage.getItem("incorrectAttempts")} / 5{" "}
                  {
                    emojiMap[
                      parseInt(localStorage.getItem("incorrectAttempts")) - 1
                    ]
                  }
                </Text>
              ) : null}
              {parseInt(localStorage.getItem("incorrectAttempts")) >= 5 &&
              !isTimerExpired ? (
                <>
                  <div style={{ maxWidth: 600 }}>
                    <Text
                      fontSize="smaller"
                      background={"white"}
                      borderRadius={12}
                      padding={4}
                    >
                      {translation[userLanguage]["lockout.message"]} <br />
                      <br />
                      <CountdownTimer
                        onTimerExpire={handleTimerExpire}
                        userLanguage={userLanguage}
                      />
                    </Text>
                  </div>
                  <RandomCharacter />
                </>
              ) : null}
              {messages.length > 0 && !feedback && (
                <Box
                  mt={0}
                  p={4}
                  borderRadius="lg"
                  width="100%"
                  maxWidth={"600px"}
                >
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
                          grade={
                            translation[userLanguage]["tags.grade"] + grade
                          }
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
                {step.question &&
                !isCorrect &&
                !isSending &&
                !(parseInt(localStorage.getItem("incorrectAttempts")) >= "5") &&
                isTimerExpired ? (
                  <Button
                    fontSize="sm"
                    onMouseDown={handleAnswerClick}
                    isLoading={isSending}
                    mb={4}
                    boxShadow={"0px 0.5px 0.5px 1px black"}
                  >
                    {translation[userLanguage]["app.button.answer"]}
                  </Button>
                ) : null}

                {isSending ? <SunsetCanvas speed={"0.25"} /> : null}
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

            <PasscodeModal userLanguage={userLanguage} />
          </>
        </>
      )}
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
    // console.log("run analytics");
    // logEvent(analytics, "select_content", {
    //   content_type: "button",
    //   item_id: "account_created",
    // });
    // console.log("end analytics");
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
      localStorage.removeItem("local_npub");
      localStorage.removeItem("local_nsec");
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

              <Text fontSize="xl">
                {translation[userLanguage]["landing.welcome"]}
              </Text>
              <Text fontSize="sm">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCreateAccount();
                  }
                }}
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
                    href="https://primal.pub/home"
                    color="teal.500"
                    style={{ textDecoration: "underline" }}
                  >
                    {translation[userLanguage]["createAccount.primalLink"]}
                  </Link>
                ) : (
                  translation[userLanguage]["E"]
                )}
                .
              </Text>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton p={4}>
                    <Box flex="1" textAlign="left">
                      {translation[userLanguage]["advice"]}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Text fontSize="sm" textAlign="left" maxWidth="600px" p={8}>
                      {translation[userLanguage]["advice.content"]}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
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

const PasscodePage = ({ isOldAccount, userLanguage }) => {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(null);
  const navigate = useNavigate();

  const correctPasscode = import.meta.env.VITE_PATREON_PASSCODE;

  const checkPasscode = async () => {
    if (input === correctPasscode) {
      // console.log("we did it");
      localStorage.setItem("passcode", input);

      // Assuming you have the user's unique identifier stored in local storage
      const userId = localStorage.getItem("local_npub"); // Replace with actual user ID if needed
      const userDocRef = doc(database, "users", userId);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        // console.log("User document exists");
        const userData = userSnapshot.data();
        const userStep = isOldAccount ? userData.step : userData.previousStep; // Default to 0 if no previousStep

        // console.log("User step:", userStep);

        // Navigate to the next step

        // Update Firestore document with previousStep + 1
        await updateDoc(userDocRef, {
          step: isOldAccount ? userStep : userStep + 1,
        });

        navigate(`/q/${isOldAccount ? userStep : userStep + 1}`);
        // console.log("Updated user step to:", userStep + 1);
      } else {
        console.log("User document not found");
      }
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("passcode", input);
    if (localStorage.getItem("passcode") === correctPasscode) {
      checkPasscode(); // Auto-check if passcode is already stored
    }
  }, [input]);

  return (
    <Box
      minHeight="90vh"
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <div
        style={{
          marginLeft: "120px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BigSunset />
      </div>{" "}
      <div style={{ marginTop: "-32px" }}>
        <RandomCharacter />
      </div>
      <br />
      <Text maxWidth="600px">
        <div style={{ textAlign: "left" }}>
          {translation[userLanguage]["passcode.instructions"]}

          <br />

          <Text fontSize={"smaller"}>
            {" "}
            {translation[userLanguage]["passcode.label"]}
          </Text>
          <input
            style={{ border: "1px solid #cecece" }}
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </Text>
    </Box>
  );
};

function App({ isShutDown }) {
  const [view, setView] = useState("buttons");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0); // State to store current step
  const [userLanguage, setUserLanguage] = useState("en"); // State to store user language preference
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef();
  const { alert, hideAlert, showAlert } = useAlertStore();

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
        const step = await getUserStep(npub); // Fetch the current step

        if (step == 0) {
          localStorage.clear();
          navigate("/");
        } else {
          auth(localStorage.getItem("local_nsec"));
          setIsSignedIn(true);
          setCurrentStep(step);
          // Fetch user language preference
          const userDoc = doc(database, "users", npub);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            // console.log("userData.userLanguage", userData.language);
            setUserLanguage(userData.userLanguage || "en"); // Set user language preference
            localStorage.setItem("userLanguage", userData.language);
          }

          if (location.pathname === "/about") {
          } else if (
            step === "subscription" ||
            (step > 9 &&
              localStorage.getItem("passcode") !==
                import.meta.env.VITE_PATREON_PASSCODE)
          ) {
            navigate("/subscription");
          } else if (step === "award") {
            navigate("/award");
          } else {
            if (step !== 0) {
              topRef.current?.scrollIntoView();
              navigate(`/q/${step}`);
            }
          }
        }

        if (localStorage.getItem("userLanguage")) {
          setUserLanguage(localStorage.getItem("userLanguage") || "en");
        } else {
          localStorage.setItem("userLanguage", "en");
        }
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
  //     });s
  //   }
  // }

  let clonedStep = JSON.parse(
    JSON.stringify(steps?.["en"]?.[currentStep] || {})
  );

  console.log("userLanguage", userLanguage);

  return (
    <Box textAlign="center" fontSize="xl" p={4} ref={topRef}>
      {alert.isOpen && (
        <Alert
          status={alert.status}
          variant="subtle"
          position="fixed"
          // top="20px"
          width="100%"
          maxWidth="100%"
          zIndex={1000}
          borderRadius={24}
          border={"1px solid #ececec"}
          display="flex"
          justifyContent={"center"}
          top={0}
        >
          <AlertIcon />
          {/* <AlertTitle textAlign={"center"}>{alert.status}</AlertTitle> */}
          <AlertDescription>{alert.message}</AlertDescription>
          <CloseButton
            ml={2}
            border="1px solid black"
            // position="absolute"
            right="8px"
            top="8px"
            onClick={hideAlert}
          />
        </Alert>
      )}
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
          step={steps?.[userLanguage]?.[currentStep]}
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
        <Route
          path="/subscription"
          element={
            <PasscodePage
              userLanguage={userLanguage}
              isOldAccount={
                currentStep > 9 &&
                localStorage.getItem("passcode") !==
                  import.meta.env.VITE_PATREON_PASSCODE
              }
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
                    emailStep={clonedStep}
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
  // console.log(
  //   JSON.parse(
  //     '{\n  "input": "tell me about what we\'ve learned",\n output": "We covered several fundamental concepts in coding, including the basics of coding as writing instructions for computers, the sequence of program execution such as writing code, compiling code, debugging, and executing programs. We\'ve explored how to declare variables in JavaScript, including using the correct keywords and naming conventions. We also learned how to declare arrays, specifically with the correct syntax for an array of items in JavaScript. Additionally, we discussed data types, the use of constants, and the purpose of variables in programming. Finally, we practiced changing directories in a bash terminal."\n}'
  //   )
  // );
  // const isBroken = true;
  const [isShutDown, setIsShutDown] = useState(false);
  const [isBroken, setIsBroken] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("security") === import.meta.env.VITE_SECURITY) {
      setIsBroken(false);
    }
  }, []);

  if (isBroken) {
    return (
      <div
        style={{
          padding: 50,
          maxWidth: "600px",
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        The app is currently down taken down due to malicious behavior. The app
        will not work as intended.
        <br />
        <br />
        If you are the person attacking my small education business, please
        accept the apology for whatever grievance I have created and allow folks
        to continue accessing resources they seek.
        <br />
        <br />
        <Input
          onChange={(event) => {
            localStorage.setItem("security", event.target.value);
            if (
              localStorage.getItem("security") === import.meta.env.VITE_SECURITY
            ) {
              setIsBroken(false);
            }
          }}
        />
        {/* Currently try to contact with OpenAI and my bank in order to handle this
        😔 */}
        {/* <Button onMouseDown={() => setIsShutDown(false)}>Enter anyway</Button> */}
        {/* "Why are AI features disabled?"{" "}
        <b>
          There seems to be something seriously wrong with the account owner's
          billing and I'm being charged thousands of dollars for something that
          shouldn't cost that much.
        </b>
        <br />
        <br /> */}
        <br />
        In the meantime, you can create a decentralized identity and get started
        with the hand-crafted tutoring app 😊! The lecture series and patreon
        content are still very valuable and will save you time, energy and money
        when it comes to learning so I encourage you to go through them during
        this down time!! Thank you for your patience D:
        <br /> <br />
        <a
          href="https://robotsbuildingeducation.com"
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          Rox the tutor
        </a>
        <br />
        <a
          href="https://chatgpt.com/g/g-09h5uQiFC-robots-building-education"
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          Robots Building Education GPT
        </a>
        <div style={{ display: "flex" }}>
          <RandomCharacter />
          <RandomCharacter /> <RandomCharacter /> <RandomCharacter />{" "}
          <RandomCharacter /> <RandomCharacter />
          <RandomCharacter /> <RandomCharacter /> <RandomCharacter />{" "}
          <RandomCharacter /> <RandomCharacter />
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: 6,
          borderRadius: 8,
        }}
      >
        If you see this message, it means you're using an unstable release of
        the app. Check back later for a better user experience.
      </div> */}
      {/* <div>
        <b>Test Version 0.9.1</b>
      </div> */}
      <App isShutDown={isShutDown} />
    </Router>
  );
};
