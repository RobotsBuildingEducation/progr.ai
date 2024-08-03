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
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import BitcoinModeModal from "./BitcoinModeModal/BitcoinModeModal";
import RoxModal from "./RoxModal/RoxModal";
import SocialWalletModal from "./SocialWalletModal/SocialWalletModal";
import SelfPacedModal from "./SelfPacedModal/SelfPacedModal";
import { KnowledgeLedgerModal } from "./KnowledgeLedgerModal/KnowledgeLedgerModal"; // Import the new modal

const SettingsMenu = ({ isSignedIn, setIsSignedIn, steps, currentStep }) => {
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

  return (
    <>
      {isSignedIn ? (
        <IconButton
          ref={btnRef}
          icon={<FiSettings />}
          onClick={onOpen}
          variant="outline"
          aria-label="Settings"
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
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody>
            <VStack>
              <Button style={{ width: "100%" }} onClick={onSelfPacedOpen}>
                Self-pace
              </Button>

              <Button
                style={{ width: "100%" }}
                onClick={onKnowledgeLedgerOpen} // New button to open the Knowledge Ledger Modal
              >
                Adaptive Learning
              </Button>
              <Button style={{ width: "100%" }} onClick={onBitcoinModeOpen}>
                Bitcoin Mode
              </Button>

              <Button
                style={{ width: "100%" }}
                onClick={onRoxModalOpen}
                mt={4}
                variant={"outline"}
              >
                Open Tutor
              </Button>
              <Button
                as="a"
                href="https://chatgpt.com/g/g-09h5uQiFC-rox"
                mt={4}
                style={{ width: "100%" }}
                variant={"outline"}
              >
                Open Tutor (GPT)
              </Button>
              <Button
                style={{ width: "100%" }}
                onClick={onSocialWalletOpen}
                mt={4}
                variant={"outline"}
              >
                Open Social Wallet
              </Button>

              <Button
                as="a"
                href="https://patreon.com/robotsbuildingeducation"
                mt={4}
                style={{ width: "100%" }}
                variant={"outline"}
              >
                Open Patreon
              </Button>
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  localStorage.clear();
                  onClose();
                  navigate("/");
                }}
                mt={4}
                variant={"transparent"}
              >
                Sign out
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
      />
      {isBitcoinModeOpen ? (
        <BitcoinModeModal
          isOpen={isBitcoinModeOpen}
          onClose={onBitcoinModeClose}
        />
      ) : null}

      <RoxModal isOpen={isRoxModalOpen} onClose={onRoxModalClose} />
      <SocialWalletModal
        isOpen={isSocialWalletOpen}
        onClose={onSocialWalletClose}
      />
      <KnowledgeLedgerModal
        isOpen={isKnowledgeLedgerOpen} // New modal
        onClose={onKnowledgeLedgerClose}
        steps={steps}
        currentStep={currentStep}
      />
    </>
  );
};

export default SettingsMenu;
