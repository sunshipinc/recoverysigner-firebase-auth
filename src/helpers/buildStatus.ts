import { StatusType } from "types/Status";
import { setStatus } from "ducks/status";
import type { AppDispatch } from "ducks/store";

export function buildStatus(actionType: string, dispatch: AppDispatch) {
  return (statusType: StatusType, error?: Error) => {
    let status;

    if (statusType === StatusType.loading) {
      status = {
        isLoading: true,
        hasLoaded: false,
        isSuccess: false,
      };
    } else {
      status = {
        isLoading: false,
        hasLoaded: true,
        isSuccess: !error,
        error,
      };
    }

    dispatch(setStatus({ actionType, status }));
  };
}
