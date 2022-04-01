import { faHeading, faComment } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Card, Col, Form, Modal, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { notificationFormValidation } from "../validations";
import { WCFormInput } from "./wc-forminput";

export const WCSendNotification = ({ visible, onClose, onSubmitForm }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(notificationFormValidation) });
  return (
    <React.Fragment>
      <Modal size={"lg"} as={Modal.Dialog} show={visible} onHide={onClose}>
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
                    {...register("text")}
                    error={errors?.text}
                  />
                </Col>
              </Row>
              <div className="mt-3 text-right">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginRight: 15 }}
                >
                  Save
                </Button>
                <Button variant="primary" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Modal>
    </React.Fragment>
  );
};
