import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { WCDropzone } from "../../../common/components/wc-dropzone";
import { WCFormInput } from "../../../common/components/wc-forminput";

export const TemplateForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm({
    defaultValues: initialValues,
  });

  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>Templates</Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <WCFormInput
                    label="Name"
                    placeholder="Template name"
                    error={errors?.name}
                    {...register("name")}
                  />
                </Col>
                <Col md={6}>
                  <WCFormInput
                    label="Section"
                    placeholder="Template section"
                    error={errors?.section}
                    {...register("section")}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Label>{"Image"}</Form.Label>
                  <Controller
                    name="template"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <WCDropzone onChange={onChange} imageFiles={value} />
                    )}
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
