import { faStickyNote, faStopwatch20 } from "@fortawesome/free-solid-svg-icons";
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
    control,
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
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    label="Name"
                    control={control}
                    placeholder="Name...."
                    icon={faStickyNote}
                    {...register("name")}
                    error={errors?.name}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <WCFormInput
                      label="Contact Name"
                      control={control}
                      placeholder="Contact Name...."
                      icon={faStickyNote}
                      {...register("contact_information.name")}
                      error={errors?.name}
                    />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                      label="Email"
                      control={control}
                      placeholder="Email...."
                      {...register("contact_information.email")}
                      error={errors?.email}
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <WCFormInput
                      type="number"
                      control={control}
                      label="Phone"
                      placeholder="Phone...."
                      {...register("contact_information.phone_no")}
                      error={errors?.phone_no}
                    />
                  </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                      label="Email Id"
                      control={control}
                      placeholder="Email...."
                      {...register("email")}
                      error={errors?.email}
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <WCFormInput
                    type="number"
                    control={control}
                    label="GST"
                    placeholder="0,1,2...."
                    icon={faStopwatch20}
                    {...register("gst")}
                    error={errors?.gst}
                    />
                  </Col>
              </Row>
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
