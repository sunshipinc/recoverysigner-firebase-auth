import * as Sentry from "@sentry/browser";
import { t } from "@lingui/core/macro";

import { generateId } from "helpers/generateId";
import { TIMEOUT_ERROR_CODE } from "helpers/withTimeout";
import { AppError } from "types/AppError";

export type AuthFlow =
  | "send-verification-code"
  | "confirm-verification-code"
  | "send-verification-email"
  | "confirm-verification-email";

// Expected user actions or user-side conditions with a self-explanatory
// message and nothing for us to fix, not worth a Sentry event
const UNREPORTED_ERROR_CODES = [
  "auth/popup-closed-by-user",
  "auth/missing-verification-code",
  "auth/invalid-verification-code",
  "auth/code-expired",
  "auth/session-expired",
  "auth/too-many-requests",
  "auth/email-already-in-use",
  "auth/invalid-action-code",
  "auth/expired-action-code",
  "auth/network-request-failed",
];

// Reports `error` to Sentry and returns an AppError with a user-facing,
// actionable message and a reference ID the user can share with support.
export function getFirebaseError(error: unknown, flow: AuthFlow): AppError {
  const code = getErrorCode(error);
  const referenceId = reportError(error, flow, code);

  return new AppError(getMessage(code), { code, referenceId });
}

function getMessage(code: string | undefined): string {
  switch (code) {
    case "auth/missing-verification-code":
    case "auth/invalid-verification-code":
      return t`The code you entered is incorrect. Check the SMS and enter the 6-digit code again, or tap Resend to get a new code.`;

    case "auth/code-expired":
    case "auth/session-expired":
      return t`This code has expired. Tap Resend to get a new code.`;

    case "auth/missing-phone-number":
    case "auth/invalid-phone-number":
      return t`This phone number isn’t valid. Go back and check that your phone number is correct.`;

    case "auth/too-many-requests":
      return t`Too many attempts. Please wait a few minutes before trying again.`;

    case "auth/quota-exceeded":
      return t`We can’t send verification codes right now. Please try again in a few hours.`;

    case "auth/popup-closed-by-user":
    case "auth/captcha-check-failed":
      return t`We couldn’t complete the security check. Please try again and complete the challenge if one appears.`;

    case "auth/email-already-in-use":
      return t`This email is already in use. Please use another one.`;

    case "auth/invalid-action-code":
    case "auth/expired-action-code":
      return t`This sign-in link is invalid or has expired. Go back and request a new link.`;

    case "auth/network-request-failed":
      return t`We couldn’t connect. Check your internet connection and try again.`;

    case TIMEOUT_ERROR_CODE:
      return t`This is taking longer than expected. Check your internet connection and try again.`;

    // "Retry later" errors (auth/app-not-authorized, auth/retry-phone-auth,
    // auth/internal-error...) and anything we don't know about.
    default:
      return t`We couldn’t complete this step. Please try again in a few minutes. If it keeps happening, contact support with the reference below.`;
  }
}

function reportError(
  error: unknown,
  flow: AuthFlow,
  code: string | undefined,
): string | undefined {
  if (!Sentry.getClient() || (code && UNREPORTED_ERROR_CODES.includes(code))) {
    return undefined;
  }

  const referenceId = generateId();

  Sentry.captureException(
    error instanceof Error ? error : new Error(String(error)),
    {
      tags: {
        flow,
        error_code: code ?? "unknown",
        reference_id: referenceId,
      },
    },
  );

  return referenceId;
}

function getErrorCode(error: unknown): string | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return undefined;
}
