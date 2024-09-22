import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  extendTheme,
  useStyleConfig,
} from "@chakra-ui/react";
import { BigSunset, SunsetCanvas } from "../../elements/SunsetCanvas";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { translation } from "../../utility/translation";
import RandomCharacter from "../../elements/RandomCharacter";

const EducationalModal = ({
  isOpen,
  onClose,
  educationalMessages,
  educationalContent,
  userLanguage,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent
        background={"#6B46C1"}
        // color="white"
        borderRadius="lg"
        boxShadow="2xl"
        p={0}
        width="100%"

        // style={{ fontFamily: "Roboto Serif, serif" }}
      >
        <ModalHeader
          fontSize="3xl"
          fontWeight="bold"
          marginTop={0}
          paddingTop={0}
          padding={3}
        >
          <HStack>
            <div style={{ width: "fit-content" }}>
              {educationalMessages.length > 0 &&
              !educationalContent.length > 0 ? (
                <BigSunset />
              ) : (
                <RandomCharacter />
              )}
            </div>
            &nbsp;
            <div style={{ color: "white" }}>
              {translation[userLanguage]["modal.learn.title"]}
            </div>
          </HStack>
        </ModalHeader>

        <ModalBody p={2} style={{ width: "100%" }}>
          {educationalMessages.length === 0 && <Spinner size="xl" />}

          {educationalMessages.length > 0 && !educationalContent.length > 0 ? (
            <div style={{ color: "#FAF3E0" }}>
              <b
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: 4,
                  borderRadius: "6px",
                }}
              >
                {" "}
                {translation[userLanguage]["modal.learn.instructions"]}
              </b>
              <br />
              <br />
              {educationalMessages[educationalMessages.length - 1]?.content}
            </div>
          ) : null}
          <VStack spacing={6} alignItems="flex-start">
            {educationalContent.length > 0 &&
              educationalContent.map((content, index) => (
                <Box
                  fontFamily={"monospace"}
                  key={index}
                  p={4}
                  bg="#170029"
                  borderRadius="md"
                  borderWidth={1}
                  borderColor="rgba(255, 255, 255, 0.2)"
                  width="100%"
                  boxShadow="md"
                >
                  {/* <Text fontSize="xl" fontWeight="bold">
                    Code Example:
                  </Text> */}
                  <div
                    style={{
                      //   color: "#696969",
                      backgroundColor: "#faf3e0",
                      width: "100%",
                      padding: 20,
                      wordBreak: "break-word",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 30,
                      boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.75)",
                    }}
                  >
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                      <Editor
                        value={content.code}
                        highlight={(input) => highlight(input, languages.js)}
                        padding={10}
                        style={{
                          fontFamily: '"Fira code", "Fira Mono", monospace',
                          fontSize: 14,

                          borderRadius: "8px",
                        }}
                        disabled
                      />
                    </pre>
                  </div>
                  {/* <Text fontSize="xl" fontWeight="bold" mt={3}>
                    Explanation:
                  </Text> */}
                  <br />
                  <Text style={{ color: "white" }} fontSize="sm">
                    {content.explanation}
                  </Text>
                </Box>
              ))}
          </VStack>
        </ModalBody>
        <ModalFooter margin={0} padding={3}>
          <Button
            onMouseDown={onClose}
            variant="solid"
            size="lg"
            boxShadow={"0px 0.5px 0.5px 1px black"}
          >
            {translation[userLanguage]["button.close"]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EducationalModal;
