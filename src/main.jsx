import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import { AppWrapper } from "./App.jsx";
// localStorage.clear();
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <AppWrapper />
  </ChakraProvider>
);
