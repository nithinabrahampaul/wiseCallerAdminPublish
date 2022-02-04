import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth, useLoader } from "../../common/hooks";
import BgImage from "../../assets/images/img/illustrations/signin.svg";

import { WCPreLoader } from "../../common/components/wc-preloader";
import { componentRoutes } from "../../common/contants";
import { LoginForm } from "./login-form";
import { OTPForm } from "./verify-otp-form";

const Login = () => {
  const [initialValues, setInitialValues] = useState(null);
  const { loading } = useLoader();
  const { isLoginForm } = useAuth();

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={"/"} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              homepage
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to Wise Caller</h3>
                </div>
                {isLoginForm ? (
                  <LoginForm setInitialValues={setInitialValues} />
                ) : (
                  <OTPForm initialValues={initialValues} />
                )}

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link
                      as={Link}
                      to={componentRoutes.register}
                      className="fw-bold"
                    >
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Login;
