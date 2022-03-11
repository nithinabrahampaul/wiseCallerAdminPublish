import { faHeading, faComment } from "@fortawesome/free-solid-svg-icons";
import { Button } from "bootstrap";
import { Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "./wc-forminput";

export const WCSendNotification = ({ visible, onClose, onSubmitForm }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  return (
    <Modal as={Modal.Dialog} show={visible} onHide={onClose}>
      <Modal.Header>{"Send Notification"}</Modal.Header>
      <Card border="light" className="bg-white shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <Row>
              <Col md={12} sm={12}>
                <WCFormInput
                  label="Title"
                  placeholder="Message Title"
                  icon={faHeading}
                  {...register("title")}
                  error={errors?.title}
                />
              </Col>
              <Col md={12} sm={12}>
                <WCFormInput
                  label="Content"
                  placeholder="Message Content"
                  icon={faComment}
                  {...register("content")}
                  error={errors?.content}
                />
              </Col>
            </Row>
            <div className="mt-3 text-right">
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: 15 }}
              >
                Filter
              </Button>
              {/* <Button variant="primary" onClick={onClose}>
                Clear
              </Button> */}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Modal>
  );
};
