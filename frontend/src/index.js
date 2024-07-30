import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ChakraProvider,
  ColorModeScript,
  theme,
  CSSReset,
} from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ColorModeScript initialColorMode="dark" />
      <App />
    </ChakraProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
