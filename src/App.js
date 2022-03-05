import React from "react";
import { AppRoutes } from "./pages/layouts/app-routes";
import "./App.scss";
import "./assets/scss/volt.scss";
import { AppWrapper } from "./pages/layouts/app-wrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

const App = () => {
  return (
    <React.Fragment>
      <AppWrapper>
        <AppRoutes />
        <ToastContainer position="top-center" autoClose="3000" />
      </AppWrapper>
    </React.Fragment>
  );
};

export default App;
