import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Trans } from "@lingui/react/macro";

import { type State } from "types/State";
import { confirmVerificationEmail } from "helpers/confirmVerificationEmail";
import { useStatus } from "hooks/useStatus";
import { CONFIRM_VERIFICATION_EMAIL } from "ducks/firebase";
import { useAppDispatch } from "hooks/useAppDispatch";

export function ConfirmVerificationEmail() {
  const dispatch = useAppDispatch();
  const { signInLink, email, idToken } = useSelector((state: State) => state);
  const confirmEmailStatus = useStatus(CONFIRM_VERIFICATION_EMAIL);

  useEffect(() => {
    if (signInLink && email) {
      confirmVerificationEmail({
        verificationUrl: signInLink,
        verificationEmail: email,
        dispatch,
      });
    }
  }, [signInLink, email, dispatch]);

  useEffect(() => {
    if (confirmEmailStatus.isSuccess) {
      window.postMessage(
        JSON.stringify({ type: "idToken", idToken }),
        window.location.origin,
      );
    }
  }, [confirmEmailStatus.isSuccess, idToken]);

  if (confirmEmailStatus.isSuccess) {
    return (
      <div className="panel">
        <p className="text-center">
          <Trans>You’ve been verified! Please wait.</Trans>
        </p>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="text-center">
        <p>
          <Trans>Please wait…</Trans>
        </p>
      </div>

      <div style={{ height: 30 }} />

      {confirmEmailStatus.error && (
        <p>
          <Trans>Error: {confirmEmailStatus.error.message}</Trans>
        </p>
      )}
    </div>
  );
}
