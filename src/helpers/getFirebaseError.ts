import { AuthError } from "firebase/auth";
import { i18n } from "config/i18n";

export function getFirebaseError(error: unknown): string {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  if ((window as any).Sentry) {
    (window as any).Sentry.captureException(
      error instanceof Error ? error : new Error(String(error)),
    );
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (isAuthError(error)) {
    switch (error.code) {
      case "auth/missing-verification-code":
      case "auth/invalid-verification-code":
        return i18n._(`The confirmation code you provided is invalid.`);

      case "auth/missing-phone-number":
      case "auth/invalid-phone-number":
        return i18n._(`Please provide a valid phone number.`);

      case "auth/too-many-requests":
        return i18n._(
          `You've tried to do that too many times. Please wait a while and try again!`,
        );

      case "auth/popup-closed-by-user":
        return i18n._(`Please fill out the captcha to proceed.`);

      case "auth/email-already-in-use":
        return i18n._(`This email is already in use. Please use another one.`);

      case "auth/network-request-failed":
        return i18n._(
          `There was a network connectivity issue. Please try again.`,
        );

      case "auth/session-expired":
      case "auth/app-not-authorized":
      case "auth/retry-phone-auth":
        return i18n._(
          `Oops! Please try again in a few minutes. (error code: ${error.code})`,
        );

      default:
        return i18n._(
          `Oops! Please try again in a few minutes. (error code: ${error.code})`,
        );
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return `An unknown error occurred: ${String(error)}`;
}

function isAuthError(error: unknown): error is AuthError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as AuthError).code === "string"
  );
}
