import { useState, useEffect } from "react";

import NDK, {
  NDKPrivateKeySigner,
  NDKEvent,
  NDKKind,
} from "@nostr-dev-kit/ndk";
import { nip19, getPublicKey } from "nostr-tools";

import { Buffer } from "buffer";
import { bech32 } from "bech32";

export const useNOSTR = (initialPublicKey, initialPrivateKey) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [publicKey, setPublicKey] = useState(initialPublicKey || "");
  const [privateKey, setPrivateKey] = useState(initialPrivateKey || "");

  useEffect(() => {
    const storedPublicKey = localStorage.getItem("local_publicKey");
    const storedPrivateKey = localStorage.getItem("local_privateKey");

    if (storedPublicKey) {
      setPublicKey(storedPublicKey);
    }

    if (storedPrivateKey) {
      setPrivateKey(storedPrivateKey);
    }
  }, []);

  const generateKeys = async (userName = null) => {
    const privateKeySigner = NDKPrivateKeySigner.generate();

    const generatedPrivateKey = privateKeySigner.privateKey;
    const user = await privateKeySigner.user();

    const generatedPublicKey = user.npub;

    const encodedPrivateKey = bech32.encode(
      "nsec",
      bech32.toWords(Buffer.from(generatedPrivateKey, "hex"))
    );

    const encodedPublicKey = bech32.encode(
      "npub",
      bech32.toWords(Buffer.from(generatedPublicKey, "hex"))
    );

    setPrivateKey(encodedPrivateKey);
    setPublicKey(encodedPublicKey);

    if (!localStorage.getItem("local_nsec")) {
      publishEvent(
        JSON.stringify({
          name: userName,
          about: "A student onboarded with Robots Building Education",
        }),
        0,
        generatedPublicKey,
        encodedPrivateKey
      );
    }

    localStorage.setItem("local_privateKey", encodedPrivateKey);
    localStorage.setItem("local_publicKey", generatedPublicKey);

    return { publicKey: generatedPublicKey, privateKey: encodedPrivateKey };
  };

  const connect = async (
    overridePublicKey = null,
    overridePrivateKey = null
  ) => {
    const privateKeyToUse = overridePrivateKey || privateKey;
    const publicKeyToUse = overridePublicKey || publicKey;

    try {
      const { words: privateKeyWords } = bech32.decode(privateKeyToUse);
      const hexPrivateKey = Buffer.from(
        bech32.fromWords(privateKeyWords)
      ).toString("hex");

      const { words: publicKeyWords } = bech32.decode(publicKeyToUse);
      const hexPublicKey = Buffer.from(
        bech32.fromWords(publicKeyWords)
      ).toString("hex");

      const ndkInstance = new NDK({
        explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net"],
      });

      await ndkInstance.connect();

      setIsConnected(true);

      return {
        ndkInstance,
        hexPublicKey,
        signer: new NDKPrivateKeySigner(hexPrivateKey),
      };
    } catch (err) {
      console.error("Error connecting to Nostr:", err);
      setError(err.message);
      return null;
    }
  };

  const authenticate = async (providedPrivateKey) => {
    let decoded = nip19.decode(providedPrivateKey);

    console.log("decoded", decoded);

    const userPublicKey = getPublicKey(decoded.data);

    console.log("user public key", userPublicKey);

    const ndkInstance = new NDK({
      explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net"],
    });
    await ndkInstance.connect();

    let user = await ndkInstance.getUser({ pubkey: userPublicKey });
    // let awaitedUsed = await ndkInstance.getUser({ pubkey: userPublicKey });

    console.log("user", user);
    console.log(user.npub);
    console.log("userporfile", user.profile);
    // let test = user
    //   .fetchProfile()
    //   .then((response) => console.log("response", response));
    const me = await ndkInstance.getUser({
      npub: user.npub,
    });

    let profile = await me.fetchProfile();
    console.log("profile", profile);

    setPrivateKey(providedPrivateKey);
    setPublicKey(user.npub);

    localStorage.setItem("local_privateKey", providedPrivateKey);
    localStorage.setItem("local_publicKey", user.npub);
  };

  const publishEvent = async (
    content,
    eventKind = NDKKind.Text,
    overridePublicKey = null,
    overridePrivateKey = null
  ) => {
    const connection = await connect(overridePublicKey, overridePrivateKey);
    if (!connection) return;

    const { ndkInstance, hexPublicKey, signer } = connection;

    const noteEvent = new NDKEvent(ndkInstance, {
      kind: eventKind,
      tags: [],
      content: content,
      created_at: Math.floor(Date.now() / 1000),
      pubkey: hexPublicKey,
    });

    await noteEvent.sign(signer);

    await noteEvent.publish();
  };

  return {
    isConnected,
    error,
    publicKey,
    privateKey,
    generateKeys,
    publishEvent,
    authenticate,
  };
};
