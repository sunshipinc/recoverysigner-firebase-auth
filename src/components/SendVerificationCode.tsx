import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Trans } from "@lingui/react/macro";
import { debounce } from "lodash";

import { SEND_VERIFICATION_CODE } from "ducks/firebase";
import { setPage } from "ducks/page";
import { sendVerificationCode } from "helpers/sendVerificationCode";
import { useStatus } from "hooks/useStatus";
import { Page } from "types/Page";
import { type State } from "types/State";
import { useAppDispatch } from "hooks/useAppDispatch";

const DELAY = 3000;

export function SendVerificationCode() {
  const appEnv = (window as any).APP_ENV;

  const dispatch = useAppDispatch();
  const sendCodeStatus = useStatus(SEND_VERIFICATION_CODE);
  const [isLoading, setIsLoading] = useState(true);
  const phoneNumber = useSelector((state: State) => state.phoneNumber ?? "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendVerificationCodeDebounce = useCallback(
    debounce(() => {
      if (phoneNumber) {
        sendVerificationCode({ phoneNumber, dispatch });
      }
    }, 1000),
    [phoneNumber, dispatch],
  );

  const handleSendVerification = () => {
    sendVerificationCodeDebounce();
  };

  useEffect(() => {
    handleSendVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sendCodeStatus.isSuccess) {
      dispatch(setPage(Page.confirmVerificationCode));
    }
  }, [sendCodeStatus.isSuccess, dispatch]);

  // We automatically trigger the recaptcha verification. To avoid flashing the
  // "Send verification code" button, we display the button when DELAY has
  // passed.
  useEffect(() => {
    const tid = setTimeout(() => {
      setIsLoading(false);
    }, DELAY);

    return () => clearTimeout(tid);
  }, []);

  return (
    <div className="panel">
      {isLoading && (
        <div className="text-center">
          <p>
            <Trans>Please wait…</Trans>
          </p>
        </div>
      )}

      {sendCodeStatus.error && (
        <p>
          <Trans>Error: {sendCodeStatus.error.message}</Trans>
        </p>
      )}

      {!isLoading && !sendCodeStatus.error && (
        <p className="text-center">
          <button
            className="button"
            style={{ backgroundColor: appEnv.BUTTON_COLOR }}
            onClick={handleSendVerification}
          >
            <span>
              <Trans>Send verification code</Trans>
            </span>
          </button>
        </p>
      )}
    </div>
  );
}
