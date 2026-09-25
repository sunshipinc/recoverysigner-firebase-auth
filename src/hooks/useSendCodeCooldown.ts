import { useEffect, useState } from "react";

// How long the user has to wait after an SMS or email is sent before
// requesting another. Keeps people from hammering Resend into Firebase's
// `auth/too-many-requests`.
export const SEND_CODE_COOLDOWN_MS = 60000;

// Seconds left before another code can be requested, 0 when allowed.
export function useSendCodeCooldown(sentAt: number | undefined): number {
  // Only used to re-render every second while the cooldown runs.
  const [, setTick] = useState(0);

  const cooldownEndsAt = (sentAt ?? 0) + SEND_CODE_COOLDOWN_MS;
  const secondsLeft = Math.max(
    0,
    Math.ceil((cooldownEndsAt - Date.now()) / 1000),
  );

  useEffect(() => {
    if (!sentAt) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTick((tick) => tick + 1);

      if (Date.now() >= cooldownEndsAt) {
        window.clearInterval(interval);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [sentAt, cooldownEndsAt]);

  return secondsLeft;
}
