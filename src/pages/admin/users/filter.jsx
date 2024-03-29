import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormDateRange } from "../../../common/components/wc-formdaterange";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { statusOptions } from "../../../common/contants";

export const AdminUserFilter = ({
  visible,
  onClose,
  filters,
  onSaveFilters,
  plans,
  coupons,
  organizations,
}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: filters,
  });

  const onHandleFilters = (values) => {
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        delete values[key];
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
                  <WCFormSelect
                    name="coupon_code"
                    control={control}
                    label={"Select Coupon"}
                    options={coupons}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormDateRange
                    name="registered_date"
                    label="Select Registered Date"
                    control={control}
                  />
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormDateRange
                    name="subscribed_date"
                    label="Select Subscribed Date"
                    control={control}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormSelect
                    name="road_safety"
                    control={control}
                    label={"Select Road Safety"}
                    options={statusOptions}
                  />
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormSelect
                    name="calender_sync"
                    control={control}
                    label={"Select Calender Sync"}
                    options={statusOptions}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormSelect
                    name="work_life_balance"
                    control={control}
                    label={"Select Worklife Balance"}
                    options={statusOptions}
                  />
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormSelect
                    name="organization"
                    control={control}
                    label={"Select Organization"}
                    options={organizations}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormSelect
                    name="is_active"
                    control={control}
                    label={"Select Status"}
                    options={statusOptions}
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
