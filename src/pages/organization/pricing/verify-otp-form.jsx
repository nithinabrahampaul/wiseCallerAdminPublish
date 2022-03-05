import { faUser } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { useSubscription } from "../../../common/hooks";
import { otpFormValidation } from "../../../common/validations/auth";

export const VerifyOTPForm = ({ isOpen, onClose, initialValues }) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(otpFormValidation),
    defaultValues: { email: initialValues.email },
  });

  const { onPlanSubscribe } = useSubscription();

  const onSubmitVarifyOTP = async (values) => {
    try {
      await onPlanSubscribe({ otpForm: values, companyForm: initialValues });
    } catch (error) {}
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Form onSubmit={handleSubmit(onSubmitVarifyOTP)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="w-100 btn btn-gray-800">
            Verify
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
