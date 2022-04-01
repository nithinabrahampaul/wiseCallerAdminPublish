import React, { useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoader, useSubscription } from "../../../../common/hooks";
import { WCPreLoader } from "../../../../common/components/wc-preloader";

export const Subscription = ({
  activeStep,
  onStepChange,
  onFormChange,
  subscriptionForm,
}) => {
  const { getOrganizationSubscriptions, subscriptions } = useSubscription();
  const { loading } = useLoader();

  useEffect(() => {
    let fetchAll = async () => {
      await getOrganizationSubscriptions();
    };
    fetchAll();
  }, [getOrganizationSubscriptions]);

  const onRenewSubscriptions = (subscription) => {
    onFormChange({ ...subscriptionForm, subscription: subscription });
    onStepChange(activeStep + 1);
  };

  return loading ? (
    <WCPreLoader />
  ) : (
    subscriptions.map((subscription, index) => (
      <Col xs={12} xl={4} md={12} key={index}>
        <Card className="mb-4 mb-xl-0">
          <Card.Header className="border-gray-100 py-5 px-4">
            <div className="d-flex mb-3">
              <h5 className="mb-0">₹</h5>
              <span className="price display-2 text-gray-800 mb-0">
                <span>{subscription.original_price}</span>
              </span>
              <h6 className="fw-normal align-self-end">
                / {subscription.duration} - Months
              </h6>
            </div>
            <h4 className="mb-3 text-black">{subscription.title}</h4>
          </Card.Header>
          <Card.Body className="py-5 px-4">
            {subscription.features.map((item, index) => (
              <div className="d-flex align-items-center mb-3" key={index}>
                <FontAwesomeIcon icon={faCheck} className="me-2" />
                <span>{item.text}</span>
              </div>
            ))}
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faCheck} className="me-2" />
              <span>{subscription.gst_percentage}% GST</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faCheck} className="me-2" />
              <span>{subscription.cess_percentage}% GST</span>
            </div>
          </Card.Body>
          <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
            {/* {coupons.map((item) => item.subscription === item._id) && (
              <Button
                className="w-100 btn btn-gray-800 mt-2"
                onClick={onRenewSubscriptions.bind(this, subscription)}
              >
                Renew
              </Button>
            )} */}
            <Button
              className="w-100 btn btn-gray-800 mt-2"
              onClick={onRenewSubscriptions.bind(this, subscription)}
            >
              Renew
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ))
  );
};
