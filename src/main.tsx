import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BuddyPlayProvider } from "./utils/context/playWithBuddyContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BuddyPlayProvider>
      <App />
    </BuddyPlayProvider>
  </React.StrictMode>
);
