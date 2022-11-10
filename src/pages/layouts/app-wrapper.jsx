import React from "react";
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
  NotificationProvider,
  AppCookiesProvider,
  TemplateProvider,
  PaymentProvider,
} from "../../common/contexts";

export const AppWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <AppCookiesProvider>
        <LoaderProvider>
          <PaymentProvider>
            <TemplateProvider>
              <OrganizationProvider>
                <EmployeeProvider>
                  <CouponProvider>
                    <SubscrptionProvider>
                      <PlanProvider>
                        <NoteProvider>
                          <PageProvider>
                            <NotificationProvider>
                              <GlablTypesProvider>
                                <UserStatusProvider>
                                  <AuthProvider>{children}</AuthProvider>
                                </UserStatusProvider>
                              </GlablTypesProvider>
                            </NotificationProvider>
                          </PageProvider>
                        </NoteProvider>
                      </PlanProvider>
                    </SubscrptionProvider>
                  </CouponProvider>
                </EmployeeProvider>
              </OrganizationProvider>
            </TemplateProvider>
          </PaymentProvider>
        </LoaderProvider>
      </AppCookiesProvider>
    </React.Fragment>
  );
};
