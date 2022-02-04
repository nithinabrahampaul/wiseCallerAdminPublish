import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faGlobe,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import BgImage from "../../assets/images/img/illustrations/signin.svg";
import { componentRoutes } from "../../common/contants";
import { WCFormInput } from "../../common/components/wc-forminput";
import { useForm } from "react-hook-form";
import { useAuth } from "../../common/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormValidation } from "../../common/validations/auth";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerFormValidation) });
  const { onHandleRegister } = useAuth();

  const handleRegister = async (values) => {
    try {
      await onHandleRegister(values);
    } catch (error) {}
  };

  return (
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
            <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h3 className="mb-0">Create an account</h3>
              </div>
              <Form className="mt-4" onSubmit={handleSubmit(handleRegister)}>
                <WCFormInput
                  label="Your Name"
                  icon={faUser}
                  placeholder="Full name"
                  error={errors?.name}
                  {...register("name")}
                />
                <WCFormInput
                  label="Your Email"
                  icon={faEnvelope}
                  placeholder="example@company.com"
                  error={errors?.email}
                  {...register("email")}
                />
                <WCFormInput
                  label="Your Mobile Number"
                  icon={faPhone}
                  placeholder="+91 0000 000 000"
                  error={errors?.phone_no}
                  {...register("phone_no")}
                />

                <WCFormInput
                  label="Your Website"
                  icon={faGlobe}
                  placeholder="www.wisecaller.com"
                  error={errors?.phone_no}
                  {...register("phone_no")}
                />
                <FormCheck type="checkbox" className="d-flex mb-4">
                  <FormCheck.Input required id="terms" className="me-2" />
                  <FormCheck.Label htmlFor="terms">
                    I agree to the <Card.Link>terms and conditions</Card.Link>
                  </FormCheck.Label>
                </FormCheck>

                <Button variant="primary" type="submit" className="w-100">
                  Sign up
                </Button>
              </Form>

              <div className="mt-3 mb-4 text-center">
                <span className="fw-normal">or</span>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <span className="fw-normal">
                  Already have an account?
                  <Card.Link
                    as={Link}
                    to={componentRoutes.login}
                    className="fw-bold"
                  >
                    {` Login here `}
                  </Card.Link>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
