import React from "react";
import { WCHeader } from "../../common/components/wc-header";
import { WCSidebar } from "../../common/components/wc-sidebar";

export const MainLayout = ({ children }) => {
  return (
    <React.Fragment>
      <WCSidebar />
      <main className="content">
        <WCHeader />
        {children}
      </main>
    </React.Fragment>
  );
};
