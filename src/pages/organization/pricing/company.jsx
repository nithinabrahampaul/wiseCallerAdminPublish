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
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCPreLoader } from "../../../common/components/wc-preloader";
import { useLoader, useSubscription } from "../../../common/hooks";
import { companyFormValidation } from "../../../common/validations/auth";
export const Company = ({ onPageChange, activeStep, pricingForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companyFormValidation),
  });
  const { onPlanSubscribe } = useSubscription();
  const { loading } = useLoader();

  const onCompanyDetails = async (values) => {
    try {
      await onPlanSubscribe({ ...values, ...pricingForm });
      // let options = {
      //   key: process.env.REACT_APP_RAZORPAY_KEY,
      //   amount: 100,
      //   currency: "INR",
      //   name: "Wisecaller PVT LTD",
      //   handler: (res) => {},
      // };
      // const pay = new razorPay(options);
      // pay.open();
    } catch (error) {
      console.log(error);
    }
  };

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
                  error={errors?.company_name}
                  {...register("company_name")}
                />
              </Col>
              <Col md={6} className="mb-3">
                <WCFormInput
                  label="Email"
                  placeholder="example@company.com"
                  icon={faEnvelope}
                  error={errors?.company_email}
                  {...register("company_email")}
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
            <h5 className="mb-4">Personal Information</h5>
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
            </Row>
          </Card.Body>
          <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
            <Button type="submit" className="w-100 btn btn-gray-800">
              Submit
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </React.Fragment>
  );
};
