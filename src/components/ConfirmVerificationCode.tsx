import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Trans } from "@lingui/react/macro";

import { ErrorMessage } from "components/ErrorMessage";
import { type State } from "types/State";
import { confirmVerificationCode } from "helpers/confirmVerificationCode";
import { sendVerificationCode } from "helpers/sendVerificationCode";
import { useSendCodeCooldown } from "hooks/useSendCodeCooldown";
import { useStatus } from "hooks/useStatus";
import {
  CONFIRM_VERIFICATION_CODE,
  SEND_VERIFICATION_CODE,
} from "ducks/firebase";
import { resetStatus } from "ducks/status";
import { useAppDispatch } from "hooks/useAppDispatch";

export function ConfirmVerificationCode() {
  const dispatch = useAppDispatch();
  const [verificationCode, setVerificationCode] = useState("");
  const [hasRequestedResend, setHasRequestedResend] = useState(false);
  const { verificationId, idToken, phoneNumber, codeSentAt } = useSelector(
    (state: State) => state,
  );
  const confirmCodeStatus = useStatus(CONFIRM_VERIFICATION_CODE);
  const sendCodeStatus = useStatus(SEND_VERIFICATION_CODE);
  const isResending = hasRequestedResend && sendCodeStatus.isLoading;
  const cooldownSeconds = useSendCodeCooldown(codeSentAt);

  useEffect(() => {
    if (verificationCode.match(/^\d{6}$/)) {
      confirmVerificationCode({
        verificationCode,
        verificationId,
        dispatch,
      });
    }
  }, [verificationId, verificationCode, dispatch]);

  useEffect(() => {
    if (confirmCodeStatus.isSuccess) {
      window.postMessage(
        JSON.stringify({ type: "idToken", idToken }),
        window.location.origin,
      );
    }
  }, [confirmCodeStatus.isSuccess, idToken]);

  const handleResend = () => {
    // Clear the old code and its error so the new verificationId isn't checked
    // against a code that belongs to the previous SMS.
    setVerificationCode("");
    dispatch(resetStatus(CONFIRM_VERIFICATION_CODE));
    setHasRequestedResend(true);
    sendVerificationCode({ phoneNumber: phoneNumber ?? "", dispatch });
  };

  if (confirmCodeStatus.isSuccess) {
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
      <div>
        <p className="text-center">
          <Trans>We’ve sent you a verification code:</Trans>
        </p>

        <div style={{ height: 20 }} />

        <label>
          <input
            maxLength={6}
            autoComplete="one-time-code"
            inputMode="numeric"
            type="text"
            pattern="^\d{6}$"
            value={verificationCode}
            onChange={({ target: { value } }) => setVerificationCode(value)}
            disabled={confirmCodeStatus.isLoading || isResending}
          />
        </label>
      </div>

      {confirmCodeStatus.error && (
        <ErrorMessage error={confirmCodeStatus.error} />
      )}

      {hasRequestedResend && sendCodeStatus.error && (
        <ErrorMessage error={sendCodeStatus.error} />
      )}

      {hasRequestedResend &&
        sendCodeStatus.isSuccess &&
        !confirmCodeStatus.error && (
          <p className="success-message text-center" role="status">
            <Trans>We’ve sent you a new code.</Trans>
          </p>
        )}

      {!confirmCodeStatus.isLoading && (
        <>
          <div style={{ height: 30 }} />

          <p className="text-center">
            <button
              className="button-link"
              type="button"
              onClick={handleResend}
              disabled={isResending || cooldownSeconds > 0}
            >
              <span>
                {isResending ? (
                  <Trans>Sending a new code…</Trans>
                ) : cooldownSeconds > 0 ? (
                  <Trans>Resend in {cooldownSeconds}s</Trans>
                ) : (
                  <Trans>Resend</Trans>
                )}
              </span>
            </button>
          </p>
        </>
      )}
    </div>
  );
}
