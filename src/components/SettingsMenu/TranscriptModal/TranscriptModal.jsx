import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  HStack,
  useToast,
} from "@chakra-ui/react";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import ReactConfetti from "react-confetti";

import { transcript } from "../../../utility/transcript";

import { useSharedNostr } from "../../../hooks/useNOSTR";
import { SunsetCanvas } from "../../../elements/SunsetCanvas";
import { translation } from "../../../utility/translation";
import { CopyButtonIcon } from "../../../elements/CopyButtonIcon";

const TranscriptModal = ({ isOpen, onClose, userLanguage }) => {
  const toast = useToast();

  const [badges, setBadges] = useState([]);
  const [areBadgesLoading, setAreBadgesLoading] = useState(true);
  const { getUserBadges } = useSharedNostr(
    localStorage.getItem("local_npub"),
    localStorage.getItem("local_nsec")
  );
  useEffect(() => {
    async function getBadges() {
      let data = await getUserBadges();
      setBadges(data);
      setAreBadgesLoading(false);
    }

    if (isOpen) {
      getBadges();
    } else {
      setAreBadgesLoading(true);
    }
  }, [isOpen]);

  const handleCopyKeys = (id) => {
    if (id) {
      const keys = id; // replace with actual keys
      navigator.clipboard.writeText(keys);
      toast({
        title: translation[userLanguage]["toast.title.keysCopied"],
        description: translation[userLanguage]["toast.description.keysCopied"],
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else {
      const keys = localStorage.getItem("local_nsec"); // replace with actual keys
      navigator.clipboard.writeText(keys);
      toast({
        title: translation[userLanguage]["toast.title.keysCopied"],
        description: translation[userLanguage]["toast.description.keysCopied"],
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };

  console.log("badges", badges);

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
            <div style={{ color: "white" }}>
              {/* {translation[userLanguage]["modal.learn.title"]} */}
              {translation[userLanguage]["modal.title.decentralizedTranscript"]}
            </div>
          </HStack>
        </ModalHeader>

        <ModalBody p={8} style={{ width: "100%", color: "white" }}>
          <div
            style={{
              display: "flex",
            }}
            onMouseDown={() =>
              handleCopyKeys(localStorage.getItem("local_npub") || "")
            }
          >
            <div style={{ width: "min-content" }}>
              <CopyButtonIcon />
            </div>
            &nbsp;
            <div>
              <b>{translation[userLanguage]["yourID"]}</b>
              &nbsp;
              {localStorage?.getItem("local_npub")?.substr(0, 16) || ""}
            </div>
          </div>

          <br />
          <br />

          <div>
            {
              translation[userLanguage][
                "modal.decentralizedTranscript.awareness"
              ]
            }
            &nbsp;
            <span>
              <a
                target="_blank"
                href="https://robotsbuildingeducation.com"
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                {translation[userLanguage][
                  "settings.button.yourTutor"
                ].toLowerCase()}
              </a>
              &nbsp;
            </span>
            <Button
              width="fit-content"
              onMouseDown={() =>
                handleCopyKeys(localStorage.getItem("local_nsec"))
              }
              fontSize={"smaller"}
            >
              🔑 {translation[userLanguage]["button.copyKey"]}
            </Button>
          </div>
          <br />
          <br />
          <b>
            {
              translation[userLanguage][
                "modal.decentralizedTranscript.awardsEarned"
              ]
            }
          </b>
          {areBadgesLoading ? (
            <div style={{ width: "fit-content" }}>
              <br />
              <SunsetCanvas /> {translation[userLanguage]["loading"]}
            </div>
          ) : badges.length < 1 ? (
            <div>{translation[userLanguage]["noTranscriptFound"]}</div>
          ) : (
            <Box
              display="flex"
              m={2}
              width="fit-content"
              flexWrap="wrap"
              height="min-content"
            >
              {badges.map((badge) => (
                <div
                  style={{
                    margin: 6,

                    width: "250px",
                    height: "100px",
                    display: "flex",
                  }}
                >
                  <a
                    href={`https://badges.page/a/${badge.badgeAddress}`}
                    target="_blank"
                  >
                    <img
                      src={badge.image}
                      width={100}
                      style={{
                        borderRadius: "33%",
                        boxShadow: "0px 1px 1px 2px black",
                        marginBottom: 4,
                      }}
                    />
                  </a>
                  <div style={{ padding: 6 }}>
                    <Text fontSize={"sm"}>
                      {translation[userLanguage][badge.name] || badge.name}
                    </Text>
                  </div>
                </div>
              ))}
            </Box>
          )}
        </ModalBody>
        <ModalFooter margin={0} padding={3}>
          <Button
            onMouseDown={onClose}
            variant="solid"
            size="lg"
            boxShadow={"0px 0.5px 0.5px 1px black"}
          >
            {translation[userLanguage]["button.close"]}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TranscriptModal;
