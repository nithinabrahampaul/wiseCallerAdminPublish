import React, { useCallback, useEffect, useMemo } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { WCPreLoader } from "../common/components/wc-preloader";
import { componentRoutes } from "../common/contants";
import { useLoader } from "../common/hooks";

const Pages = () => {
  const cookies = useMemo(() => new Cookies(), []);
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
  }, [cookies, navigate]);

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
