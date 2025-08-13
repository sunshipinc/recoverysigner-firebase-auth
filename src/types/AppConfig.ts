import { RecaptchaVerifier } from "firebase/auth";

export interface DynamicLinkSettings {
  dynamicLinkDomain: string;
  url: string;
  android: { installApp: boolean; packageName: string };
  iOS: { bundleId: string };
  handleCodeInApp: true;
}

export interface AppConfig {
  // required for 'auth with phone'
  phoneNumber?: string;

  // required for 'auth with email'
  email?: string;
  dynamicLinkSettings?: DynamicLinkSettings;

  // required for 'confirm auth with email'
  signInLink?: string;

  recaptchaVerifier: RecaptchaVerifier;

  // accepts both "en" and "en-US" formats
  language: string;
}
