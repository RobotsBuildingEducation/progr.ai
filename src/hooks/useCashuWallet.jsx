import { addDoc, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { database } from "../database/firebaseResources";
import { CashuMint, CashuWallet, getEncodedToken } from "@cashu/cashu-ts";

export const useProofStorage = () => {
  const [proofs, setProofs] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const storedProofs = localStorage.getItem("proofs");
    if (storedProofs) {
      const parsedProofs = JSON.parse(storedProofs);
      setProofs(parsedProofs);
      const initialBalance = parsedProofs.reduce(
        (total, proof) => total + proof.amount,
        0
      );
      localStorage.setItem("balance", initialBalance);
      setBalance(initialBalance);
    }
  }, []);

  useEffect(() => {
    console.log("========================================================");
    console.log("the proofs have changed", proofs);
    if (!proofs) {
      console.log("no proofs....");
      console.log("========================================================");
      return;
    }
    localStorage.setItem("proofs", JSON.stringify(proofs));
    const newBalance = proofs.reduce((total, proof) => total + proof.amount, 0);
    localStorage.setItem("balance", newBalance);

    console.log("new balance", newBalance);

    console.log("========================================================");

    setBalance(newBalance);
  }, [proofs]);

  const addProofs = (newProofs) => {
    setProofs((prevProofs) => [...(prevProofs || []), ...newProofs]);
  };

  const removeProofs = (proofsToRemove) => {
    if (!proofsToRemove) return;
    setProofs((prevProofs) =>
      prevProofs.filter((proof) => !proofsToRemove.includes(proof))
    );
  };

  const getProofsByAmount = (amount, keysetId = undefined) => {
    const result = [];
    let proofSet = proofs || JSON.parse(localStorage.getItem("proofs"));
    let sum = 0;

    console.log("PROOFS XYZ ====", proofSet);
    for (const proof of proofSet) {
      if (sum >= amount) break;
      if (keysetId && proof.id !== keysetId) continue;
      result.push(proof);
      sum += proof.amount;
    }

    return result.length > 0 && sum >= amount ? result : [];
  };

  return {
    addProofs,
    removeProofs,
    getProofsByAmount,
    balance,
  };
};

export const useCashuWallet = (isUnactivated, isModalOpen = null) => {
  const [formData, setFormData] = useState({
    mintUrl: "https://stablenut.umint.cash",
    mintAmount: "25",
    meltInvoice: "",
    swapAmount: "1",
    swapToken: "",
  });

  const [wallet, setWallet] = useState(null);
  const [cashuToken, setCashuToken] = useState(null);
  const { addProofs, balance, removeProofs, getProofsByAmount } =
    useProofStorage();

  const [lightningAddress, setLightningAddress] = useState("");

  useEffect(() => {
    if (isUnactivated && !localStorage.getItem("address") && balance < 1) {
    } else {
      const storedMintData = JSON.parse(localStorage.getItem("mint"));

      if (storedMintData) {
        const { url, keyset } = storedMintData;
        const mint = new CashuMint(url);
        const walletRef = new CashuWallet(mint, { keys: keyset, unit: "sat" });
        setWallet(walletRef);
        setFormData((prevData) => ({ ...prevData, mintUrl: url }));

        if (!isUnactivated) {
          handleMint(walletRef);
        }
      } else {
        handleSetMint();
      }
    }
  }, []);

  const handleSetMint = async () => {
    const mint = new CashuMint(formData.mintUrl);

    try {
      const { keysets } = await mint.getKeys();
      const satKeyset = keysets.find((k) => k.unit === "sat");
      let walletRef = new CashuWallet(mint, { keys: satKeyset, unit: "sat" });
      setWallet(walletRef);

      localStorage.setItem(
        "mint",
        JSON.stringify({ url: formData.mintUrl, keyset: satKeyset })
      );

      await handleMint(walletRef);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMint = async (walletRef) => {
    if (
      parseInt(localStorage.getItem("balance")) < 1 ||
      isNaN(parseInt(localStorage.getItem("balance")))
    ) {
      const amount = parseInt(formData.mintAmount);
      let w = wallet || walletRef;
      console.log("wwww,", w);
      const quote = await w.getMintQuote(amount);

      localStorage.setItem("address", quote.request);

      setLightningAddress(quote.request);

      let count = 0;

      const intervalId = setInterval(async () => {
        try {
          if (count === 36 || parseInt(localStorage.getItem(balance)) > 0) {
            clearInterval(intervalId);
          } else {
            const { proofs } = await w.mintTokens(amount, quote.quote, {
              keysetId: w.keys.id,
            });

            setFormData((prevData) => ({ ...prevData }));
            addProofs(proofs);
            clearInterval(intervalId);
          }
        } catch (error) {
          count++;
          console.error("Quote probably not paid: ", quote.request, error);
        }
      }, 5000);
    } else {
      console.log("failed to run");
    }
  };

  const handleSwapSend = async () => {
    const swapAmount = parseInt(formData.swapAmount);
    console.log("SWAP AMOUNT...", swapAmount);
    const proofs = getProofsByAmount(swapAmount);

    if (proofs.length === 0) {
      alert("Insufficient balance");
      return;
    }

    try {
      const { send, returnChange } = await wallet.send(swapAmount, proofs);
      const encodedToken = getEncodedToken({
        token: [{ proofs: send, mint: wallet.mint.mintUrl }],
      });

      removeProofs(proofs);
      addProofs(returnChange);

      setCashuToken(encodedToken);
      console.log("cashu token", encodedToken);
      return encodedToken;
    } catch (error) {
      console.error(error);
    }
  };

  const recharge = async () => {
    handleMint(wallet);
  };

  const cashTap = async () => {
    if (
      parseInt(localStorage.getItem("balance")) > 0 &&
      localStorage.getItem("address")
    ) {
      const token = await handleSwapSend();
      try {
        addDoc(collection(database, "tokens"), { token: token });
      } catch (error) {
        console.error("Error storing token in Firestore: ", error);
      }
    }
  };
  return {
    formData,
    setFormData,

    wallet,
    balance,
    handleSetMint,
    handleMint,
    handleSwapSend,
    recharge,
    cashTap,
    lightningAddress,
  };
};
