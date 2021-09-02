import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import { theme } from "emotionCSS/theme";
import GlobalCSS from "emotionCSS/global";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
