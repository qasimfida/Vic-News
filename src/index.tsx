import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NewsProvider } from "./context/NewsContext";
import { ModalProvider } from "./context/ModalContext";
import { RankedNewsProvider } from "./context/RankedNewsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NewsProvider>
      <ModalProvider>
        <RankedNewsProvider>
          <App />
        </RankedNewsProvider>
      </ModalProvider>
    </NewsProvider>
  </React.StrictMode>
);
