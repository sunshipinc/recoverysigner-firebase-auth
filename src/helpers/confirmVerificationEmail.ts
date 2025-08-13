import { signInWithEmailLink } from "firebase/auth";

import { auth } from "config/firebase";
import {
  confirmVerificationEmail as action,
  CONFIRM_VERIFICATION_EMAIL,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
import { getFirebaseError } from "helpers/getFirebaseError";
import { StatusType } from "types/Status";
import type { AppDispatch } from "ducks/store";

interface ConfirmVerificationEmailParams {
  verificationUrl: string;
  verificationEmail: string;
  dispatch: AppDispatch;
}

export async function confirmVerificationEmail({
  verificationUrl,
  verificationEmail,
  dispatch,
}: ConfirmVerificationEmailParams) {
  const setStatus = buildStatus(CONFIRM_VERIFICATION_EMAIL, dispatch);
  setStatus(StatusType.loading);

  try {
    const authRequest = await signInWithEmailLink(
      auth(),
      verificationEmail,
      verificationUrl,
    );
    const idToken = await authRequest.user!.getIdToken();

    dispatch(action({ idToken }));
    setStatus(StatusType.success);
  } catch (error) {
    const message = getFirebaseError(error);

    setStatus(StatusType.error, new Error(message));
  }
}
