import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { GlossaryProvider } from "./context/glossaryContext";

/* global document, Office */

let isOfficeInitialized = false;

const title = "Burrito translate";

const render = (Component: typeof App) => {
  createRoot(document.getElementById("container") as HTMLElement).render(
    <React.StrictMode>
      <FluentProvider theme={webLightTheme}>
        <GlossaryProvider>
          <Component title={title} isOfficeInitialized={isOfficeInitialized} />
        </GlossaryProvider>
      </FluentProvider>
    </React.StrictMode>
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  render(App);
});
