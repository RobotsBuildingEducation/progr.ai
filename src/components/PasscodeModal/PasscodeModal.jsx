// components/PasscodeModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { usePasscodeModalStore } from "../../usePasscodeModalStore";
import { translation } from "../../utility/translation";

export const PasscodeModal = ({ userLanguage }) => {
  const {
    isPasscodeModalOpen,
    closePasscodeModal,
    enteredPasscode,
    setEnteredPasscode,
  } = usePasscodeModalStore();
  const toast = useToast();

  const handleConfirm = () => {
    if (enteredPasscode === import.meta.env.VITE_PATREON_FEATURES_PASSCODE) {
      localStorage.setItem("passcode", enteredPasscode);
      toast({
        title: "Features unlocked!",
        description: "AI features have been enabled on your device.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      closePasscodeModal();
      //   onConfirm();
    } else {
      toast({
        title: "Invalid passcode.",
        description: "Please enter the correct passcode.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Modal isOpen={isPasscodeModalOpen} onClose={closePasscodeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{translation[userLanguage]["passcode.label"]}</ModalHeader>
        <ModalBody>
          {translation[userLanguage]["prompt.passcode"]}
          <br /> <br />
          <Input
            value={enteredPasscode}
            onChange={(e) => setEnteredPasscode(e.target.value)}
            placeholder={translation[userLanguage]["passcode.label"]}
            type="password"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closePasscodeModal}>
            {translation[userLanguage]["cancel"]}
          </Button>
          <Button colorScheme="purple" onClick={handleConfirm} ml={3}>
            {translation[userLanguage]["confirm"]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
