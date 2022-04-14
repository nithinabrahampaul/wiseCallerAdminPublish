import React, { useEffect } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { WCFormInput } from "../../common/components/wc-forminput";
import OtpInput from "react-otp-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpFormValidation } from "../../common/validations/auth";
import { useAuth } from "../../common/hooks";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { componentRoutes } from "../../common/contants";
import { cookies } from "../../common/apis/base-api";

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
  const { onHandleVerifyOTP, onRenendOTP } = useAuth();
  // const [cookies] = useCookies();
  const navigate = useNavigate();

  const handleVerifyOTP = async (values) => {
    try {
      await onHandleVerifyOTP(values);
    } catch (error) {}
  };

  const handleResentOTP = async () => {
    await onRenendOTP({ email: initialValues.email });
  };

  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      navigate(componentRoutes.root);
    }
  }, [navigate]);

  return (
    <React.Fragment>
      <Form className="mt-4" onSubmit={handleSubmit(handleVerifyOTP)}>
        <WCFormInput
          label="Your Email"
          placeholder="example@company.com"
          icon={faUser}
          error={errors?.email}
          {...register("email")}
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

        <Button variant="primary" type="submit" className="w-100">
          {"Sign in"}
        </Button>
      </Form>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Button
          variant="primary"
          type="button"
          className="w-100"
          onClick={handleResentOTP.bind(this)}
        >
          {"Resend OTP"}
        </Button>
      </div>
    </React.Fragment>
  );
};
