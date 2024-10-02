import React from "react";
import { Button, VStack, HStack, Box, Text } from "@chakra-ui/react";
import { translation } from "../../utility/translation";

const MultipleAnswerQuestion = ({
  question,
  selectedOptions,
  setSelectedOptions,
  onLearnClick,
  userLanguage,
  handleModalCheck,
}) => {
  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option)); // Deselect if already selected
    } else {
      setSelectedOptions([...selectedOptions, option]); // Select if not selected
    }
  };

  return (
    <VStack spacing={4}>
      <Button
        onMouseDown={() => handleModalCheck(onLearnClick)}
        colorScheme="purple"
      >
        {translation[userLanguage]["app.button.learn"]}
      </Button>

      <VStack align={"stretch"} width="100%" maxWidth={"600px"}>
        {question.options.map((option, index) => (
          <Button
            p={8}
            variant={"outline"}
            key={index}
            onMouseDown={() => handleOptionClick(option)}
            colorScheme={selectedOptions.includes(option) ? "purple" : "gray"}
            justifyContent="start"
            whiteSpace="normal"
            wordWrap="break-word"
            textAlign="left"
          >
            <HStack spacing={4} width="100%" alignItems="center">
              <Box
                width="24px"
                height="24px"
                flexShrink={0}
                borderRadius="15%"
                borderWidth="2px"
                borderColor={
                  selectedOptions.includes(option) ? "purple.500" : "gray.300"
                }
                backgroundColor={
                  selectedOptions.includes(option)
                    ? "purple.500"
                    : "transparent"
                }
              />
              <Text flex="1" noOfLines={[2, 3, 4]}>
                {option}
              </Text>
            </HStack>
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default MultipleAnswerQuestion;
