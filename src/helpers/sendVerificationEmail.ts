import { sendSignInLinkToEmail } from "firebase/auth";

import { auth } from "config/firebase";
import {
  SEND_VERIFICATION_EMAIL,
  sendVerificationEmail as action,
} from "ducks/firebase";
import { buildStatus } from "helpers/buildStatus";
import { getFirebaseError } from "helpers/getFirebaseError";
import { type DynamicLinkSettings } from "types/AppConfig";
import { StatusType } from "types/Status";
import type { AppDispatch } from "ducks/store";

interface SendVerificationEmailParams {
  email: string;
  dynamicLinkSettings: DynamicLinkSettings;
  dispatch: AppDispatch;
}

let isSending = false;

export function sendVerificationEmail({
  email,
  dynamicLinkSettings,
  dispatch,
}: SendVerificationEmailParams) {
  if (isSending) {
    return;
  }

  isSending = true;

  const setStatus = buildStatus(SEND_VERIFICATION_EMAIL, dispatch);
  setStatus(StatusType.loading);

  sendSignInLinkToEmail(auth(), email, dynamicLinkSettings)
    .then(() => {
      dispatch(action());
      setStatus(StatusType.success);
      isSending = false;
    })
    .catch((error) => {
      const message = getFirebaseError(error);

      setStatus(StatusType.error, new Error(message));
      isSending = false;
    });
}
