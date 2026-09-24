import { Trans } from "@lingui/react/macro";

import { AppError } from "types/AppError";

interface ErrorMessageProps {
  error: Error;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  const { code, referenceId } = error instanceof AppError ? error : {};
  const reference = [referenceId, code].filter(Boolean).join(" · ");

  return (
    <div className="error-message" role="alert">
      <div>
        <p className="error-message-text">{error.message}</p>

        {reference && (
          <p className="error-message-reference">
            <Trans>Ref: {reference}</Trans>
          </p>
        )}
      </div>
    </div>
  );
}
