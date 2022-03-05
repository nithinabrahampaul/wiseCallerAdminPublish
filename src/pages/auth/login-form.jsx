import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Form, FormCheck } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WCFormInput } from "../../common/components/wc-forminput";
import { loginFormValidation } from "../../common/validations";
import { useAuth } from "../../common/hooks";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { componentRoutes } from "../../common/contants";
import { useEffect } from "react";

export const LoginForm = ({ setInitialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormValidation) });
  const { onHandleLogin } = useAuth();

  const [cookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies?.token) {
      navigate(componentRoutes.root);
    }
  }, [cookies, navigate]);

  const handleLogin = async (values) => {
    try {
      setInitialValues(values);
      await onHandleLogin(values);
    } catch (error) {}
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit(handleLogin)}>
      <WCFormInput
        label="Your Email"
        placeholder="example@company.com"
        icon={faUser}
        error={errors?.email}
        {...register("email")}
      />

      <Form.Group>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Check type="checkbox">
            <FormCheck.Input id="defaultCheck5" className="me-2" />
            <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">
              Remember me
            </FormCheck.Label>
          </Form.Check>
          <Card.Link className="small text-end">Forgot password?</Card.Link>
        </div>
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        {"Sign in"}
      </Button>
    </Form>
  );
};
