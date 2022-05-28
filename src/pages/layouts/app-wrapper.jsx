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
} from "../../common/contexts";

export const AppWrapper = ({ children }) => {
  return (
    <React.Fragment>
      <AppCookiesProvider>
        <LoaderProvider>
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
        </LoaderProvider>
      </AppCookiesProvider>
    </React.Fragment>
  );
};
