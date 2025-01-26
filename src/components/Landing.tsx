import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPage } from "ducks/page";
import { Page } from "types.d/Page";
import { State } from "types.d/State";

export function Landing() {
  const dispatch = useDispatch();
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
