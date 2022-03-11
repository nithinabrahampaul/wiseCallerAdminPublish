import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { pageRoutes } from "../../common/contants";
import NotFound from "../not-found";
import { PrivateRoutes } from "./private-routes";

export const AppRoutes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {pageRoutes.map((route, index) => (
            <React.Fragment key={index}>
              <Route
                path={route.path}
                element={<PrivateRoutes route={route} />}
              />
            </React.Fragment>
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
