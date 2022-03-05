import React, { useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import StepWizard from "react-stepper-horizontal";
import { Plans } from "./plan";
import { Subscription } from "./subscriptions";
import { Coupons } from "./coupon";

let steps = [
  { title: "Coupons" },
  { title: "Subscription" },
  { title: "Plan" },
];

const OrganizationAccountSubscription = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [subscriptionForm, setSubscriptionForm] = useState({});

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>{"My Subscription"}</h4>
        </div>
      </div>
      <Container fluid>
        <StepWizard steps={steps} activeStep={activeStep} />
        <Col className="pt-4">
          <Row>
            {activeStep === 0 && (
              <Coupons
                activeStep={activeStep}
                onStepChange={setActiveStep}
                onFormChange={setSubscriptionForm}
                subscriptionForm={subscriptionForm}
              />
            )}
            {activeStep === 1 && (
              <Subscription
                activeStep={activeStep}
                onStepChange={setActiveStep}
                onFormChange={setSubscriptionForm}
                subscriptionForm={subscriptionForm}
              />
            )}

            {activeStep === 2 && (
              <Plans
                activeStep={activeStep}
                onStepChange={setActiveStep}
                onFormChange={setSubscriptionForm}
                subscriptionForm={subscriptionForm}
              />
            )}
          </Row>
        </Col>
      </Container>
    </React.Fragment>
  );
};

export default OrganizationAccountSubscription;
