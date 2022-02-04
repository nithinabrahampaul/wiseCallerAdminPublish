import React, { useEffect } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Form, FormCheck } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { WCFormInput } from "../../common/components/wc-forminput";
import OtpInput from "react-otp-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpFormValidation } from "../../common/validations/auth";
import { useAuth } from "../../common/hooks";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { componentRoutes } from "../../common/contants";

export const OTPForm = ({ initialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(otpFormValidation),
  });
  const { onHandleVerifyOTP } = useAuth();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const handleVerifyOTP = async (values) => {
    try {
      await onHandleVerifyOTP(values);
    } catch (error) {}
  };

  useEffect(() => {
    if (cookies?.token) {
      navigate(componentRoutes.root);
    }
  }, [cookies, navigate]);

  return (
    <Form className="mt-4" onSubmit={handleSubmit(handleVerifyOTP)}>
      <WCFormInput
        label="Mobile Number"
        placeholder="+91 0000 000 000"
        icon={faUser}
        error={errors?.phone_no}
        {...register("phone_no")}
      />
      <Form.Group className="mb-4">
        <Form.Label>{"OTP"}</Form.Label>
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput className="inputStyle" {...field} separator={"-"} />
          )}
        />
        {errors?.otp && (
          <span className="form_error">{errors?.otp?.message}</span>
        )}
      </Form.Group>

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
