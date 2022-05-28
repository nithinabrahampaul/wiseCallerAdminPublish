import React, { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { Navigate } from "react-router-dom";
import { removeUserCookies, cookies } from "../../common/apis/base-api";
import { componentRoutes } from "../../common/contants";

export const PrivateRoutes = ({ route }) => {
  const [expired, setExpired] = useState(false);

  const RenderComponent = ({ route }) => {
    return (
      <route.layout>
        <route.component />
      </route.layout>
    );
  };

  useEffect(() => {
    let token = cookies.get("token");
    let tokenExpired = isExpired(token);
    if (tokenExpired) {
      removeUserCookies();
      setExpired(isExpired(token));
    }
  }, []);

  return !route?.auth ? (
    <RenderComponent route={route} />
  ) : route.auth && !expired ? (
    <RenderComponent route={route} />
  ) : (
    <Navigate to={componentRoutes.login} />
  );
};
