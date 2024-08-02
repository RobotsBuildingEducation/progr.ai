import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

const SocialWalletModal = ({ isOpen, onClose }) => {
  const toast = useToast();

  const handleCopyKeys = () => {
    const keys = localStorage.getItem("local_privateKey"); // replace with actual keys
    navigator.clipboard.writeText(keys);
    toast({
      title: "Keys copied.",
      description: "Your keys have been copied to the clipboard.",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent textAlign={"center"}>
        <ModalHeader>Open Social Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Don't forget your keys before leaving!
          <br />
          <br />
          <Button onClick={handleCopyKeys}>🔑 Copy Keys</Button>
          <br />
          <br />
          <Button
            as="a"
            href="https://primal.net/home"
            mt={2}
            mb={4}
            variant={"outline"}
          >
            Go to Social Wallet
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SocialWalletModal;
