import React from "react";
import { VStack, Text, Box, Button } from "@chakra-ui/react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { translation } from "../../utility/translation";

const CodeCompletionQuestion = ({
  step,
  question,
  selectedOption,
  setSelectedOption,
  onLearnClick,
  userLanguage,
}) => {
  // Colors for background, border, and hover effects
  const backgroundColor = "#faf3e0"; // Light beige background color
  const selectedBgColor = "#FDF8EF"; // Highlighted background for selected option
  const hoverBgColor = "#FDF8EF"; // Slightly darker hover effect
  const borderColor = "transparent"; // Default border color
  const selectedBorderColor = "purple.500"; // Border color for selected code block
  const textColor = "#333333"; // Dark text color for readability

  // Function to handle selection
  const handleSelection = (option) => {
    setSelectedOption(option);
  };

  return (
    <VStack spacing={6} width="100%" maxWidth="600px">
      {/* Question Text */}
      {/* <Text
        fontSize={{ base: "lg", md: "2xl" }} // Responsive font size
        fontWeight="bold"
        textAlign="center"
        mb={6}
        color={textColor} // Darker text color for light mode
      >
        {question.questionText}
      </Text> */}
      <Button
        onMouseDown={() => {
          if (
            localStorage.getItem("passcode") !==
            import.meta.env.VITE_PATREON_PASSCODE
          ) {
            let passcode = window.prompt(
              translation[userLanguage]["prompt.passcode"]
            );
            if (passcode === import.meta.env.VITE_PATREON_PASSCODE) {
              localStorage.setItem("passcode", passcode);
              onLearnClick(); // Replace with your function if needed
            } else {
              alert(translation[userLanguage]["prompt.invalid_passcode"]);
            }
          } else {
            onLearnClick();
          }
        }}
        colorScheme="purple"
      >
        {translation[userLanguage]["app.button.learn"]}
      </Button>

      {/* Code Block Options */}
      {question.options.map((option, index) => (
        <Box
          key={index}
          onClickCapture={() => handleSelection(option)} // Register click using onClickCapture
          cursor="pointer"
          bg={selectedOption === option ? selectedBgColor : backgroundColor} // Background changes on selection
          borderWidth="2px"
          borderColor={
            selectedOption === option ? selectedBorderColor : borderColor
          } // Emphasized border for selected
          _hover={{
            backgroundColor:
              selectedOption === option ? selectedBgColor : hoverBgColor, // Keep hover effect while not selected
            borderColor:
              selectedOption === option ? selectedBorderColor : borderColor, // Persistent border color on hover
          }}
          textAlign="left"
          width="100%"
          p={4}
          borderRadius="lg" // Rounded corners
          boxShadow="0px 0.5px 0.5px 1px black"
        >
          {/* Render cleaned-up and highlighted code block */}
          <Editor
            value={option}
            onValueChange={() => {}} // Disable editing
            highlight={(code) => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: "transparent", // Keep it transparent

              whiteSpace: "pre-wrap", // Handle long lines
              width: "100%",
              color: textColor, // Ensure dark text for readability
              pointerEvents: "none", // Prevent editor from blocking clicks
              // zoom: step.zoom ? step.zoom : "1.0",
            }}
            disabled
          />
        </Box>
      ))}
    </VStack>
  );
};

export default CodeCompletionQuestion;
