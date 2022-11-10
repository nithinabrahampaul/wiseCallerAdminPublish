import React, { useCallback, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { WCBlankHeader } from "../../../common/components/wc-blank-header";
import BgImage from "../../../assets/images/img/illustrations/signin.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { componentRoutes } from "../../../common/contants";
import { useOrganization, usePayment } from "../../../common/hooks";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";

const OrganizationPayment = () => {
  const { onCheckPayment } = useOrganization();
  const { onVerifyPaymentOTP } = usePayment();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const validateToken = useCallback(async () => {
    let validate = await onCheckPayment({ url: window.location.href });
    if (location.search) {
      let search = location.search.split("=")[1];
      let expired = isExpired(search);
      if (expired || !validate) {
        navigate(componentRoutes.tokenExpired);
      } else {
        let decode = decodeToken(search);
        setValue("email", decode?.email);
      }
    }
  }, [location, navigate, onCheckPayment, setValue]);

  const onSubmitOTP = async (values) => {
    let search = location.search.split("=")[1];
    let user = decodeToken(search);
    await onVerifyPaymentOTP({
      ...values,
      user: user._id,
      url: window.location.href,
    });
    navigate(componentRoutes.login);
  };

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <React.Fragment>
      <WCBlankHeader />
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <Row>
                  <Form className="mt-4" onSubmit={handleSubmit(onSubmitOTP)}>
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
                          <OtpInput
                            className="inputStyle"
                            {...field}
                            separator={"-"}
                          />
                        )}
                      />
                      {errors?.otp && (
                        <span className="form_error">
                          {errors?.otp?.message}
                        </span>
                      )}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      {"Submit"}
                    </Button>
                  </Form>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default OrganizationPayment;
