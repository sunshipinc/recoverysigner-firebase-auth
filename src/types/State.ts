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
  // When the last SMS code was sent, used to rate-limit the Resend button.
  codeSentAt?: number;
  provider: PhoneAuthProvider;
  idToken: string;
  // When the last verification email was sent, used to rate-limit Resend.
  emailSentAt?: number;
}
