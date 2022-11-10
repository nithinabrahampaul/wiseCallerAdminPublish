import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { isExpired } from "react-jwt";
import { Navigate } from "react-router-dom";
import { componentRoutes } from "../../common/contants";

export const PrivateRoutes = ({ route }) => {
  const [expired, setExpired] = useState(null);
  const [cookies, , removeCookie] = useCookies();

  const RenderComponent = ({ route }) => {
    return (
      <route.layout>
        <route.component />
      </route.layout>
    );
  };

  useEffect(() => {
    let token = cookies?.token;
    if (token) {
      let tokenExpired = isExpired(token);
      if (tokenExpired) {
        removeCookie("email");
        removeCookie("role");
        removeCookie("token");
        setExpired(true);
      }
    }
  }, [cookies, removeCookie]);

  return !route?.auth ? (
    <RenderComponent route={route} />
  ) : route.auth && !expired ? (
    <RenderComponent route={route} />
  ) : (
    <Navigate to={`${componentRoutes.login}`} />
  );
};
