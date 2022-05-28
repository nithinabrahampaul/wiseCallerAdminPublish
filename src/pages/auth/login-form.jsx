import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WCFormInput } from "../../common/components/wc-forminput";
import { loginFormValidation } from "../../common/validations";
import { useAuth } from "../../common/hooks";
import { Link, useNavigate } from "react-router-dom";
import { componentRoutes } from "../../common/contants";
import React, { useContext, useEffect } from "react";
import { AppCookiesContext } from "../../common/contexts";

export const LoginForm = ({ setInitialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormValidation) });
  const { onHandleLogin } = useAuth();
  const { appCookies } = useContext(AppCookiesContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = appCookies?.token;
    if (token) {
      navigate(componentRoutes.root);
    }
  }, [navigate, appCookies]);

  const handleLogin = async (values) => {
    try {
      setInitialValues(values);
      await onHandleLogin(values);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Form className="mt-4" onSubmit={handleSubmit(handleLogin)}>
        <WCFormInput
          label="Your Email"
          placeholder="example@company.com"
          icon={faUser}
          error={errors?.email}
          {...register("email")}
        />

        <Button variant="primary" type="submit" className="w-100">
          {"Sign in"}
        </Button>
      </Form>
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
    </React.Fragment>
  );
};
