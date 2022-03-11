import React, { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";
import { removeUserCookies } from "../../common/apis/base-api";
import { componentRoutes } from "../../common/contants";

export const PrivateRoutes = ({ route }) => {
  const cookies = new Cookies();
  const { isExpired } = useJwt(cookies.get("token"));

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
