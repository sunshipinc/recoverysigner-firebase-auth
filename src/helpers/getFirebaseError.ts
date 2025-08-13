import { i18n } from "@lingui/core";
import { FirebaseError } from "firebase/app";
import { type AuthError } from "firebase/auth";

export function getFirebaseError(error: AuthError | Error | unknown) {
  if (!(error instanceof FirebaseError) && !(error instanceof Error)) {
    if ((window as any).Sentry) {
      (window as any).Sentry.captureException(new Error(JSON.stringify(error)));
    }
    return JSON.stringify(error);
  }

  if (!("code" in error)) {
    if ((window as any).Sentry) {
      (window as any).Sentry.captureException(new Error(error.toString()));
    }
    return error.toString();
  }

  if ((window as any).Sentry) {
    (window as any).Sentry.captureException(
      new Error(`${error.code}: ${error.message}`),
    );
  }

  switch (error.code) {
    case "auth/missing-verification-code":
    case "auth/invalid-verification-code":
      return i18n._(`The confirmation code you provided is invalid.`);

    case "auth/missing-phone-number":
    case "auth/invalid-phone-number":
      return i18n._(`Please provide a valid phone number.`);

    case "auth/too-many-requests":
      return i18n._(`You’ve tried to do that too many times. Please
      wait a while and try again!`);

    case "auth/popup-closed-by-user":
      return i18n._(`Please fill out the captcha to proceed.`);

    case "auth/email-already-in-use":
      return i18n._(`This email is already in use. Please use another one.`);

    case "auth/network-request-failed":
      return i18n._(
        `There was a network connectivity issue. Please try again.`,
      );

    // These errors are "retry later" ones
    // but don't track these!
    case "auth/session-expired":
    case "auth/app-not-authorized":
    case "auth/retry-phone-auth":
      return i18n._(`Oops! Please try again in a few minutes.
      (error code: ${error.code})`);

    // Track error codes we don't know
    // (includes auth/app-not-authorized and auth/unknown)
    default:
      return i18n._(`Oops! Please try again in a few minutes.
      (error code: ${error.code})`);
  }
}
