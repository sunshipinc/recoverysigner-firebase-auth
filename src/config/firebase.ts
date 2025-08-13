import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
} from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let appInstance: FirebaseApp;
let authInstance: Auth;

export function initializeFirebase(options: FirebaseOptions) {
  appInstance = initializeApp(options);
  authInstance = getAuth(appInstance);
}

export function app() {
  if (!appInstance) {
    throw new Error("You need to initialize Firebase before calling app()");
  }

  return appInstance;
}

export function auth() {
  if (!authInstance) {
    throw new Error("You need to initialize Firebase before calling auth()");
  }

  return authInstance;
}
