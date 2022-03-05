import { faCheck, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../../common/components/wc-forminput";
import { usePlans, useSubscription } from "../../../../common/hooks";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export const Plans = ({
  activeStep,
  onStepChange,
  onFormChange,
  subscriptionForm,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { plans, getSubscriptionPlans } = usePlans();
  const { onRenewSubscription, isSubscriptionRenewed } = useSubscription();
  const navigate = useNavigate();

  useEffect(() => {
    getSubscriptionPlans(subscriptionForm.subscription._id);
  }, [getSubscriptionPlans, subscriptionForm]);

  const onPlanSelect = async (values) => {
    await onRenewSubscription({
      ...subscriptionForm,
      ...values,
      plan: selectedPlan,
      price: selectedPlan.amount,
    });
  };

  useEffect(() => {
    if (isSubscriptionRenewed) {
      navigate("/organization/coupons");
    }
  }, [isSubscriptionRenewed, navigate]);

  const NumberOfSubscription = () => {
    const formValidation = yup.object().shape({
      quantity: yup
        .string()
        .required("Number of subscribers are required!")
        .test(
          "quantity",
          `Please enter the subscribers between ${selectedPlan.minSlab} - ${selectedPlan.maxSlab}`,
          (value) => {
            return true;
          }
        ),
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(formValidation),
    });

    const onSelectSubscribers = async (values) => {
      setOpen(false);
      onPlanSelect({ ...values });
    };

    return (
      <Modal show={isOpen} onHide={setOpen.bind(this, false)}>
        <Form onSubmit={handleSubmit(onSelectSubscribers)}>
          <Modal.Header closeButton>
            <Modal.Title>Subscriptions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WCFormInput
              label="Number of Subscription"
              placeholder="10"
              type="number"
              icon={faRocket}
              error={errors?.quantity}
              {...register("quantity")}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" className="w-100 btn btn-gray-800">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  const onHandleSubmitPlan = (plan) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  return (
    <React.Fragment>
      {plans.map((plan, index) => (
        <Col xs={12} xl={4} md={12} key={index}>
          <Card className="mb-4 mb-xl-0">
            <Card.Header className="border-gray-100 py-5 px-4">
              <div className="d-flex mb-3">
                <h5 className="mb-0">₹</h5>
                <span className="price display-2 text-gray-800 mb-0">
                  <span>{plan.amount}</span>
                </span>
                <h6 className="fw-normal align-self-end">
                  / {subscriptionForm.subscription.duration} - Months
                </h6>
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
              {subscriptionForm.subscription.features.map((item, index) => (
                <div className="d-flex align-items-center mb-3" key={index}>
                  <FontAwesomeIcon icon={faCheck} className="me-2" />
                  <span>{item.text}</span>
                </div>
              ))}
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon={faCheck} className="me-2" />
                <span>{subscriptionForm.subscription.gst_percentage}% GST</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon={faCheck} className="me-2" />
                <span>
                  {subscriptionForm.subscription.cess_percentage}% GST
                </span>
              </div>
            </Card.Body>
            <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
              <Button
                className="w-100 btn btn-gray-800 mt-2"
                onClick={onHandleSubmitPlan.bind(this, plan)}
              >
                Select Plan
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
      {isOpen && <NumberOfSubscription />}
    </React.Fragment>
  );
};
