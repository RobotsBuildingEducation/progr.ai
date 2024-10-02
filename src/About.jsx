import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { translation } from "./utility/translation";
import { useNavigate } from "react-router-dom";

const Content = ({ children }) => {
  return <Text fontSize="sm">{children}</Text>;
};

export const About = ({ userLanguage, handleToggle }) => {
  let navigate = useNavigate();

  return (
    <Box p={4}>
      <Button onMouseDown={() => navigate(-1)} m={6}>
        {translation[userLanguage]["button.back"] || "Go back"}
      </Button>

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
      <br />
      <br />
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton p={4}>
            <Box flex="1" textAlign="left">
              {translation[userLanguage]["about.title"] || "What is this?"}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Content>
              <Text fontSize="sm" textAlign="left" maxWidth="600px" p={8}>
                {translation[userLanguage]["about.about"]}
              </Text>
            </Content>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <br />
      <br />
      <Text fontFamily="Avenir" as="h2">
        <b>{translation[userLanguage]["about.featuresHeader"] || "Features"}</b>
      </Text>
      <br />
      <Accordion allowToggle>
        {[
          "smartCards",
          "programAiApp",
          "rox",
          "roxGPT",
          "Patreon",
          "decentralizedIdentity",
          "decentralizedTranscripts",
          "spanishMode",
          "streaks",
          "quizSeries",
          "vocalCoding",
          "aiLectureNotes",
          "aiFeedback",
          "adaptiveLearning",
          "bitcoinWallet",
          "customerService",
          "lectures",
          "conversationQuiz",
          "schedulingAssistant",
          "shop",
          "algorithmHelper",
          "emotionalIntelligence",
          "syllabus",
          "guides",
          "insights",
          "ofi",
        ].map((feature) => (
          <AccordionItem key={feature}>
            <AccordionButton p={6}>
              <Box flex="1" textAlign="left">
                {translation[userLanguage][`about.title.${feature}`] || feature}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Content>
                <Text fontSize="sm" textAlign="left" maxWidth="600px" p={8}>
                  {translation[userLanguage][`about.platform.${feature}`] ||
                    translation[userLanguage][`about.feature.${feature}`] ||
                    "Content not available"}
                </Text>
              </Content>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
