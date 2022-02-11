import React from "react";
import { CookiesProvider } from "react-cookie";
import {
  AuthProvider,
  LoaderProvider,
  SubscrptionProvider,
  PlanProvider,
} from "../../common/contexts";

export const AppWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <LoaderProvider>
        <SubscrptionProvider>
          <PlanProvider>
            <AuthProvider>
              <CookiesProvider>{children}</CookiesProvider>
            </AuthProvider>
          </PlanProvider>
        </SubscrptionProvider>
      </LoaderProvider>
    </React.Fragment>
  );
};
