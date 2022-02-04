import React from "react";

export const BlankLayout = ({ children }) => {
  return (
    <React.Fragment>
      <main>{children}</main>
    </React.Fragment>
  );
};
