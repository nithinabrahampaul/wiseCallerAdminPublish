import { useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoader, usePlans } from "../../../common/hooks";
import { WCPreLoader } from "../../../common/components/wc-preloader";

export const Plan = ({
  onPageChange,
  activeStep,
  pricingForm,
  onFormChange,
}) => {
  const { plans, getSubscriptionPlans } = usePlans();
  const { loading } = useLoader();
  useEffect(() => {
    getSubscriptionPlans(pricingForm.subscription);
  }, [getSubscriptionPlans, pricingForm]);

  const onPlanSelect = (plan, amount) => {
    onFormChange({ ...pricingForm, plan: plan, price: amount });
    onPageChange(activeStep + 1);
  };

  return loading ? (
    <WCPreLoader />
  ) : (
    plans.map((plan, index) => (
      <Col xs={12} xl={4} md={12} key={index}>
        <Card className="mb-4 mb-xl-0">
          <Card.Header className="border-gray-100 py-5 px-4">
            <div className="d-flex mb-3">
              <h5 className="mb-0">$</h5>
              <span className="price display-2 text-gray-800 mb-0">
                <span>{plan.amount}</span>
              </span>
              <h6 className="fw-normal align-self-end">/ year</h6>
            </div>
            <h4 className="mb-3 text-black">{plan.name}</h4>
          </Card.Header>
          <Card.Body className="py-5 px-4">
            <div className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faCheck} className="me-2" />
              <span>
                {plan.minSlab} - {plan.maxSlab} Subscriptions
              </span>
            </div>
          </Card.Body>
          <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
            <Button
              className="w-100 btn btn-gray-800"
              onClick={onPlanSelect.bind(this, plan._id, plan.amount)}
            >
              Select Plan
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ))
  );
};
