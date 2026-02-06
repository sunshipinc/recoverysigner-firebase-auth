import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Trans } from "@lingui/macro";

import { SEND_VERIFICATION_CODE } from "ducks/firebase";
import { setPage } from "ducks/page";
import { sendVerificationCode } from "helpers/sendVerificationCode";
import { useStatus } from "hooks/useStatus";
import { Page } from "types/Page";
import { type State } from "types/State";
import { useAppDispatch } from "hooks/useAppDispatch";

export function SendVerificationCode() {
  const appEnv = (window as any).APP_ENV;

  const dispatch = useAppDispatch();
  const sendCodeStatus = useStatus(SEND_VERIFICATION_CODE);
  const phoneNumber = useSelector((state: State) => state.phoneNumber ?? "");

  const handleSendVerification = () => {
    sendVerificationCode({ phoneNumber, dispatch });
  };

  useEffect(() => {
    if (sendCodeStatus.isSuccess) {
      dispatch(setPage(Page.confirmVerificationCode));
    }
  }, [sendCodeStatus.isSuccess, dispatch]);

  return (
    <div className="panel">
      <button
        className="button"
        style={{ backgroundColor: appEnv.BUTTON_COLOR }}
        onClick={handleSendVerification}
        disabled={
          !phoneNumber || sendCodeStatus.isLoading || sendCodeStatus.isSuccess
        }
      >
        <span>
          {sendCodeStatus.isLoading || sendCodeStatus.isSuccess ? (
            <Trans>Please wait…</Trans>
          ) : (
            <Trans>Send verification code</Trans>
          )}
        </span>
      </button>

      {sendCodeStatus.error && (
        <p>
          <Trans>Error: {sendCodeStatus.error.message}</Trans>
        </p>
      )}
    </div>
  );
}
