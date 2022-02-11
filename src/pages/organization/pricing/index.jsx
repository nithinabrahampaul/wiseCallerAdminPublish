import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import StepWizard from "react-stepper-horizontal";
import { Plan } from "./plan";
import { Subscription } from "./subscription";
import { Company } from "./company";

let steps = [
  { title: "Subscription" },
  { title: "Plan" },
  { title: "Company" },
];

const OrganizationPricing = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [pricingForm, setPricingForm] = useState({});

  return (
    <React.Fragment>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <StepWizard steps={steps} activeStep={activeStep} />
          <Col className="pt-4">
            {activeStep === 0 && (
              <Subscription
                onPageChange={setActiveStep}
                activeStep={activeStep}
                onFormChange={setPricingForm}
                pricingForm={pricingForm}
              />
            )}
            {activeStep === 1 && (
              <Plan
                onPageChange={setActiveStep}
                activeStep={activeStep}
                onFormChange={setPricingForm}
                pricingForm={pricingForm}
              />
            )}
            {activeStep === 2 && (
              <Company
                onPageChange={setActiveStep}
                activeStep={activeStep}
                onFormChange={setPricingForm}
                pricingForm={pricingForm}
              />
            )}
          </Col>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default OrganizationPricing;
