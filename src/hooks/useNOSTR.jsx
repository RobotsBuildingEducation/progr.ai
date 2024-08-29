import { useState, useEffect } from "react";

import NDK, {
  NDKPrivateKeySigner,
  NDKKind,
  NDKEvent,
} from "@nostr-dev-kit/ndk";

import { Buffer } from "buffer";
import { bech32 } from "bech32";
import { getPublicKey, nip19 } from "nostr-tools";

export const useSharedNostr = (initialNpub, initialNsec) => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [nostrPubKey, setNostrPubKey] = useState(initialNpub || "");
  const [nostrPrivKey, setNostrPrivKey] = useState(initialNsec || "");

  useEffect(() => {
    // Load keys from local storage if they exist
    const storedNpub = localStorage.getItem("local_npub");
    const storedNsec = localStorage.getItem("local_nsec");

    if (storedNpub) {
      console.log("storing key", storedNpub);
      setNostrPubKey(storedNpub);
    }

    if (storedNsec) {
      console.log("storing key");
      setNostrPrivKey(storedNsec);
    }
  }, []);

  const generateNostrKeys = async (userDisplayName = null) => {
    const privateKeySigner = NDKPrivateKeySigner.generate();

    const privateKey = privateKeySigner.privateKey;
    const user = await privateKeySigner.user();

    const publicKey = user.npub;

    const encodedNsec = bech32.encode(
      "nsec",
      bech32.toWords(Buffer.from(privateKey, "hex"))
    );
    const encodedNpub = bech32.encode(
      "npub",
      bech32.toWords(Buffer.from(publicKey, "hex"))
    );

    setNostrPrivKey(encodedNsec);
    setNostrPubKey(publicKey);

    console.log("encded npub", encodedNpub);
    console.log("user.npub", publicKey);

    if (!localStorage.getItem("local_nsec")) {
      postNostrContent(
        JSON.stringify({
          name: userDisplayName,
          about: "A student onboarded with Robots Building Education",
        }),
        0,
        publicKey,
        encodedNsec
      );
    }

    localStorage.setItem("local_nsec", encodedNsec);
    localStorage.setItem("local_npub", publicKey);
    localStorage.setItem("uniqueId", publicKey);

    return { npub: publicKey, nsec: encodedNsec };
  };

  const connectToNostr = async (npubRef = null, nsecRef = null) => {
    const defaultNsec = import.meta.env.VITE_GLOBAL_NOSTR_NSEC;
    const defaultNpub =
      "npub1mgt5c7qh6dm9rg57mrp89rqtzn64958nj5w9g2d2h9dng27hmp0sww7u2v";

    const nsec = nsecRef || nostrPrivKey || defaultNsec;
    const npub = npubRef || nostrPubKey || defaultNpub;

    console.log("nsec ent", nsec);
    console.log("npub ent", npub);

    try {
      // Decode the nsec from Bech32
      const { words: nsecWords } = bech32.decode(nsec);
      const hexNsec = Buffer.from(bech32.fromWords(nsecWords)).toString("hex");

      // Decode the npub from Bech32
      const { words: npubWords } = bech32.decode(npub);
      const hexNpub = Buffer.from(bech32.fromWords(npubWords)).toString("hex");

      // Create a new NDK instance
      const ndkInstance = new NDK({
        explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net"],
      });

      // Connect to the relays
      await ndkInstance.connect();

      setIsConnected(true);

      // Return the connected NDK instance and signer
      return { ndkInstance, hexNpub, signer: new NDKPrivateKeySigner(hexNsec) };
    } catch (err) {
      console.error("Error connecting to Nostr:", err);
      setErrorMessage(err.message);
      return null;
    }
  };

  const auth = async (nsecPassword) => {
    console.log("nsecPassword is running..", nsecPassword);

    let testnsec = nsecPassword;

    let decoded = nip19.decode(testnsec);

    const pubkey = getPublicKey(decoded.data);

    const ndk = new NDK({
      explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net"],
    });

    let user = ndk.getUser({ pubkey: pubkey });

    setNostrPrivKey(testnsec);
    setNostrPubKey(user.npub);

    localStorage.setItem("local_nsec", testnsec);
    localStorage.setItem("local_npub", user.npub);
    localStorage.setItem("uniqueId", user.npub);
  };

  const postNostrContent = async (
    content,
    kind = NDKKind.Text,
    npubRef = null,
    nsecRef = null
  ) => {
    const connection = await connectToNostr(npubRef, nsecRef);
    if (!connection) return;

    const { ndkInstance, hexNpub, signer } = connection;

    console.log("x", hexNpub);
    // Create a new note event
    const noteEvent = new NDKEvent(ndkInstance, {
      kind,
      tags: [],
      content: content,
      created_at: Math.floor(Date.now() / 1000),
      pubkey: hexNpub,
    });

    // Sign the note event

    try {
      await noteEvent.sign(signer);
    } catch (error) {}

    // Publish the note event
    try {
      await noteEvent.publish();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getHexNPub = (npub) => {
    // Decode the npub from Bech32
    const { words: npubWords } = bech32.decode(npub);
    const hexNpub = Buffer.from(bech32.fromWords(npubWords)).toString("hex");

    return hexNpub;
  };

  const assignExistingBadgeToNpub = async (
    badgeNaddr,
    awardeeNpub = localStorage.getItem("local_npub"), // The public key of the user being awarded
    ownerNsec = import.meta.env.SECRET_KEY // Your private key to sign the event
  ) => {
    if (!awardeeNpub) {
      console.error("Awardee public key is required to award the badge.");
      return;
    }

    if (!ownerNsec) {
      console.error(
        "Owner's private key is required to sign the badge award event."
      );
      return;
    }

    // Connect to Nostr as the badge owner
    const connection = await connectToNostr(
      "npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt",
      ownerNsec
    );
    if (!connection) return;

    const { ndkInstance, signer } = connection;

    // Create the event for awarding the badge
    const badgeAwardEvent = new NDKEvent(ndkInstance, {
      kind: NDKKind.BadgeAward, // Badge Award event kind
      tags: [
        ["a", badgeNaddr], // Reference to the Badge Definition event
        [
          "p",
          //npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt
          getHexNPub(localStorage.getItem("local_npub")),
        ], // Public key of the awardee
      ],
      created_at: Math.floor(Date.now() / 1000),
      //npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt
      pubkey: getHexNPub(
        "npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt"
      ),
      // Your public key as the issuer
    });

    // Sign the badge event
    try {
      await badgeAwardEvent.sign(signer);
    } catch (error) {
      console.error("Error signing badge event:", error);
    }

    // Publish the badge event
    try {
      await badgeAwardEvent.publish();
      console.log("Badge awarded successfully to:", awardeeNpub);
    } catch (error) {
      console.error("Error publishing badge event:", error);
    }
  };

  return {
    isConnected,
    errorMessage,
    nostrPubKey,
    nostrPrivKey,
    generateNostrKeys,
    postNostrContent,
    auth,
    assignExistingBadgeToNpub,
  };
};
