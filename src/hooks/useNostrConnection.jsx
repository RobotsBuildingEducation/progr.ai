import { useEffect, useState, useCallback } from "react";
import NDK from "@nostr-dev-kit/ndk";
import { Buffer } from "buffer";
import { bech32 } from "bech32";

const useNostrConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [ndkInstance, setNdkInstance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const connectToNostr = useCallback(async (npub, nsec) => {
    try {
      const { words: nsecWords } = bech32.decode(nsec);
      const hexNsec = Buffer.from(bech32.fromWords(nsecWords)).toString("hex");

      const { words: npubWords } = bech32.decode(npub);
      const hexNpub = Buffer.from(bech32.fromWords(npubWords)).toString("hex");

      const instance = new NDK({
        explicitRelayUrls: ["wss://relay.damus.io", "wss://relay.primal.net"],
      });

      await instance.connect();
      setNdkInstance(instance);
      setIsConnected(true);

      return { instance, hexNpub, hexNsec };
    } catch (err) {
      console.error("Error connecting to Nostr:", err);
      setErrorMessage(err.message);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!isConnected && ndkInstance) {
      const reconnect = async () => {
        try {
          await ndkInstance.connect();
          setIsConnected(true);
        } catch (error) {
          console.error("Reconnection failed", error);
          setTimeout(reconnect, 5000); // Retry after 5 seconds
        }
      };
      reconnect();
    }
  }, [isConnected, ndkInstance]);

  return { isConnected, ndkInstance, errorMessage, connectToNostr };
};

export default useNostrConnection;
