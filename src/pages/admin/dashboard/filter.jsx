import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormDate } from "../../../common/components/wc-formdate";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { rangeFilterFormValidation } from "../../../common/validations";

export const DashboardFilter = ({
  visible,
  onClose,
  onHandleFilters,
  filters,
  organizations,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: filters,
    resolver: yupResolver(rangeFilterFormValidation),
  });
  return (
    <React.Fragment>
      <Modal size="lg" as={Modal.Dialog} show={visible} onHide={onClose}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Form onSubmit={handleSubmit(onHandleFilters)}>
              <Row>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormDate
                    name="start_date"
                    label="Start Date"
                    control={control}
                    error={errors?.start_date}
                  />
                </Col>
                <Col md={6} sm={12} className="mb-3">
                  <WCFormDate
                    name="end_date"
                    label="End Date"
                    control={control}
                    error={errors?.end_date}
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
