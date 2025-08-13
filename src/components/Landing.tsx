import { useEffect } from "react";
import { useSelector } from "react-redux";

import { setPage } from "ducks/page";
import { Page } from "types/Page";
import { type State } from "types/State";
import { useAppDispatch } from "hooks/useAppDispatch";

export function Landing() {
  const dispatch = useAppDispatch();
  const { appDidLoad, phoneNumber, email, dynamicLinkSettings, signInLink } =
    useSelector((state: State) => state);

  useEffect(() => {
    if (appDidLoad) {
      // auth with phone
      if (phoneNumber) {
        dispatch(setPage(Page.sendVerificationCode));
      }
      // auth with email
      if (email && dynamicLinkSettings) {
        dispatch(setPage(Page.sendVerificationEmail));
      }
      // confirm auth with email
      if (email && signInLink) {
        dispatch(setPage(Page.confirmVerificationEmail));
      }
    }
  }, [
    appDidLoad,
    phoneNumber,
    email,
    dynamicLinkSettings,
    signInLink,
    dispatch,
  ]);

  return <div className="panel"></div>;
}
