import React, { useState, useRef, useEffect } from "react";
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
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import BitcoinModeModal from "./BitcoinModeModal/BitcoinModeModal";
import RoxModal from "./RoxModal/RoxModal";
import SocialWalletModal from "./SocialWalletModal/SocialWalletModal";
import SelfPacedModal from "./SelfPacedModal/SelfPacedModal";
import { KnowledgeLedgerModal } from "./KnowledgeLedgerModal/KnowledgeLedgerModal"; // Import the new modal
import { translation } from "../../utility/translation";
import { database } from "../../database/firebaseResources";
import { doc, updateDoc } from "firebase/firestore";

const SettingsMenu = ({
  isSignedIn,
  setIsSignedIn,
  steps,
  currentStep,
  userLanguage,
  setUserLanguage,
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

  const [interval, setInterval] = useState(120);

  const handleToggle = async () => {
    const newLanguage = userLanguage === "en" ? "es" : "en";
    setUserLanguage(newLanguage);

    // Update local storage
    localStorage.setItem("userLanguage", newLanguage);

    // Update Firestore
    const npub = localStorage.getItem("local_publicKey");
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
      localStorage.getItem("local_publicKey")
    );
    updateDoc(userDocRef, {
      userLanguage: userLanguage,
    });
  }, []);
  return (
    <>
      {isSignedIn ? (
        <IconButton
          ref={btnRef}
          icon={<FiSettings />}
          onClick={onOpen}
          variant="outline"
          aria-label={translation[userLanguage]["settings.title"]}
          position="fixed"
          top={4}
          right={4}
          backgroundColor={"white"}
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
            {translation[userLanguage]["settings.title"]}
          </DrawerHeader>
          <DrawerBody>
            <VStack>
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
                colorScheme="purple"
                style={{ width: "100%" }}
                onClick={onSelfPacedOpen}
              >
                {translation[userLanguage]["settings.button.selfPace"]}
              </Button>

              <Button
                colorScheme="purple"
                style={{ width: "100%" }}
                onClick={onKnowledgeLedgerOpen} // New button to open the Knowledge Ledger Modal
              >
                {translation[userLanguage]["settings.button.adaptiveLearning"]}
              </Button>
              <Button
                colorScheme="purple"
                style={{ width: "100%" }}
                onClick={onBitcoinModeOpen}
              >
                {translation[userLanguage]["settings.button.bitcoinMode"]}
              </Button>

              <Button
                style={{ width: "100%" }}
                onClick={onRoxModalOpen}
                mt={4}
                variant={"outline"}
              >
                {translation[userLanguage]["settings.button.tutor"]}
              </Button>
              <Button
                as="a"
                href="https://chatgpt.com/g/g-09h5uQiFC-rox"
                mt={4}
                style={{ width: "100%" }}
                variant={"outline"}
              >
                {translation[userLanguage]["settings.button.tutorGPT"]}
              </Button>
              <Button
                style={{ width: "100%" }}
                onClick={onSocialWalletOpen}
                mt={4}
                variant={"outline"}
              >
                {translation[userLanguage]["settings.button.socialWallet"]}
              </Button>

              <Button
                as="a"
                href="https://patreon.com/robotsbuildingeducation"
                mt={4}
                style={{ width: "100%" }}
                variant={"outline"}
              >
                {translation[userLanguage]["settings.button.patreon"]}
              </Button>
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  const translateValue = localStorage.getItem("userLanguage");
                  localStorage.clear();
                  if (translateValue) {
                    localStorage.setItem("userLanguage", translateValue);
                  }
                  onClose();
                  navigate("/");
                }}
                mt={4}
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
        userId={localStorage.getItem("local_publicKey")}
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
    </>
  );
};

export default SettingsMenu;
