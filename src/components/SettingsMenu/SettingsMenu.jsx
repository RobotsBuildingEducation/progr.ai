import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  useToast,
  Text,
  FormControl,
  Switch,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import BitcoinModeModal from "./BitcoinModeModal/BitcoinModeModal";
import RoxModal from "./RoxModal/RoxModal";
import SocialWalletModal from "./SocialWalletModal/SocialWalletModal";
import SelfPacedModal from "./SelfPacedModal/SelfPacedModal";
import { KnowledgeLedgerModal } from "./KnowledgeLedgerModal/KnowledgeLedgerModal"; // Import the new modal
import FeedbackModal from "./FeedbackModal/FeedbackModal"; // Import the feedback modal
import { translation } from "../../utility/translation";
import { database } from "../../database/firebaseResources";
import { doc, updateDoc } from "firebase/firestore";
import TranscriptModal from "./TranscriptModal/TranscriptModal";

const SettingsMenu = ({
  isSignedIn,
  setIsSignedIn,
  steps,
  currentStep,
  userLanguage,
  setUserLanguage,
  view,
  setView,
  step,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const btnRef = React.useRef();
  const toast = useToast();

  const {
    isOpen: isSelfPacedOpen,
    onOpen: onSelfPacedOpen,
    onClose: onSelfPacedClose,
  } = useDisclosure();

  const {
    isOpen: isBitcoinModeOpen,
    onOpen: onBitcoinModeOpen,
    onClose: onBitcoinModeClose,
  } = useDisclosure();

  const {
    isOpen: isRoxModalOpen,
    onOpen: onRoxModalOpen,
    onClose: onRoxModalClose,
  } = useDisclosure();

  const {
    isOpen: isSocialWalletOpen,
    onOpen: onSocialWalletOpen,
    onClose: onSocialWalletClose,
  } = useDisclosure();

  const {
    isOpen: isKnowledgeLedgerOpen,
    onOpen: onKnowledgeLedgerOpen,
    onClose: onKnowledgeLedgerClose,
  } = useDisclosure();

  const {
    isOpen: isFeedbackOpen,
    onOpen: onFeedbackOpen,
    onClose: onFeedbackClose,
  } = useDisclosure(); // Feedback modal

  const {
    isOpen: isTranscriptOpen,
    onOpen: onTranscriptOpen,
    onClose: onTranscriptClose,
  } = useDisclosure(); // Feedback modal

  const [interval, setInterval] = useState(120);

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
    const userDocRef = doc(
      database,
      "users",
      localStorage.getItem("local_npub")
    );
    updateDoc(userDocRef, {
      language: userLanguage,
    });
  }, []);

  return (
    <>
      {isSignedIn ? (
        <IconButton
          ref={btnRef}
          icon={<FiSettings />}
          onMouseDown={onOpen}
          variant="outline"
          position="fixed"
          top={4}
          right={4}
          style={{ backgroundColor: "white", zIndex: 1000 }}
        />
      ) : null}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {translation?.[userLanguage]?.["settings.title"]}
          </DrawerHeader>
          <DrawerBody>
            <VStack>
              <FormControl
                display="flex"
                alignItems="center"
                style={{ justifyContent: "center" }}
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
                colorScheme="purple"
                style={{ width: "100%" }}
                onMouseDown={onSelfPacedOpen}
                p={6}
              >
                {translation[userLanguage]["settings.button.selfPace"]}
              </Button>
              <Button
                p={6}
                colorScheme="purple"
                style={{ width: "100%" }}
                onMouseDown={onKnowledgeLedgerOpen} // New button to open the Knowledge Ledger Modal
              >
                {translation[userLanguage]["settings.button.adaptiveLearning"]}
              </Button>
              <Button
                p={6}
                colorScheme="purple"
                style={{ width: "100%" }}
                onMouseDown={onBitcoinModeOpen}
              >
                {translation[userLanguage]["settings.button.bitcoinMode"]}
              </Button>{" "}
              <Button
                p={6}
                colorScheme="purple"
                style={{ width: "100%" }}
                onMouseDown={onTranscriptOpen}
              >
                {translation[userLanguage]["settings.button.transcript"]}
              </Button>
              {/* <Button
                p={6}
                colorScheme="purple"
                style={{ width: "100%" }}
                onMouseDown={onFeedbackOpen} // Feedback button
              >
                {translation[userLanguage]["settings.button.feedback"] ||
                  "Feedback"}
              </Button> */}
              {/* <Button
                p={6}
                style={{ width: "100%" }}
                onMouseDown={onRoxModalOpen}
                mt={4}
                variant={"outline"}
              >
                {translation[userLanguage]["settings.button.tutor"]}
              </Button> */}
              <Button
                p={6}
                style={{ width: "100%" }}
                onMouseDown={onSocialWalletOpen}
                variant={"outline"}
                boxShadow={"0px 0.5px 0.5px 1px black"}
              >
                {translation[userLanguage]["settings.button.socialWallet"]}
              </Button>
              <Button
                p={6}
                as="a"
                href="https://chatgpt.com/g/g-09h5uQiFC-rox"
                style={{ width: "100%" }}
                variant={"outline"}
                boxShadow={"0px 0.5px 0.5px 1px black"}
              >
                {translation[userLanguage]["settings.button.tutorGPT"]}
              </Button>
              <Button
                as="a"
                href="https://patreon.com/robotsbuildingeducation"
                p={6}
                style={{ width: "100%" }}
                variant={"outline"}
                boxShadow={"0px 0.5px 0.5px 1px black"}
              >
                {translation[userLanguage]["settings.button.patreon"]}
              </Button>
              <Button
                style={{ width: "100%" }}
                onMouseDown={() => {
                  onClose();
                  navigate("/about");
                }}
                p={6}
                variant={"transparent"}
              >
                {translation[userLanguage]["button.about"]}
              </Button>
              <Button
                style={{ width: "100%" }}
                onMouseDown={() => {
                  const translateValue = localStorage.getItem("userLanguage");
                  localStorage.removeItem("local_nsec");
                  localStorage.removeItem("local_npub");
                  if (translateValue) {
                    localStorage.setItem("userLanguage", translateValue);
                  }
                  onClose();
                  setView("buttons");
                  navigate("/");
                }}
                p={6}
                variant={"transparent"}
              >
                {translation[userLanguage]["settings.button.signOut"]}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <SelfPacedModal
        isOpen={isSelfPacedOpen}
        onClose={onSelfPacedClose}
        interval={interval}
        setInterval={setInterval}
        userId={localStorage.getItem("local_npub")}
        userLanguage={userLanguage}
      />

      {isBitcoinModeOpen ? (
        <BitcoinModeModal
          isOpen={isBitcoinModeOpen}
          onClose={onBitcoinModeClose}
          userLanguage={userLanguage}
        />
      ) : null}

      <RoxModal
        isOpen={isRoxModalOpen}
        userLanguage={userLanguage}
        onClose={onRoxModalClose}
      />
      <SocialWalletModal
        isOpen={isSocialWalletOpen}
        onClose={onSocialWalletClose}
        userLanguage={userLanguage}
      />
      <KnowledgeLedgerModal
        userLanguage={userLanguage}
        isOpen={isKnowledgeLedgerOpen} // New modal
        onClose={onKnowledgeLedgerClose}
        steps={steps}
        currentStep={currentStep}
      />
      <FeedbackModal
        userLanguage={userLanguage}
        isOpen={isFeedbackOpen}
        onClose={onFeedbackClose} // Feedback modal
      />

      <TranscriptModal
        userLanguage={userLanguage}
        isOpen={isTranscriptOpen}
        onClose={onTranscriptClose} // Feedback modal
        step={step}
      />
    </>
  );
};

export default SettingsMenu;
