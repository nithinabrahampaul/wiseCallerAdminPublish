import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { WCPreLoader } from "../common/components/wc-preloader";
import { componentRoutes } from "../common/contants";

const Pages = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies?.token) {
      navigate(componentRoutes.organizationDashboard);
    } else {
      navigate(componentRoutes.login);
    }
  }, [cookies, navigate]);

  return (
    <React.Fragment>
      <WCPreLoader />
    </React.Fragment>
  );
};

export default Pages;
