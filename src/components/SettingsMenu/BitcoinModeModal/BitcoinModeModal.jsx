import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useCashuWallet } from "../../../hooks/useCashuWallet";
import { IdentityCard } from "../../../elements/IdentityCard";

const BitcoinModeModal = ({ isOpen, onClose }) => {
  const [isModalActive, setisModalActive] = useState(false);
  const [isRecharging, setIsRecharging] = useState(false);
  const toast = useToast();
  const { balance, handleSwapSend, recharge } = useCashuWallet(
    false,
    isModalActive
  );

  useEffect(() => {
    setisModalActive(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setisModalActive(true);
  }, []);

  useEffect(() => {
    if (balance === 0) {
      recharge();
    }
  }, [balance]);

  const cashTap = () => {
    /**
      returns a cashu token, which you process based on your needs
        cashuToken = await handleSwapSend();
        await storeTokenInFirestore(cashuToken); (redeem you)
     */
    handleSwapSend();
  };

  const handleCopyKeys = () => {
    const keys = localStorage.getItem("address"); // replace with actual keys
    navigator.clipboard.writeText(keys);
    toast({
      title: "Address copied.",
      description: "Your address has been copied to the clipboard.",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bitcoin Mode</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} textAlign={"center"}>
            {balance > 0
              ? "You're now using Bitcoin!"
              : "Scan the QR code with Cash App to deposit Bitcoin"}
          </Text>
          <VStack style={{ display: "flex", justifyContent: "center" }}>
            {localStorage.getItem("address") && balance === 0 ? (
              <>
                <QRCode
                  value={localStorage.getItem("address")}
                  size={256}
                  style={{ zIndex: 1000000 }}
                />
                <Button onClick={handleCopyKeys}>🔑 Copy Address</Button>
              </>
            ) : null}

            {balance > 0 ? (
              <IdentityCard
                number={
                  localStorage.getItem("address")?.substr(0, 16).substr(0, 16) +
                  "..."
                }
                name={
                  <div>
                    Bitcoin Deposit Card
                    <div>balance: {balance}</div>
                  </div>
                }
                theme="BTC"
                animateOnChange={false}
                realValue={localStorage.getItem("address")}
              />
            ) : null}
          </VStack>
        </ModalBody>
        <ModalFooter>
          {balance ? (
            <Button
              style={{ marginBottom: 8 }}
              className="swap-send-button"
              onClick={cashTap}
              variant={"ghost"}
            >
              Test cash tap
            </Button>
          ) : null}
          &nbsp;&nbsp;
          {balance < 1 ? (
            <Button
              style={{ marginBottom: 8 }}
              className="swap-send-button"
              onClick={() => {
                setIsRecharging(true);
                recharge();
              }}
              variant={"ghost"}
            >
              Recharge
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BitcoinModeModal;
