import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { SessionProvider } from "./contexts/SessionProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SessionProvider>
      <App />
    </SessionProvider>
  </BrowserRouter>
);
