import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { AppWrapper } from "./App.jsx";
// localStorage.clear();
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
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <AppWrapper />
  </ChakraProvider>
);
