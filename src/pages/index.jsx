import React, { useEffect } from "react";
import { useCallback } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { WCPreLoader } from "../common/components/wc-preloader";
import { componentRoutes } from "../common/contants";
import { useLoader } from "../common/hooks";

const Pages = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const { loading } = useLoader();

  const getOrganizationData = useCallback(async () => {
    if (cookies?.token) {
      if (cookies.role === "ORGANIZATION") {
        navigate(componentRoutes.organizationDashboard);
      } else if (cookies.role === "ADMIN") {
        navigate(componentRoutes.adminDashboard);
      } else {
        navigate(componentRoutes.login);
      }
    } else {
      navigate(componentRoutes.login);
    }
  }, [cookies, navigate]);

  useEffect(() => {
    getOrganizationData();
  }, [getOrganizationData]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <WCPreLoader />
    </React.Fragment>
  );
};

export default Pages;
