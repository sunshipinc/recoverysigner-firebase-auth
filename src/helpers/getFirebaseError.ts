import { t } from "@lingui/core/macro";
import { type AuthError } from "firebase/auth";

export function getFirebaseError(error: unknown) {
  if ((window as any).Sentry) {
    (window as any).Sentry.captureException(
      error instanceof Error ? error : new Error(String(error)),
    );
  }

  if (isAuthError(error)) {
    switch (error.code) {
      case "auth/missing-verification-code":
      case "auth/invalid-verification-code":
        return t`The confirmation code you provided is invalid.`;

      case "auth/missing-phone-number":
      case "auth/invalid-phone-number":
        return t`Please provide a valid phone number.`;

      case "auth/too-many-requests":
        return t`You’ve tried to do that too many times. Please
      wait a while and try again!`;

      case "auth/popup-closed-by-user":
        return t`Please fill out the captcha to proceed.`;

      case "auth/email-already-in-use":
        return t`This email is already in use. Please use another one.`;

      case "auth/network-request-failed":
        return t`There was a network connectivity issue. Please try again.`;

      // These errors are "retry later" ones
      // but don't track these!
      case "auth/session-expired":
      case "auth/app-not-authorized":
      case "auth/retry-phone-auth":
        return t`Oops! Please try again in a few minutes. (error code: ${error.code})`;

      // Track error codes we don't know
      // (includes auth/app-not-authorized and auth/unknown)
      default:
        return t`Oops! Please try again in a few minutes. (error code: ${error.code})`;
    }
  }
}

function isAuthError(error: unknown): error is AuthError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as AuthError).code === "string"
  );
}
