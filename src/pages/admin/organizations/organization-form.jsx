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
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { yupResolver } from "@hookform/resolvers/yup";
import { organizationFormValidation } from "../../../common/validations/admin";

export const OrganizationForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(organizationFormValidation),
  });

  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>Organizations</Modal.Header>
            <Modal.Body>
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
                {/* <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
                  <Button type="submit" className="w-100 btn btn-gray-800">
                    Submit
                  </Button>
                </Card.Footer> */}
              </Card>
            </Modal.Body>
          </Card.Body>
          <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
            <Button type="submit" className="w-100 btn btn-gray-800">
              Save
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </Modal>
  );
};
