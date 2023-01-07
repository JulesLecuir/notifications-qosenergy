import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/public-sans";
import "@fontsource/public-sans/500.css";
import {deepmerge} from "@mui/utils";
import {experimental_extendTheme as extendMuiTheme} from "@mui/material/styles";
import colors from "@mui/joy/colors";
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
  StyledEngineProvider,
} from "@mui/joy/styles";
import {CssBaseline} from "@mui/joy";

/**
 * Some logic needed to use Material UI and Joy UI components together in the same app.
 */
const muiTheme = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using
  // `CssVarsProvider` from Joy UI.
  cssVarPrefix: "joy",
  colorSchemes: {
    light: {
      palette: {
        background: {
          appBody: "var(--joy-palette-neutral-50)",
        },
        primary: {
          main: colors.blue[500],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        background: {
          appBody: "var(--joy-palette-neutral-900)",
        },
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});
const joyTheme = extendJoyTheme();
const theme = deepmerge(muiTheme, joyTheme);

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
