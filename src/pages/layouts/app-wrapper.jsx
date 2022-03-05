import React from "react";
import { CookiesProvider } from "react-cookie";
import {
  AuthProvider,
  LoaderProvider,
  SubscrptionProvider,
  PlanProvider,
  OrganizationProvider,
  EmployeeProvider,
  CouponProvider,
} from "../../common/contexts";

export const AppWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <LoaderProvider>
        <CookiesProvider>
          <OrganizationProvider>
            <EmployeeProvider>
              <CouponProvider>
                <SubscrptionProvider>
                  <PlanProvider>
                    <AuthProvider>{children}</AuthProvider>
                  </PlanProvider>
                </SubscrptionProvider>
              </CouponProvider>
            </EmployeeProvider>
          </OrganizationProvider>
        </CookiesProvider>
      </LoaderProvider>
    </React.Fragment>
  );
};
