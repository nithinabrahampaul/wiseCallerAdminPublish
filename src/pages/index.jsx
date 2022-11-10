import React, { useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { WCPreLoader } from "../common/components/wc-preloader";
import { componentRoutes } from "../common/contants";
import { useLoader } from "../common/hooks";

const Pages = () => {
  const navigate = useNavigate();
  const { loading } = useLoader();
  const [cookies] = useCookies();

  const handleNavigation = useCallback(() => {
    let role = cookies?.role;
    if (role === "ORGANIZATION") {
      navigate(componentRoutes.organizationDashboard);
    } else if (role === "ADMIN") {
      navigate(componentRoutes.adminDashboard);
    } else {
      navigate(componentRoutes.login);
    }
  }, [navigate, cookies]);

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
