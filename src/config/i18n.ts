import { setupI18n } from "@lingui/core";

import { messages as en } from "locales/en/messages";
import { messages as es } from "locales/es/messages";
import { messages as esAR } from "locales/es-AR/messages";
import { messages as fr } from "locales/fr/messages";
import { messages as pt } from "locales/pt/messages";
import { messages as uk } from "locales/uk/messages";
import { messages as ru } from "locales/ru/messages";

// Combine all catalogs into a single object
const catalogs = {
  en,
  es,
  "es-AR": esAR,
  fr,
  pt,
  uk,
  ru,
};

// Create the i18n instance
const i18n = setupI18n();

// Load all language catalogs into the i18n instance
Object.entries(catalogs).forEach(([locale, messages]) => {
  i18n.load(locale, messages);
});

// Set the default language
i18n.activate("en");

// Strings that need to be translated because they're being used on index.html
i18n._("Please update Android WebView to start the session.");
i18n._("Please update Google Chrome to start the session.");
i18n._(
  "Your device's browser is not compatible. Please update your browser and Vibrant to the latest version.",
);

export { catalogs, i18n };
