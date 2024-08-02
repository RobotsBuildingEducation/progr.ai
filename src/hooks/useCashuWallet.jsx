import { CashuMint } from "@cashu/cashu-ts/src/CashuMint";
import { CashuWallet } from "@cashu/cashu-ts/src/CashuWallet";
import { getEncodedToken } from "@cashu/cashu-ts/src/utils";
import React, { useState, useEffect } from "react";

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
    if (!proofs) return;
    localStorage.setItem("proofs", JSON.stringify(proofs));
    const newBalance = proofs.reduce((total, proof) => total + proof.amount, 0);
    localStorage.setItem("balance", newBalance);
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
    let sum = 0;

    for (const proof of proofs) {
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

export const useCashuWallet = (isUnactivated, isModalOpen) => {
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
    const amount = parseInt(formData.mintAmount);
    let w = wallet || walletRef;
    const quote = await w.getMintQuote(amount);

    localStorage.setItem("address", quote.request);

    let count = 0;
    const intervalId = setInterval(async () => {
      try {
        if (count === 5) {
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
  };

  const handleSwapSend = async () => {
    const swapAmount = parseInt(formData.swapAmount);
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
      return encodedToken;
    } catch (error) {
      console.error(error);
    }
  };

  const recharge = async () => {
    handleMint(wallet);
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
  };
};
