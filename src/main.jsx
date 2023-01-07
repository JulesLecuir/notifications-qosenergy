import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/public-sans";
import "@fontsource/public-sans/500.css";
import {CssVarsProvider, StyledEngineProvider} from "@mui/joy/styles";
import {CssBaseline} from "@mui/joy";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider>
      <CssVarsProvider disableTransitionOnChange theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
