export enum StatusType {
  loading = "loading",
  error = "error",
  success = "success",
}

export interface Status {
  isLoading: boolean;
  hasLoaded: boolean;
  isSuccess: boolean;
  error?: Error;
}
