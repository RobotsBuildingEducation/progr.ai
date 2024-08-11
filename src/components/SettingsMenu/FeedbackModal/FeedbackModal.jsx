import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { translation } from "../../../utility/translation"; // Import the translation object
import { database } from "../../../database/firebaseResources";

const FeedbackModal = ({ isOpen, onClose, userLanguage }) => {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await addDoc(collection(database, "tickets"), {
        contact,
        message,
        isComplete: false,
        createdAt: serverTimestamp(),
      });
      toast({
        title: translation[userLanguage]["toast.feedbackSubmittedTitle"],
        description:
          translation[userLanguage]["toast.feedbackSubmittedDescription"],
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setContact("");
      setMessage("");
      onClose();
    } catch (error) {
      toast({
        title: translation[userLanguage]["toast.feedbackErrorTitle"],
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {translation[userLanguage]["modal.feedback.title"]}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="contact" mb={4}>
            <FormLabel>
              {translation[userLanguage]["modal.feedback.contactLabel"]}
            </FormLabel>
            <Input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={
                translation[userLanguage]["modal.feedback.contactPlaceholder"]
              }
            />
          </FormControl>
          <FormControl id="message">
            <FormLabel>
              {translation[userLanguage]["modal.feedback.messageLabel"]}
            </FormLabel>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                translation[userLanguage]["modal.feedback.messagePlaceholder"]
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onMouseDown={onClose}>
            {translation[userLanguage]["modal.feedback.cancelButton"]}
          </Button>
          &nbsp; &nbsp;
          <Button mr={3} onMouseDown={handleSubmit}>
            {translation[userLanguage]["modal.feedback.submitButton"]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
