import React from "react";
import { CookiesProvider } from "react-cookie";
import {
  AuthProvider,
  LoaderProvider,
  SubscrptionProvider,
  NoteProvider,
  UserStatusProvider,
  PlanProvider,
  OrganizationProvider,
  EmployeeProvider,
  CouponProvider,
  PageProvider,
  GlablTypesProvider,
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
                    <NoteProvider>
                      <PageProvider>
                        <GlablTypesProvider>
                          <UserStatusProvider>
                            <AuthProvider>{children}</AuthProvider>
                          </UserStatusProvider>
                        </GlablTypesProvider>
                      </PageProvider>
                    </NoteProvider>
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
