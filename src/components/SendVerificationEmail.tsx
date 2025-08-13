import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Trans } from "@lingui/react/macro";
import { debounce } from "lodash";

import { SEND_VERIFICATION_EMAIL } from "ducks/firebase";
import { setPage } from "ducks/page";
import { sendVerificationEmail } from "helpers/sendVerificationEmail";
import { useStatus } from "hooks/useStatus";
import { Page } from "types/Page";
import { type State } from "types/State";
import { useAppDispatch } from "hooks/useAppDispatch";

export function SendVerificationEmail() {
  const dispatch = useAppDispatch();
  const sendEmailStatus = useStatus(SEND_VERIFICATION_EMAIL);
  const { email, dynamicLinkSettings } = useSelector((state: State) => state);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendVerificationEmailDebounce = useCallback(
    debounce(() => {
      if (email && dynamicLinkSettings) {
        sendVerificationEmail({ email, dynamicLinkSettings, dispatch });
      }
    }, 1000),
    [email, dynamicLinkSettings, dispatch],
  );

  useEffect(() => {
    sendVerificationEmailDebounce();
  }, [sendVerificationEmailDebounce]);

  useEffect(() => {
    if (sendEmailStatus.isSuccess) {
      dispatch(setPage(Page.sentVerificationEmail));
    }
  }, [sendEmailStatus.isSuccess, dispatch]);

  return (
    <div className="panel">
      <div className="text-center">
        <p>
          <Trans>Please wait…</Trans>
        </p>
      </div>

      <div style={{ height: 30 }} />

      {sendEmailStatus.error && (
        <p>
          <Trans>Error: {sendEmailStatus.error.message}</Trans>
        </p>
      )}
    </div>
  );
}
