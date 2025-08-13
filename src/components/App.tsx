import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { type AppConfig } from "types/AppConfig";
import { Page } from "types/Page";
import { type State } from "types/State";
import { ConfirmVerificationCode } from "components/ConfirmVerificationCode";
import { ConfirmVerificationEmail } from "components/ConfirmVerificationEmail";
import { SentVerificationEmail } from "components/SentVerificationEmail";
import { Landing } from "components/Landing";
import { SendVerificationCode } from "components/SendVerificationCode";
import { SendVerificationEmail } from "components/SendVerificationEmail";
import { initApp } from "ducks/app";
import { useAppDispatch } from "hooks/useAppDispatch";

interface AppProps {
  config: AppConfig;
}
export function App({ config }: AppProps) {
  const dispatch = useAppDispatch();
  const [component, setComponent] = useState<React.ReactElement>(<></>);
  const { appDidLoad, currentPage } = useSelector((state: State) => state);

  useEffect(() => {
    dispatch(initApp(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (appDidLoad) {
      switch (currentPage) {
        case Page.sendVerificationCode:
          setComponent(<SendVerificationCode />);
          break;

        case Page.confirmVerificationCode:
          setComponent(<ConfirmVerificationCode />);
          break;

        case Page.sendVerificationEmail:
          setComponent(<SendVerificationEmail />);
          break;

        case Page.sentVerificationEmail:
          setComponent(<SentVerificationEmail />);
          break;

        case Page.confirmVerificationEmail:
          setComponent(<ConfirmVerificationEmail />);
          break;

        default:
          setComponent(<Landing />);
      }
    }
  }, [appDidLoad, currentPage]);

  return component;
}
