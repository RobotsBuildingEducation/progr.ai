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
  Link,
} from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useCashuWallet } from "../../../hooks/useCashuWallet";
import { IdentityCard } from "../../../elements/IdentityCard";
import { translation } from "../../../utility/translation";
import { SunsetCanvas } from "../../../elements/SunsetCanvas";

const BitcoinModeModal = ({ isOpen, onClose, userLanguage }) => {
  const [isModalActive, setisModalActive] = useState(false);
  const [isRecharging, setIsRecharging] = useState(false);
  const toast = useToast();
  const { balance, handleSwapSend, recharge, handleMint, lightningAddress } =
    useCashuWallet(false, isModalActive);

  useEffect(() => {
    setisModalActive(isOpen);
  }, [isOpen]);

  // useEffect(() => {
  //   setisModalActive(true);
  // }, []);

  useEffect(() => {
    setisModalActive(true);
    handleMint();
  }, []);

  useEffect(() => {
    if (balance === 0) {
      recharge();
    }
  }, [balance]);

  useEffect(() => {
    console.log("address has changed", localStorage.getItem("address"));
  }, [localStorage.getItem("address")]);

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
      title: translation[userLanguage]["toast.title.addressCopied"],
      description: translation[userLanguage]["toast.description.addressCopied"],
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  console.log("running");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {translation[userLanguage]["modal.bitcoinMode.title"]}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text
            mb={4}
            textAlign={"left"}
            background="#a8a8a8"
            color="white"
            p={6}
            borderRadius="12px"
          >
            {balance > 0 ? (
              <b>
                {translation[userLanguage]["modal.bitcoinMode.successMessage"]}
              </b>
            ) : (
              <b>
                {translation[userLanguage]["modal.bitcoinMode.instructions"]}{" "}
                <br />
                <br />
                <a
                  target="_blank"
                  style={{ textDecoration: "underline", color: "lightgreen" }}
                  href="https://cash.app"
                >
                  Cash App
                </a>
              </b>
            )}
          </Text>
          <VStack style={{ display: "flex", justifyContent: "center" }}>
            {localStorage.getItem("address") && balance === 0 ? (
              <>
                <QRCode
                  value={localStorage.getItem("address")}
                  size={256}
                  style={{ zIndex: 1000000 }}
                />
                <div style={{ marginTop: "8px" }}>
                  {translation[userLanguage]["or"]} &nbsp;
                  <Button onMouseDown={handleCopyKeys}>
                    🔑{" "}
                    {
                      translation[userLanguage][
                        "modal.bitcoinMode.copyAddressButton"
                      ]
                    }
                  </Button>
                </div>
              </>
            ) : balance > 0 ? null : (
              <SunsetCanvas />
            )}

            {balance > 0 ? (
              <IdentityCard
                number={
                  localStorage.getItem("address")?.substr(0, 16).substr(0, 16) +
                  "..."
                }
                name={
                  <div>
                    {
                      translation[userLanguage][
                        "modal.bitcoinMode.cardNameLabel"
                      ]
                    }
                    <div>
                      {
                        translation[userLanguage][
                          "modal.bitcoinMode.balanceLabel"
                        ]
                      }
                      : {balance}
                    </div>
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
              onMouseDown={cashTap}
              variant={"ghost"}
            >
              {translation[userLanguage]["modal.bitcoinMode.testCashTapButton"]}
            </Button>
          ) : null}
          &nbsp;&nbsp;
          {balance < 1 ? (
            <Button
              style={{ marginBottom: 8 }}
              className="swap-send-button"
              onMouseDown={() => {
                setIsRecharging(true);
                recharge();
              }}
              variant={"ghost"}
            >
              {translation[userLanguage]["modal.bitcoinMode.rechargeButton"]}
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BitcoinModeModal;
