import { RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";

import { auth } from "config/firebase";
import {
  SEND_VERIFICATION_CODE,
  sendVerificationCode as action,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
import { getFirebaseError } from "helpers/getFirebaseError";
import { withTimeout } from "helpers/withTimeout";
import { StatusType } from "types/Status";
import type { AppDispatch } from "ducks/store";

interface SendVerificationCodeParams {
  phoneNumber: string;
  dispatch: AppDispatch;
}

// Backstop for `verifyPhoneNumber` staying pending forever (reCAPTCHA blocked,
// failing to load, or its challenge dismissed, which Firebase never rejects).
// Long enough to solve an image challenge, short enough that the user isn't
// left on "Please wait…".
const SEND_CODE_TIMEOUT_MS = 60000;

let recaptchaVerifier: RecaptchaVerifier | null = null;

export async function sendVerificationCode({
  phoneNumber,
  dispatch,
}: SendVerificationCodeParams) {
  const setStatus = buildStatus(SEND_VERIFICATION_CODE, dispatch);
  setStatus(StatusType.loading);

  try {
    // Dispose of the previous widget before removing its container, otherwise
    // reCAPTCHA callbacks still fire against the detached element.
    // Null it first so a throwing `clear()` can't wedge every later retry.
    const previousRecaptchaVerifier = recaptchaVerifier;
    recaptchaVerifier = null;
    previousRecaptchaVerifier?.clear();

    // Always recreate #recaptcha so we don't have to deal with re-rendering
    // issues.
    const recaptchaContainer = document.createElement("div");
    recaptchaContainer.id = "recaptcha";

    const existingRecaptchaContainer = document.querySelector("#recaptcha")!;
    const parent = existingRecaptchaContainer.parentElement!;

    parent.insertBefore(recaptchaContainer, existingRecaptchaContainer);
    parent.removeChild(existingRecaptchaContainer);

    recaptchaVerifier = new RecaptchaVerifier(auth(), "recaptcha", {
      size: "invisible",
    });

    const provider = new PhoneAuthProvider(auth());

    const verificationId = await withTimeout(
      provider.verifyPhoneNumber(phoneNumber, recaptchaVerifier),
      SEND_CODE_TIMEOUT_MS,
    );

    dispatch(action({ provider, verificationId }));
    setStatus(StatusType.success);
  } catch (error) {
    setStatus(
      StatusType.error,
      getFirebaseError(error, "send-verification-code"),
    );
  }
}
