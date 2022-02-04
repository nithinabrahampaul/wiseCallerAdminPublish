import React from "react";
import { CookiesProvider } from "react-cookie";
import { AuthProvider, LoaderProvider } from "../../common/contexts";

export const AppWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <LoaderProvider>
        <AuthProvider>
          <CookiesProvider>{children}</CookiesProvider>
        </AuthProvider>
      </LoaderProvider>
    </React.Fragment>
  );
};
