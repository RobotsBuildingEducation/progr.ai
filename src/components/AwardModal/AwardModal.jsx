import React, { useEffect, useState } from "react";
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
import { SunsetCanvas } from "../../elements/SunsetCanvas";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { translation } from "../../utility/translation";
import { transcript } from "../../utility/transcript";
import ReactConfetti from "react-confetti";
import { useSharedNostr } from "../../hooks/useNOSTR";

const AwardModal = ({ isOpen, onClose, step, userLanguage }) => {
  const [badges, setBadges] = useState([]);
  const { getUserBadges } = useSharedNostr(
    localStorage.getItem("local_npub"),
    localStorage.getItem("local_nsec")
  );
  useEffect(() => {
    let data = getUserBadges();
    setBadges(data);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      scrollBehavior={"inside"}
    >
      <ModalOverlay></ModalOverlay>
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
              <SunsetCanvas />
            </div>
            &nbsp;
            <div style={{ color: "white" }}>
              {/* {translation[userLanguage]["modal.learn.title"]} */}
              Decentralized Transcript
            </div>
          </HStack>
        </ModalHeader>

        <ModalBody p={2} style={{ width: "100%", color: "white" }}>
          <ReactConfetti
            // gravity={0.75}
            numberOfPieces={100}
            recycle={false}
            colors={["#FFCCCC", "#CCEFFF", "#D9A8FF", "#FF99CC", "#FFD1B3"]} // Array of colors matching the logo
          />
          hiii
          <img
            src={transcript[step.groupReference]["imgSrc"]}
            width={150}
            style={{
              borderRadius: "33%",
              boxShadow: "0px 1px 1px 2px black",
            }}
          />
        </ModalBody>
        {/* <ModalFooter margin={0} padding={3}>
          <Button
            onMouseDown={onClose}
            variant="solid"
            size="lg"
            boxShadow={"0px 0.5px 0.5px 1px black"}
          >
            {translation[userLanguage]["button.close"]}
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default AwardModal;
