import { useState } from "react";
import NDK, {
  NDKPrivateKeySigner,
  NDKEvent,
  NDKKind,
} from "@nostr-dev-kit/ndk";
import { Buffer } from "buffer";
import { bech32 } from "bech32";
import { getPublicKey } from "nostr-tools";

export const useNWC = () => {
  const [nwc, setNwc] = useState(null);
  const [nwcConnected, setNwcConnected] = useState(false);
  const [ndkInstance, setNdkInstance] = useState(null);
  const [zapPubKey, setZapPubKey] = useState(null);

  const connectToNostrViaNWC = async (nwcString) => {
    try {
      const url = new URL(nwcString);
      const relays = url.searchParams.getAll("relay");
      const secret = url.searchParams.get("secret");

      if (!secret) throw new Error("No secret found in the NWC string.");

      let hexNsec;
      try {
        const { words: secretWords } = bech32.decode(secret);
        hexNsec = Buffer.from(bech32.fromWords(secretWords)).toString("hex");
      } catch (e) {
        if (/^[0-9a-fA-F]+$/.test(secret)) {
          hexNsec = secret;
        } else {
          throw new Error("Invalid secret format.");
        }
      }

      const hexNpub = getPublicKey(hexNsec);

      const ndkInstance = new NDK({
        explicitRelayUrls: ["wss://relay.primal.net"],
      });
      await ndkInstance.connect();

      setZapPubKey(hexNpub);
      setNwc(secret);
      setNwcConnected(true);
      setNdkInstance(ndkInstance);

      localStorage.setItem("nwc", secret);
      return { success: true };
    } catch (err) {
      console.error("Error connecting via NWC:", err);
      return { success: false, error: err.message };
    }
  };

  const coinZap = async (amount, recipient) => {
    if (!nwcConnected) {
      console.error("NWC is not connected");
      return;
    }

    try {
      const zapEvent = new NDKEvent(ndkInstance, {
        kind: NDKKind.Zap,
        tags: [
          ["p", recipient],
          ["amount", amount.toString()],
        ],
        content: `Zap of ${amount} millisats to ${recipient}`,
        created_at: Math.floor(Date.now() / 1000),
        pubkey: zapPubKey,
      });

      await zapEvent.sign(new NDKPrivateKeySigner(nwc));
      await zapEvent.publish();
      console.log(`Zap of ${amount} sats sent to ${recipient}.`);
    } catch (err) {
      console.error("Error sending zap:", err);
    }
  };

  return {
    connectToNostrViaNWC,
    coinZap,
    nwcConnected,
  };
};
