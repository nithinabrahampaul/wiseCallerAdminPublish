import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const TemplateForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues,
}) => {
  const { handleSubmit } = useForm({
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
                <Col md={12} className="mb-3">
                  {/* <WCFormSelect
                    name="name"
                    control={control}
                    label={"Select HTML Page"}
                    options={staticPageOptions}
                  /> */}
                </Col>
                {/* <Col md={12} className="mb-3">
                  <Form.Group className="mb-4">
                    <Form.Label>{"Content"}</Form.Label>
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => <WCEditor {...field} />}
                    />
                  </Form.Group>
                </Col> */}
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
