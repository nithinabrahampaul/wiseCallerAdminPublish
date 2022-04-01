import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import StepWizard from "react-stepper-horizontal";
import { Plan } from "./plan";
import { Subscription } from "./subscription";
import { Company } from "./company";
import BgImage from "../../../assets/images/img/illustrations/signin.svg";
import { WCBlankHeader } from "../../../common/components/wc-blank-header";

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
      <WCBlankHeader />
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <StepWizard steps={steps} activeStep={activeStep} />
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col className="pt-4">
              <Row>
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
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default OrganizationPricing;
