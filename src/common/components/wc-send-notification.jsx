import { faHeading, faComment } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Col, Form, Modal, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { notificationTypeOptions } from "../contants/selectables";
import { notificationFormValidation } from "../validations";
import { WCDropzone } from "./wc-dropzone";
import { WCFormInput } from "./wc-forminput";
import { WCFormSelect } from "./wc-formselect";

export const WCSendNotification = ({ visible, onClose, onSubmitForm }) => {
  const [notificationType, setNotificationType] = useState(null);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
  } = useForm({ resolver: yupResolver(notificationFormValidation) });

  const fields = watch("type");

  useEffect(() => {
    setNotificationType(fields);
  }, [fields]);

  return (
    <React.Fragment>
      <Modal size={"lg"} as={Modal.Dialog} show={visible} onHide={onClose}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <Row>
                <Col md={12} sm={12} className="mb-3">
                  <WCFormSelect
                    name="type"
                    control={control}
                    label={"Select Type"}
                    options={notificationTypeOptions}
                  />
                </Col>
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
                  {notificationType === "CLICK_ACTION_IMAGE" ? (
                    <React.Fragment>
                      <Form.Label>{"Image"}</Form.Label>
                      <Controller
                        name="image"
                        control={control}
                        render={({ field: { onChange } }) => (
                          <WCDropzone onChange={onChange} />
                        )}
                      />
                    </React.Fragment>
                  ) : (
                    <WCFormInput
                      label={
                        notificationType === "CLICK_ACTION_URL"
                          ? "URL"
                          : "Content"
                      }
                      placeholder={
                        notificationType === "CLICK_ACTION_URL"
                          ? "URL"
                          : "Content"
                      }
                      icon={faComment}
                      {...register("text")}
                      error={errors?.text}
                    />
                  )}
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
