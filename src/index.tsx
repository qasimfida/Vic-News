import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NewsProvider } from "./context/NewsContext";
import { ModalProvider } from "./context/ModalContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NewsProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </NewsProvider>
  </React.StrictMode>
);
