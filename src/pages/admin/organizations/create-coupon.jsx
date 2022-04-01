import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { couponFormValidation } from "../../../common/validations/admin";

export const CreateCoupons = ({
  visible,
  onClose,
  onSaveCoupon,
  subscriptions,
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(couponFormValidation) });

  const onHandleCreate = async (values) => {
    try {
      onSaveCoupon(values);
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
                <Col md={6} sm={12}>
                  <WCFormInput
                    label="Name"
                    placeholder="Enter Code"
                    error={errors?.coupon_code}
                    {...register("coupon_code")}
                  />
                </Col>
                <Col md={6} sm={12}>
                  <WCFormInput
                    type="number"
                    label="Total Slots"
                    placeholder="Enter Slots"
                    error={errors?.total_subscription}
                    {...register("total_subscription")}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={12}>
                  <WCFormInput
                    type="number"
                    label="Price"
                    placeholder="Enter Price"
                    error={errors?.price}
                    {...register("price")}
                  />
                </Col>
                <Col md={6} sm={12}>
                  <WCFormInput
                    type="number"
                    label="Discounted Price"
                    placeholder="Enter Discounted Price"
                    error={errors?.discount_price}
                    {...register("discount_price")}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} sm={12}>
                  <WCFormSelect
                    name="subscription"
                    control={control}
                    error={errors?.subscription}
                    label={"Select Subscription"}
                    options={subscriptions}
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
