import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trans } from "@lingui/macro";

import { State } from "types.d/State";
import { Page } from "types.d/Page";
import { confirmVerificationCode } from "helpers/confirmVerificationCode";
import { useStatus } from "hooks/useStatus";
import { CONFIRM_VERIFICATION_CODE } from "ducks/firebase";
import { setPage } from "ducks/page";

export function ConfirmVerificationCode() {
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState("");
  const { verificationId, idToken } = useSelector((state: State) => state);
  const confirmCodeStatus = useStatus(CONFIRM_VERIFICATION_CODE);

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
    dispatch(setPage(Page.sendVerificationCode));
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
            onChange={({ target: { value } }) => setVerificationCode(value)}
            disabled={confirmCodeStatus.isLoading}
          />
        </label>
      </div>

      {confirmCodeStatus.error && (
        <>
          <div style={{ height: 30 }} />

          <div>
            <p className="text-center">{confirmCodeStatus.error.toString()}</p>
          </div>
        </>
      )}

      {!confirmCodeStatus.isLoading && (
        <>
          <div style={{ height: 30 }} />

          <p className="text-center">
            <button
              className="button-link"
              type="button"
              onClick={handleResend}
            >
              <span>
                <Trans>Resend</Trans>
              </span>
            </button>
          </p>
        </>
      )}
    </div>
  );
}
