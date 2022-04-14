import React, { useEffect } from "react";
import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";
import { removeUserCookies, cookies } from "../../common/apis/base-api";
import { componentRoutes } from "../../common/contants";

export const PrivateRoutes = ({ route }) => {
  let token = cookies.get("token");
  const { isExpired } = useJwt(token);

  const RenderComponent = ({ route }) => {
    return (
      <route.layout>
        <route.component />
      </route.layout>
    );
  };

  useEffect(() => {
    if (isExpired) {
      removeUserCookies();
    }
  }, [isExpired]);

  return !route?.auth ? (
    <RenderComponent route={route} />
  ) : route.auth && !isExpired ? (
    <RenderComponent route={route} />
  ) : (
    <Navigate to={componentRoutes.login} />
  );
};
