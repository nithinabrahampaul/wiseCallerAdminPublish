import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { WCFormInput } from "../../../../common/components/wc-forminput";
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
import { useLoader, useOrganization } from "../../../../common/hooks";
import { WCPreLoader } from "../../../../common/components/wc-preloader";
import { WCDropzone } from "../../../../common/components/wc-dropzone";

const OrganizationAccountProfile = () => {
  const { organization, getOrganizationDetails, onUpdateOrganization } =
    useOrganization();
  const { loading } = useLoader();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: organization });

  useEffect(() => {
    if (!organization) {
      getOrganizationDetails();
    }
  }, [getOrganizationDetails, organization]);

  useEffect(() => {
    let payload = {
      ...organization,
      address: organization?.address_details?.address,
      city: organization?.address_details?.city,
      state: organization?.address_details?.state,
      country: organization?.address_details?.country,
      contact_name: organization?.contact_information?.name,
      contact_email: organization?.contact_information?.email,
      contact_phone: organization?.contact_information?.phone_no,
    };
    reset(payload);
  }, [organization, reset]);

  return loading ? (
    <WCPreLoader />
  ) : (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>{"Account Profile"}</h4>
        </div>
      </div>
      <Container fluid>
        <Col className="pt-4">
          <Form onSubmit={handleSubmit(onUpdateOrganization)}>
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
                      disabled={true}
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
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>{"Profile"}</Form.Label>
                    <Controller
                      name="profile"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <WCDropzone onChange={onChange} imageFiles={value} />
                      )}
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
                  Update
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
      </Container>
    </React.Fragment>
  );
};

export default OrganizationAccountProfile;
