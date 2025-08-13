import { type State } from "types/State";

export type Actions = InitAppAction;

const INIT_APP = "app/INIT";

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case INIT_APP:
      return { ...state, ...action.payload.config, appDidLoad: true };

    default:
      return state;
  }
}

interface InitAppAction {
  type: typeof INIT_APP;
  payload: {
    config: Partial<State>;
  };
}

export const initApp = (config: Partial<State>): InitAppAction => ({
  type: INIT_APP,
  payload: { config },
});
