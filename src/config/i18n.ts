import { t } from "@lingui/core/macro";
import { i18n, type Messages } from "@lingui/core";

import { messages as en } from "locales/en/messages";
import { messages as es } from "locales/es/messages";
import { messages as esAR } from "locales/es-AR/messages";
import { messages as fr } from "locales/fr/messages";
import { messages as pt } from "locales/pt/messages";
import { messages as uk } from "locales/uk/messages";
import { messages as ru } from "locales/ru/messages";

export const messages: { [key: string]: Messages } = {
  en,
  es,
  "es-AR": esAR,
  fr,
  pt,
  uk,
  ru,
};

export const AVAILABLE_LOCALES = Object.keys(messages);

export function setLanguage(locale: string) {
  i18n.load(locale, messages[locale]);
  i18n.activate(locale);
}

setLanguage("en");

// Strings that need to be translated because they're being used on index.html
t`Please update Android WebView to start the session.`;
t`Please update Google Chrome to start the session.`;
t`Your device’s browser is not compatible. Please update your browser and Vibrant to the latest version.`;
