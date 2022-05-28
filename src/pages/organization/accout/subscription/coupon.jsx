import React, { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { WCPreLoader } from "../../../../common/components/wc-preloader";
import { useCoupon, useLoader } from "../../../../common/hooks";

export const Coupons = ({
  subscriptionForm,
  onFormChange,
  onStepChange,
  activeStep,
}) => {
  const { coupons, getAllCoupons } = useCoupon();
  const { loading } = useLoader();

  useEffect(() => {
    getAllCoupons();
  }, [getAllCoupons, cookies]);

  const onRenewSubscription = (coupon) => {
    onFormChange({ ...subscriptionForm, coupon });
    onStepChange(activeStep + 1);
  };

  return loading ? (
    <WCPreLoader />
  ) : (
    <Col xs={12} lg={6} className="mb-4">
      <Card border="light" className="shadow-sm">
        <Card.Header className="border-bottom border-light d-flex justify-content-between">
          <h5 className="mb-0">Coupons</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup className="list-group-flush list my--3">
            {coupons.map((coupon, index) => (
              <ListGroup.Item className="px-0" key={index}>
                <Row className="align-items-center">
                  <Col className="ms--2">
                    <h4 className="h6 mb-0">
                      <a href="#!">{coupon.coupon_code}</a>
                    </h4>
                  </Col>
                  <Col className="col-auto">
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={onRenewSubscription.bind(this, coupon)}
                    >
                      {"Renew"}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
};
