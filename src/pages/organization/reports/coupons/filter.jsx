import moment from "moment";
import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormDate } from "../../../../common/components/wc-formdate";
import { WCFormSelect } from "../../../../common/components/wc-formselect";

export const CouponFilter = ({
  visible,
  onClose,
  filters,
  onSaveFilters,
  plans,
  coupons,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: filters,
  });

  const onHandleFilters = (values) => {
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        delete values[key];
      }

      if (key === "generated_date") {
        if (value) {
          Object.assign(values, { [key]: moment(value).toISOString() });
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
                  <WCFormSelect
                    name="subscription"
                    control={control}
                    label={"Select Plan"}
                    options={plans}
                  />
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormDate
                    name="generated_date"
                    label="Select Date"
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
