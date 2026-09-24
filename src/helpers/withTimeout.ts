export const TIMEOUT_ERROR_CODE = "app/timeout";

// Rejects with a `{ code: "app/timeout" }` error if `promise` hasn't settled
// after `ms`. A late result from `promise` is ignored.
export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(
        Object.assign(new Error(`Timed out after ${ms}ms`), {
          code: TIMEOUT_ERROR_CODE,
        }),
      );
    }, ms);
  });

  return Promise.race([promise, timeout]).then(
    (value) => {
      clearTimeout(timer);
      return value;
    },
    (error) => {
      clearTimeout(timer);
      throw error;
    },
  );
}
