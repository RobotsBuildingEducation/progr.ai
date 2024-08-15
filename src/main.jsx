import React from "react";
import ReactDOM from "react-dom/client";
import { keyframes } from "@emotion/react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { AppWrapper } from "./App.jsx";
// localStorage.clear();

const gradientAnimation = keyframes`
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
const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        footer: {
          bg: "transparent",
        },
      },
    },
  },

  styles: {
    global: {
      body: {
        height: "100vh",
        background:
          "linear-gradient(270deg, #f0f0f0, #fcfcfc, #f0f0f0, #fcfcfc)", // Subtle gray and white gradient
        backgroundSize: "800% 800%",
        animation: `${gradientAnimation} 120s ease infinite`,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <AppWrapper />
  </ChakraProvider>
);
