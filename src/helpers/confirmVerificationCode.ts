import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";

import { auth } from "config/firebase";
import {
  confirmVerificationCode as action,
  CONFIRM_VERIFICATION_CODE,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
import { getFirebaseError } from "helpers/getFirebaseError";
import { StatusType } from "types/Status";
import type { AppDispatch } from "ducks/store";

interface ConfirmVerificationCodeParams {
  verificationId: string;
  verificationCode: string;
  dispatch: AppDispatch;
}

export async function confirmVerificationCode({
  verificationId,
  verificationCode,
  dispatch,
}: ConfirmVerificationCodeParams) {
  const setStatus = buildStatus(CONFIRM_VERIFICATION_CODE, dispatch);
  setStatus(StatusType.loading);

  const credential = PhoneAuthProvider.credential(
    verificationId,
    verificationCode,
  );

  try {
    const authRequest = await signInWithCredential(auth(), credential);
    const idToken = await authRequest.user!.getIdToken();

    dispatch(action({ idToken }));
    setStatus(StatusType.success);
  } catch (error) {
    const message = getFirebaseError(error);

    setStatus(StatusType.error, new Error(message));
  }
}
