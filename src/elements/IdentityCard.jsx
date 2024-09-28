import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import QRCode from "qrcode.react";
import { CopyButtonIcon } from "./CopyButtonIcon";
// Define the animation for the subtle swirl
const subtleSwirl = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Define the animation for number change
const numberChange = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Create a CardContainer styled component with conditional styles based on theme
const CardContainer = styled.div`
  text-shadow: 0px 0.25px 0px black;
  width: 100%;
  max-width: 700px;
  height: ${({ flip }) => (flip ? "525px" : "200px")};
  border-radius: 16px;
  perspective: 1000px;
  transition: 0.65s all ease-in-out;
  height: 250px;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  ${({ flip }) =>
    flip &&
    css`
      transform: rotateY(180deg);
    `}
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  ${({ theme }) =>
    theme === "web5"
      ? css`
          background: linear-gradient(135deg, #2c2c2c, #1a1a1a, #0f0f0f);
          background-size: 200% 200%;
          animation: ${subtleSwirl} 6s ease infinite;
          color: yellow;
          font-family: "IBM Plex Mono";
          font-size: 0.8em;
        `
      : theme === "nostr"
        ? css`
            background: linear-gradient(135deg, #ff6f91, #d783ff, #c471ed);
            background-size: 200% 200%;
            animation: ${subtleSwirl} 6s ease infinite;
            color: #fff;
            font-family: "IBM Plex Mono";
            font-size: 1.2em;
          `
        : theme === "cashu"
          ? css`
              background: linear-gradient(135deg, #004e92, #2ec6f0);
              background-size: 200% 200%;
              animation: ${subtleSwirl} 6s ease infinite;
              color: #fff;
              font-family: "Avenir";
              font-size: 1.2em;
            `
          : theme === "BTC"
            ? css`
                background: linear-gradient(135deg, #f0f0f0, #d0d0d0, #b0b0b0);
                background-size: 200% 200%;
                animation: ${subtleSwirl} 6s ease infinite;
                color: #333;
                font-family: "Avenir";
                font-size: 1.2em;
              `
            : css`
                background: linear-gradient(135deg, #f9a825, #ff7043, #ffb300);
                background-size: 200% 200%;
                animation: ${subtleSwirl} 6s ease infinite;
                color: #fff;
                font-family: "IBM Plex Mono";
                font-size: 1.2em;
              `}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardBack = styled(CardFace)`
  scrollbar-width: none;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  padding: 20px;
  text-align: center;
  overflow-y: auto;
`;

const CardNumber = styled.div`
  font-size: 1.2em;
  letter-spacing: 2px;
  animation: ${({ animate }) =>
    animate
      ? css`
          ${numberChange} 0.5s ease
        `
      : "none"};
`;

const CardHolder = styled.div`
  font-size: 0.8em;
  font-family: Avenir;
`;

const CopyButton = styled.button`
  transition: 0.23s all ease-in-out;
  margin-top: 5px;
  padding: 0px 20px;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: ${({ theme, copied }) =>
    copied
      ? "gold"
      : theme === "web5"
        ? "cyan"
        : theme === "nostr"
          ? "#ff42b7"
          : theme === "cashu"
            ? "#00bfff"
            : theme === "BTC"
              ? "#333"
              : "#ffb300"};
  cursor: pointer;
  font-family: "Bungee";
  animation: ${subtleSwirl} 6s ease infinite;
`;

export const IdentityCard = ({
  number,
  name,
  theme = "default",
  animateOnChange = false,
  realValue = null,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prevNumber, setPrevNumber] = useState(number);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (animateOnChange && number !== prevNumber) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250); // Duration of the animation
      setPrevNumber(number);
    }
  }, [number, animateOnChange, prevNumber]);

  const handleCopy = (theme) => {
    let num = realValue || number;
    if (realValue && theme === "cashu") {
      window
        .open(`https://wallet.cashu.me/?token=${realValue}`, "_blank")
        .focus();
    } else {
      if (theme === "web5") num = localStorage.getItem("uniqueId");
      if (theme === "nostr") num = localStorage.getItem("local_npub");
      if (theme === "BTC") num = localStorage.getItem("address");

      navigator.clipboard.writeText(num).then(
        () => {
          setCopied(true); // Change button color to gold
          setTimeout(() => setCopied(false), 2000); // Revert color after 2 seconds
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    }
  };

  const cashuContent = (
    <div
      className="info_box"
      style={{
        textAlign: "left",
      }}
    >
      Redeem these!
    </div>
  );

  const bitcoinContent = (
    <div
      className="info_box"
      style={{
        textAlign: "left",
      }}
    >
      This code is an address that you can use to send Bitcoin from your Cash
      App. This is an experimental feature that will have you deposit $0.02
      worth of Bitcoin. The app is designed to charge you 1 Bitcoin cent called
      sats. Depositing 2 cents USD of sats grants you about 30 charges of the
      app. QR codes soon!
      <a
        target="_blank"
        href="https://primal.net/p/npub1mgt5c7qh6dm9rg57mrp89rqtzn64958nj5w9g2d2h9dng27hmp0sww7u2v"
      >
        you'll be connected to a shared account with rox.
      </a>
    </div>
  );

  const nostrContent = (
    <div
      className="info_box"
      style={{
        textAlign: "left",
      }}
    >
      You will create an account using the nostr protocol when you create a
      name. The nostr protocol lets you own your own social network and allows
      you to choose how you receive and publish content. It uses a public key
      (your ID) and a secret key (your password) to manage identity. Without a
      name,{" "}
      <a
        target="_blank"
        href="https://primal.net/p/npub1mgt5c7qh6dm9rg57mrp89rqtzn64958nj5w9g2d2h9dng27hmp0sww7u2v"
      >
        you'll be connected to a shared account with rox.
      </a>
    </div>
  );

  const web5Content = (
    <div
      className="info_box"
      style={{
        textAlign: "left",
      }}
    >
      Your identity wallet manages the data that can migrate to other platforms,
      services or applications. Different identities are used to manage
      different networks. <br />
      <br />
      <b>
        Make sure to save your ID somewhere else so you can migrate your profile
        to your preferred social media or browser. If you lose this ID, you lose
        your account since your identity is anonymous with rox.
        <br />
        <br />
        Don't trust, verify:{" "}
        <a href="https://github.com/RobotsBuildingEducation/RobotsBuildingEducation/blob/main/app/src/ProofOfWork/ActionBar/IdentityWallet/IdentityWallet.tsx">
          the code
        </a>
      </b>
    </div>
  );

  return (
    <CardContainer flip={isFlipped}>
      <CardInner flip={isFlipped}>
        <CardFace theme={theme}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardNumber animate={animate}>{number}</CardNumber>
            <CopyButton
              onMouseDown={() => handleCopy(theme)}
              theme={theme}
              copied={copied}
            >
              <CopyButtonIcon
                style={{ transition: "0.23s all ease-in-out" }}
                color={
                  copied
                    ? "gold"
                    : theme === "web5"
                      ? "cyan"
                      : theme === "nostr"
                        ? "#ffdef3"
                        : theme === "cashu"
                          ? "#00bfff"
                          : theme === "BTC"
                            ? "#333"
                            : "#ffb300"
                }
              />
            </CopyButton>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <CardHolder>
                <b>{name}</b>
              </CardHolder>
            </div>
            <div>
              <div
                style={{
                  height: "20px",
                  backgroundColor:
                    theme === "web5"
                      ? "black"
                      : theme === "nostr"
                        ? "#ff42b7"
                        : theme === "cashu"
                          ? "#004e92"
                          : theme === "BTC"
                            ? "#d0d0d0"
                            : "#ffb300",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontFamily: "Avenir",
                  color: theme === "web5" ? "cyan" : "black",
                  padding: 24,
                  cursor: "inherit",
                }}
                // onMouseDown={() => setIsFlipped(true)}
              >
                <b>{theme}</b>
              </div>
            </div>
          </div>
        </CardFace>
        <CardBack theme={theme}>
          <div style={{ height: "100%", padding: 12 }}>
            {theme === "web5"
              ? web5Content
              : theme === "BTC"
                ? bitcoinContent
                : theme === "cashu"
                  ? cashuContent
                  : nostrContent}
            <br />
            <button onMouseDown={() => setIsFlipped(false)}>Back</button>
            <br />
            <br />
          </div>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};
