import { createContext, useCallback, useState } from "react";

export const AppCookiesContext = createContext({});
export const AppCookiesProvider = ({ children }) => {
  const [appCookies, setAppCookies] = useState(null);
  const onUpdateCookies = useCallback((values) => {
    setAppCookies(values);
  }, []);
  const values = {
    appCookies,
    onUpdateCookies: useCallback(
      (values) => {
        onUpdateCookies({ ...appCookies, ...values });
      },
      [onUpdateCookies, appCookies]
    ),
  };
  return (
    <AppCookiesContext.Provider value={values}>
      {children}
    </AppCookiesContext.Provider>
  );
};
