import React from "react";
import { AppRoutes } from "./pages/layouts/app-routes";
import "./App.scss";
import "./assets/scss/volt.scss";
import { AppWrapper } from "./pages/layouts/app-wrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import { CookiesProvider } from "react-cookie";

const App = () => {
  return (
    <React.Fragment>
      <CookiesProvider>
        <AppWrapper>
          <AppRoutes />
          <ToastContainer position="top-center" autoClose="3000" />
        </AppWrapper>
      </CookiesProvider>
    </React.Fragment>
  );
};

export default App;
