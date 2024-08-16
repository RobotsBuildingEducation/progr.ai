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
  Link,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { translation } from "../../../utility/translation";
import { SunsetCanvas } from "../../../elements/SunsetCanvas";

const ActionButton = ({ href, text, userLanguage }) => (
  <Button
    as="a"
    href={href}
    mt={2}
    mb={4}
    variant={"outline"}
    target="_blank"
    width="45%"
    margin={2}
    height={100}
    boxShadow={"0px 0.5px 0.5px 1px black"}
    fontSize={"small"}
  >
    {text}
  </Button>
);

const SocialWalletModal = ({ isOpen, onClose, userLanguage }) => {
  const toast = useToast();

  const handleCopyKeys = () => {
    const keys = localStorage.getItem("local_nsec"); // replace with actual keys
    navigator.clipboard.writeText(keys);
    toast({
      title: translation[userLanguage]["toast.title.keysCopied"],
      description: translation[userLanguage]["toast.description.keysCopied"],
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
      icon: <SunsetCanvas />,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent textAlign={"center"}>
        <ModalHeader>
          {translation[userLanguage]["modal.openSocialWallet.title"]}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {translation[userLanguage]["modal.openSocialWallet.instructions"]}
          <br />
          <br />
          <Button onMouseDown={handleCopyKeys}>
            🔑 {translation[userLanguage]["button.copyKey"]}
          </Button>
          <br />
          <br />
          <ActionButton
            href={`https://primal.net/p/${localStorage.getItem("local_npub")}`}
            text={translation[userLanguage]["settings.button.yourProfile"]}
            userLanguage={userLanguage}
          />
          <ActionButton
            href="https://robotsbuildingeducation.com"
            text={translation[userLanguage]["settings.button.yourTutor"]}
            userLanguage={userLanguage}
          />
          <ActionButton
            href="https://primal.net/home"
            text={
              translation[userLanguage]["modal.openSocialWallet.startButton"]
            }
            userLanguage={userLanguage}
          />
          <ActionButton
            href="https://nostrapps.com"
            text={translation[userLanguage]["settings.button.nostrApps"]}
            userLanguage={userLanguage}
          />
          <br />
          <br />
          <Link
            type="external"
            as="a"
            href="https://primal.net/p/npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt"
            target="_blank"
            textDecor={"underline"}
          >
            {translation[userLanguage]["link.connectWithMe"]}
          </Link>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onMouseDown={onClose}>
            {translation[userLanguage]["button.close"]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SocialWalletModal;
