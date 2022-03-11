import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormSelect } from "../../../common/components/wc-formselect";

const UserChangePlan = ({ show, onClose }) => {
  const { control } = useForm({});
  return (
    <Modal centered show={show} onHide={onClose} onExit={onClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please Select Your Plan
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Name" />
            <Form.Control
              type="number"
              placeholder="Amount"
              style={{ marginTop: 20 }}
            />
            <WCFormSelect
              control={control}
              placeholder={"Subscription"}
            ></WCFormSelect>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default UserChangePlan;
