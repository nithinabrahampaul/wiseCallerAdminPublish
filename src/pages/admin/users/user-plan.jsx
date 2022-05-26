import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormSelect } from "../../../common/components/wc-formselect";

const UserChangePlan = ({
  visible,
  onClose,
  plans,
  onChangePlan,
  selectedSubscription,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: { subscription: selectedSubscription.subscription },
  });
  return (
    <Modal as={Modal.Dialog} show={visible} onHide={onClose}>
      <Card border="light" className="bg-white shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit(onChangePlan)}>
            <Row>
              <Col md={12} sm={12} className="mb-3">
                <WCFormSelect
                  name="subscription"
                  control={control}
                  label={"Select Plan"}
                  options={plans}
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
  );
};
export default UserChangePlan;
