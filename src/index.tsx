import React from "react";
import { Provider } from "react-redux";
import { I18nProvider } from "@lingui/react";
import * as Sentry from "@sentry/browser";

import "./index.css";
import { initializeFirebase, auth } from "config/firebase";
import { App } from "components/App";
import { store } from "ducks/store";
import { determineLanguage } from "helpers/determineLanguage";
import { type AppConfig } from "types/AppConfig";
import { createRoot, type Root } from "react-dom/client";
import { i18n } from "config/i18n";

(window as any).Sentry = Sentry;

if ((window as any).APP_ENV) {
  Sentry.init({
    dsn: (window as any).APP_ENV.SENTRY_DSN,
  });
}

let root: Root | null = null;

(window as any).main = function main(config: AppConfig) {
  (window as any).wasInitted = true;

  const appEnv = (window as any).APP_ENV;
  const language = determineLanguage(config.language || "en");

  initializeFirebase({
    apiKey: appEnv.FIREBASE_WEB_API_KEY,
    projectId: appEnv.FIREBASE_PROJECT_ID,
  });

  auth().languageCode = language;

  i18n.activate(language);

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found in the DOM.");
  }

  if (!root) {
    root = createRoot(rootElement);
  }

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <I18nProvider i18n={i18n}>
          <App config={{ ...config }} />
        </I18nProvider>
      </Provider>
    </React.StrictMode>,
  );
};
