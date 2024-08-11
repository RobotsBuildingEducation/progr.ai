import React from "react";
import { Button, VStack, HStack, Box, Text } from "@chakra-ui/react";
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
      <Button onMouseDown={onLearnClick} colorScheme="purple">
        {translation[userLanguage]["app.button.learn"]}
      </Button>

      <VStack align={"stretch"} width="100%" maxWidth={"600px"}>
        {question.options.map((option, index) => (
          <Button
            p={12}
            variant={"outline"}
            key={index}
            onMouseDown={() => setSelectedOption(option)}
            colorScheme={selectedOption === option ? "purple" : "gray"}
            justifyContent="start"
            whiteSpace="normal" // Allow text to wrap normally
            wordWrap="break-word" // Break words that are too long
            textAlign="left"
          >
            <HStack spacing={4} width="100%" alignItems="center">
              <Box
                width="24px"
                height="24px"
                flexShrink={0} // Prevents the box from shrinking when text is long
                borderRadius="50%"
                borderWidth="2px"
                borderColor={
                  selectedOption === option ? "purple.500" : "gray.300"
                }
                backgroundColor={
                  selectedOption === option ? "purple.500" : "transparent"
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

export default MultipleChoiceQuestion;
