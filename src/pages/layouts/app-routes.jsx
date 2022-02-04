import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { componentRoutes, pageRoutes } from "../../common/contants";
import NotFound from "../not-found";

export const AppRoutes = () => {
  const RenderRoute = ({ route }) =>
    route.layout ? (
      <route.layout>
        <route.component />
      </route.layout>
    ) : (
      <route.component />
    );

  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {pageRoutes.map((route, index) => (
            <React.Fragment key={index}>
              {!route.auth ? (
                <Route
                  path={route.path}
                  element={<RenderRoute route={route} />}
                />
              ) : (
                <Navigate to={componentRoutes.login} />
              )}
            </React.Fragment>
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
