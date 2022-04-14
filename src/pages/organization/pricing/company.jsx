import React, { useEffect, useState } from "react";
import {
  faBriefcase,
  faCity,
  faEnvelope,
  faFileInvoice,
  faFlag,
  faGlobe,
  faIdCard,
  faMapMarked,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { componentRoutes } from "../../../common/contants";
import { useAuth, useLoader, useSubscription } from "../../../common/hooks";
import { companyFormValidation } from "../../../common/validations/auth";
import { VerifyOTPForm } from "./verify-otp-form";
import { removeUserCookies } from "../../../common/apis/base-api";

export const Company = ({ onPageChange, activeStep, pricingForm }) => {
  const [isOpen, setOpen] = useState(false);
  const [companyForm, setCompanyForm] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companyFormValidation),
  });
  const { isSubscriptionDone } = useSubscription();
  const { onHandleOrganizationSubscription, subscriptionLogin } = useAuth();
  const { loading } = useLoader();

  const onCompanyDetails = async (values) => {
    try {
      setCompanyForm({ ...pricingForm, ...values });
      await onHandleOrganizationSubscription(values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subscriptionLogin) {
      setOpen(true);
    }
  }, [subscriptionLogin]);

  useEffect(() => {
    if (isSubscriptionDone) {
      setOpen(false);
      removeUserCookies();
      navigate(componentRoutes.login);
    }
  }, [isSubscriptionDone, navigate]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onCompanyDetails)}>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">Company Information</h5>
            <Row>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Name"
                  placeholder="Wisecaller Pvt. Ltd"
                  icon={faBriefcase}
                  error={errors?.name}
                  {...register("name")}
                />
              </Col>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Email"
                  placeholder="example@company.com"
                  icon={faEnvelope}
                  error={errors?.email}
                  {...register("email")}
                />
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Address"
                  placeholder="Address"
                  icon={faMapMarked}
                  error={errors?.address}
                  {...register("address")}
                />
              </Col>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="City"
                  placeholder="City"
                  icon={faCity}
                  error={errors?.city}
                  {...register("city")}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="State"
                  placeholder="State"
                  icon={faFlag}
                  error={errors?.state}
                  {...register("state")}
                />
              </Col>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Country"
                  placeholder="Country"
                  icon={faGlobe}
                  error={errors?.country}
                  {...register("country")}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="GST"
                  placeholder="22AAAAA0000A1Z5"
                  icon={faFileInvoice}
                  error={errors?.gst}
                  {...register("gst")}
                />
              </Col>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="PAN"
                  placeholder="AAAAA0000A"
                  icon={faIdCard}
                  error={errors?.pan}
                  {...register("pan")}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card border="light" className="bg-white shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-4">Contact Information</h5>
            <Row>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Name"
                  placeholder="Full Name"
                  icon={faUser}
                  error={errors?.contact_name}
                  {...register("contact_name")}
                />
              </Col>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Email"
                  placeholder="example@company.com"
                  icon={faEnvelope}
                  error={errors?.contact_email}
                  {...register("contact_email")}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Mobile Number"
                  placeholder="+91 0000 000 000"
                  icon={faPhone}
                  error={errors?.contact_phone}
                  {...register("contact_phone")}
                />
              </Col>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Your Website"
                  icon={faGlobe}
                  placeholder="www.wisecaller.com"
                  error={errors?.website}
                  {...register("website")}
                />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
            <Button type="submit" className="w-100 btn btn-gray-800">
              Submit
            </Button>
          </Card.Footer>
        </Card>
      </Form>
      {isOpen && (
        <VerifyOTPForm
          isOpen={isOpen}
          onClose={setOpen.bind(this, false)}
          initialValues={{ ...companyForm, ...pricingForm }}
        />
      )}
    </React.Fragment>
  );
};
