import { create } from "zustand";
import { CashuMint, CashuWallet, getEncodedToken } from "@cashu/cashu-ts";
import { addDoc, collection } from "firebase/firestore";
import { database } from "./database/firebaseResources";

const useCashuStore = create((set, get) => ({
  proofs: JSON.parse(localStorage.getItem("proofs")) || [],
  balance: parseInt(localStorage.getItem("balance")) || 0,
  wallet: null,
  cashuToken: null,
  lightningAddress: "",
  formData: JSON.parse(localStorage.getItem("formData")) || {
    mintUrl: "https://stablenut.umint.cash",
    mintAmount: "25",
    meltInvoice: "",
    swapAmount: "1",
    swapToken: "",
  },

  // Load wallet and mint data from localStorage
  loadWallet: () => {
    const mintData = JSON.parse(localStorage.getItem("mint"));
    if (mintData) {
      const { url, keyset } = mintData;
      const mint = new CashuMint(url);
      const wallet = new CashuWallet(mint, { keys: keyset, unit: "sat" });
      set({ wallet });
    } else {
      get().setMint();
    }
  },
  // Load wallet and proofs from localStorage when app initializes
  loadProofs: () => {
    const storedProofs = JSON.parse(localStorage.getItem("proofs"));
    if (storedProofs) {
      const initialBalance = storedProofs.reduce(
        (total, proof) => total + proof.amount,
        0
      );
      localStorage.setItem("balance", initialBalance);
      set({ proofs: storedProofs, balance: initialBalance });
    }
  },

  // Add proofs and update balance and localStorage
  addProofs: (newProofs) => {
    const { proofs } = get();
    const updatedProofs = [...proofs, ...newProofs];
    const newBalance = updatedProofs.reduce(
      (total, proof) => total + proof.amount,
      0
    );

    localStorage.setItem("proofs", JSON.stringify(updatedProofs));
    localStorage.setItem("balance", newBalance);

    set({ proofs: updatedProofs, balance: newBalance });
  },

  // Remove proofs and update balance and localStorage
  removeProofs: (proofsToRemove) => {
    const { proofs } = get();
    if (!proofsToRemove) return;

    const updatedProofs = proofs.filter(
      (proof) => !proofsToRemove.includes(proof)
    );
    const newBalance = updatedProofs.reduce(
      (total, proof) => total + proof.amount,
      0
    );

    localStorage.setItem("proofs", JSON.stringify(updatedProofs));
    localStorage.setItem("balance", newBalance);

    set({ proofs: updatedProofs, balance: newBalance });
  },

  // Get proofs by amount, with optional keysetId filtering
  getProofsByAmount: (amount, keysetId = undefined) => {
    const { proofs } = get();
    const result = [];
    let sum = 0;

    let proofSet = proofs || JSON.parse(localStorage.getItem("proofs"));

    for (const proof of proofSet) {
      if (sum >= amount) break;
      if (keysetId && proof.id !== keysetId) continue;
      result.push(proof);
      sum += proof.amount;
    }

    return result.length > 0 && sum >= amount ? result : [];
  },

  // Set formData and persist it in localStorage
  setFormData: (newFormData) => {
    localStorage.setItem("formData", JSON.stringify(newFormData));
    set({ formData: newFormData });
  },

  // Initialize wallet and save it to localStorage
  setMint: async () => {
    const { formData } = get();
    const mint = new CashuMint(formData.mintUrl);

    try {
      const { keysets } = await mint.getKeys();
      const satKeyset = keysets.find((k) => k.unit === "sat");
      const wallet = new CashuWallet(mint, { keys: satKeyset, unit: "sat" });

      localStorage.setItem(
        "mint",
        JSON.stringify({ url: formData.mintUrl, keyset: satKeyset })
      );
      set({ wallet });
      get().mintTokens(); // Automatically mint tokens after mint is set
    } catch (error) {
      console.error(error);
    }
  },

  // Mint tokens and update proofs
  mintTokens: async () => {
    const { wallet, formData, addProofs } = get();
    if (wallet) {
      const amount = parseInt(formData.mintAmount);
      const quote = await wallet.getMintQuote(amount);

      localStorage.setItem("address", quote.request);
      set({ lightningAddress: quote.request });

      let count = 0;
      const intervalId = setInterval(async () => {
        try {
          const { proofs } = await wallet.mintTokens(amount, quote.quote, {
            keysetId: wallet.keys.id,
          });
          addProofs(proofs);
          clearInterval(intervalId);
        } catch (error) {
          count++;
          if (count === 36) clearInterval(intervalId); // Stop after 3 minutes
          console.error("Quote not paid yet: ", error);
        }
      }, 5000);
    }
  },

  // Swap and update proofs
  handleSwapSend: async () => {
    const { wallet, formData, getProofsByAmount, addProofs, removeProofs } =
      get();
    const swapAmount = parseInt(formData.swapAmount);
    const proofs = getProofsByAmount(swapAmount);

    if (proofs.length === 0) {
      alert("Insufficient balance");
      return;
    }

    console.log("wallet", wallet);
    console.log("proofs", proofs);
    try {
      const { send, returnChange } = await wallet.send(swapAmount, proofs);
      const encodedToken = getEncodedToken({
        token: [{ proofs: send, mint: wallet.mint.mintUrl }],
      });

      removeProofs(proofs);
      addProofs(returnChange);

      set({ cashuToken: encodedToken });
      return encodedToken;
    } catch (error) {
      console.error(error);
    }
  },

  // Recharge wallet
  recharge: async () => {
    get().mintTokens();
  },

  // Cash tap and store token in Firestore
  cashTap: async () => {
    const { balance, handleSwapSend } = get();
    if (balance > 0 && localStorage.getItem("address")) {
      const token = await handleSwapSend();
      try {
        await addDoc(collection(database, "tokens"), { token });
      } catch (error) {
        console.error("Error storing token in Firestore: ", error);
      }
    }
  },
}));

export default useCashuStore;
