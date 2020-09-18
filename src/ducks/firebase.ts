import { State } from "types.d/State";

type Actions =
  | SendVerificationCodeAction
  | SendVerificationEmailAction
  | ConfirmVerificationCodeAction;

export const SEND_VERIFICATION_CODE = "firebase/SEND_VERIFICATION_CODE";
export const SEND_VERIFICATION_EMAIL = "firebase/SEND_VERIFICATION_EMAIL";
export const CONFIRM_VERIFICATION_CODE = "firebase/CONFIRM_VERIFICATION_CODE";
export const CONFIRM_VERIFICATION_EMAIL = "firebase/CONFIRM_VERIFICATION_EMAIL";

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case SEND_VERIFICATION_CODE:
      return { ...state, ...action.payload };

    case SEND_VERIFICATION_EMAIL:
      return { ...state };

    case CONFIRM_VERIFICATION_CODE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

interface SendVerificationCodeAction {
  type: typeof SEND_VERIFICATION_CODE;
  payload: SendVerificationCodePayload;
}

interface SendVerificationCodePayload {
  provider: firebase.auth.PhoneAuthProvider;
  verificationId: string;
}

export function sendVerificationCode(
  payload: SendVerificationCodePayload,
): SendVerificationCodeAction {
  return { type: SEND_VERIFICATION_CODE, payload };
}

interface SendVerificationEmailAction {
  type: typeof SEND_VERIFICATION_EMAIL;
}

export function sendVerificationEmail(): SendVerificationEmailAction {
  return { type: SEND_VERIFICATION_EMAIL };
}

interface ConfirmVerificationCodeAction {
  type: typeof CONFIRM_VERIFICATION_CODE;
  payload: ConfirmVerificationCodePayload;
}

interface ConfirmVerificationCodePayload {
  idToken: string;
}

export function confirmVerificationCode(
  payload: ConfirmVerificationCodePayload,
): ConfirmVerificationCodeAction {
  return { type: CONFIRM_VERIFICATION_CODE, payload };
}
