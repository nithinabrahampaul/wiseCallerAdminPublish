import moment from "moment";
import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormDate } from "../../../common/components/wc-formdate";

import { noteFormValidation } from "../../../common/validations/auth";

export const CreateNotes = ({ visible, onClose, notesData, onSaveNotes }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(noteFormValidation),
  });

  const onHandleCreate = async (values) => {
    try {
      await onSaveNotes(values);
      onClose();
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Modal size={"lg"} as={Modal.Dialog} show={visible} onHide={onClose}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Form onSubmit={handleSubmit(onHandleCreate)}>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormInput
                    name="Text"
                    label="Text"
                    placeholder="enter name"
                    error={errors?.text}
                    {...register("text")}
                  />
                  {/* <WCFormDate
                  name="createdAt"
                  label="Created Date"
                  {...createNote("createdAt")}
               /> */}
                </Col>
              </Row>
              <div className="mt-3 text-right">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginRight: 15 }}
                >
                  Add
                </Button>
                <Button variant="primary" onClick={onClose}>
                  Clear
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Modal>
    </React.Fragment>
  );
};
