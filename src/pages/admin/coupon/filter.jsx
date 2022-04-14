import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import {
  couponTypeOptions,
  statusOptions,
} from "../../../common/contants/selectables";

export const AdminCouponFilters = ({
  visible,
  onClose,
  onSaveFilters,
  filters,
  organizations,
}) => {
  const { handleSubmit, control } = useForm({ defaultValues: filters });
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
                    name="type"
                    control={control}
                    label={"Select Type"}
                    options={couponTypeOptions}
                  />
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormSelect
                    name="status"
                    control={control}
                    label={"Select Status"}
                    options={statusOptions}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormSelect
                    name="organization"
                    control={control}
                    label={"Select Organization"}
                    options={organizations}
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
