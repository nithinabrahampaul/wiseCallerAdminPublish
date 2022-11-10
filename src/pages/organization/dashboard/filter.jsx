import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormDateRange } from "../../../common/components/wc-formdaterange";

export const DashboardFilter = ({
  visible,
  onClose,
  onHandleFilters,
  filters,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: filters,
  });

  const onSubmitFilters = (values) => {
    console.log(values);
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        delete values[key];
      }
    }
    console.log(values);
    onHandleFilters(values);
  };
  return (
    <React.Fragment>
      <Modal size="lg" as={Modal.Dialog} show={visible} onHide={onClose}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmitFilters)}>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormDateRange
                    control={control}
                    label="Select Date"
                    name="filtered_date"
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
