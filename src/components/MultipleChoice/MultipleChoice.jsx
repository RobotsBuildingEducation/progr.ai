import React from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { translation } from "../../utility/translation";

const MultipleChoiceQuestion = ({
  question,
  selectedOption,
  setSelectedOption,
  onLearnClick, // New prop for learn button
  userLanguage,
}) => {
  return (
    <VStack spacing={4}>
      {/* <Text>{question.questionText}</Text> */}
      <Button onClick={onLearnClick} colorScheme="purple">
        {translation[userLanguage]["app.button.learn"]}
      </Button>

      <VStack align={"stretch"}>
        {question.options.map((option, index) => (
          <Button
            p={8}
            variant={"outline"}
            key={index}
            onClick={() => setSelectedOption(option)}
            colorScheme={selectedOption === option ? "purple" : "gray"}
          >
            {option}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default MultipleChoiceQuestion;
