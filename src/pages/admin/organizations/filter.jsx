import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormDate } from "../../../common/components/wc-formdate";

export const AdminOrganizationFilter = ({
  visible,
  onClose,
  filters,
  onSaveFilters,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: filters,
  });

  const onHandleFilters = (values) => {
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        delete values[key];
      }

      if (key === "register_start_date" || key === "register_end_date") {
        if (value) {
          Object.assign(values, { [key]: value });
        }
      }
    }
    onSaveFilters(values);
    onClose();
  };

  return (
    <React.Fragment>
      <Modal size={"lg"} as={Modal.Dialog} show={visible} onHide={onClose}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Form onSubmit={handleSubmit(onHandleFilters)}>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormDate
                    name="register_start_date"
                    label="Select Registered Start Date"
                    control={control}
                  />
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormDate
                    name="register_end_date"
                    label="Select Registered End Date"
                    control={control}
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
