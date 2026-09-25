import { useSelector } from "react-redux";
import { Trans } from "@lingui/react/macro";

import { type State } from "types/State";
import { Page } from "types/Page";
import { setPage } from "ducks/page";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useSendCodeCooldown } from "hooks/useSendCodeCooldown";

export function SentVerificationEmail() {
  const dispatch = useAppDispatch();
  const { email, emailSentAt } = useSelector((state: State) => state);
  const cooldownSeconds = useSendCodeCooldown(emailSentAt);

  const handleResend = () => {
    dispatch(setPage(Page.sendVerificationEmail));
  };

  return (
    <div className="panel">
      <div>
        <p className="text-center">
          <Trans>
            If the below email address is associated with an account, you will
            receive a verification email.
          </Trans>
        </p>

        <div style={{ height: 30 }} />

        <p className="text-center text-medium">{email}</p>

        <div style={{ height: 30 }} />

        <p className="text-center">
          <Trans>
            Please check your email on your device and click the verification
            link in the email message to proceed.
          </Trans>
        </p>
      </div>

      <div style={{ height: 30 }} />

      <p className="text-center">
        <button
          className="button-link"
          type="button"
          onClick={handleResend}
          disabled={cooldownSeconds > 0}
        >
          <span>
            {cooldownSeconds > 0 ? (
              <Trans>Resend in {cooldownSeconds}s</Trans>
            ) : (
              <Trans>Resend</Trans>
            )}
          </span>
        </button>
      </p>
    </div>
  );
}
