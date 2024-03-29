import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { CounterContextProvider } from "./contexts/CountContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
