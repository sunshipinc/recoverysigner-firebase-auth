import { useSelector } from "react-redux";

import { type Status } from "types/Status";
import { type State } from "types/State";

const defaultStatus = {
  hasLoaded: false,
  isLoading: false,
  isSuccess: false,
};

export function useStatus(actionType: string): Status {
  const statuses = useSelector((state: State) => state.statuses);

  return statuses[actionType] || defaultStatus;
}
