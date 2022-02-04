import React, { createContext, useCallback, useState } from "react";

export const LoaderContext = createContext({});

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  let value = {
    loading,
    setLoading: useCallback((value) => {
      setLoading(value);
    }, []),
  };

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};
