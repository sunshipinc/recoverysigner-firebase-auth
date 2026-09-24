export class AppError extends Error {
  // Firebase (or app) error code, e.g. "auth/too-many-requests"
  code?: string;
  // Short ID tagged on the Sentry event, so support can search for it
  referenceId?: string;

  constructor(
    message: string,
    { code, referenceId }: { code?: string; referenceId?: string } = {},
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.referenceId = referenceId;
  }
}
