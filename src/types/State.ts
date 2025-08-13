import type { FirebaseOptions } from "firebase/app";
import { RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";
import type { DynamicLinkSettings } from "types/AppConfig";
import { Page } from "types/Page";
import type { Status } from "types/Status";

export interface State {
  phoneNumber?: string;

  email?: string;
  dynamicLinkSettings?: DynamicLinkSettings;

  signInLink?: string;

  currentPage: Page;
  appDidLoad: boolean;
  statuses: { [key: string]: Status };

  firebase: FirebaseOptions;
  recaptchaVerifier: RecaptchaVerifier;
  verificationId: string;
  provider: PhoneAuthProvider;
  idToken: string;
}
