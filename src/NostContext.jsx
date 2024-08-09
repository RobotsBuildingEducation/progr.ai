// NostrContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSharedNostr } from "./hooks/useNOSTR";

const NostrContext = createContext();

export const NostrProvider = ({ children }) => {
  const nostr = useSharedNostr();
  const [ndkInstance, setNdkInstance] = useState(null);

  useEffect(() => {
    const connect = async () => {
      const connection = await nostr.connectToNostr();
      if (connection) {
        setNdkInstance(connection.ndkInstance);
      }
    };
    connect();
  }, []);

  return (
    <NostrContext.Provider value={{ ...nostr, ndkInstance }}>
      {children}
    </NostrContext.Provider>
  );
};

export const useNostr = () => {
  return useContext(NostrContext);
};
