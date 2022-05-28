import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cookies } from "../common/apis/base-api";
import { WCPreLoader } from "../common/components/wc-preloader";
import { componentRoutes } from "../common/contants";
import { useLoader } from "../common/hooks";

const Pages = () => {
  const navigate = useNavigate();
  const { loading } = useLoader();

  const handleNavigation = useCallback(() => {
    let role = cookies.get("role");
    if (role === "ORGANIZATION") {
      navigate(componentRoutes.organizationDashboard);
    } else if (role === "ADMIN") {
      navigate(componentRoutes.adminDashboard);
    } else {
      navigate(componentRoutes.login);
    }
  }, [navigate]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCPreLoader />
    </React.Fragment>
  );
};

export default Pages;
