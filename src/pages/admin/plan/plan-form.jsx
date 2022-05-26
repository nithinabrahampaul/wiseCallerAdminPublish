import {
  faCheckCircle,
  faRupeeSign,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { planFormValidation } from "../../../common/validations/admin";

export const PlanForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues,
  subscriptions,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(planFormValidation),
  });
  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>Plan</Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    label="Name"
                    placeholder="Plan name"
                    icon={faTasks}
                    {...register("name")}
                    error={errors?.name}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <WCFormSelect
                    name="subscription"
                    control={control}
                    label={"Select Subscription"}
                    options={subscriptions}
                    error={errors?.subscription}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    type="number"
                    label="Price"
                    placeholder="Price"
                    icon={faRupeeSign}
                    {...register("amount")}
                    error={errors?.amount}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    type="number"
                    label="Discount"
                    placeholder="Discount"
                    icon={faRupeeSign}
                    {...register("discount")}
                    error={errors?.discount}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    type="number"
                    label="Minimum Slot"
                    placeholder="Minimum Slot"
                    icon={faCheckCircle}
                    {...register("minSlab")}
                    error={errors?.minSlab}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    type="number"
                    label="Maximum Slot"
                    placeholder="Maximum Slot"
                    icon={faCheckCircle}
                    {...register("maxSlab")}
                    error={errors?.maxSlab}
                  />
                </Col>
              </Row>
            </Modal.Body>
          </Card.Body>
          <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
            <Button type="submit" className="w-100 btn btn-gray-800">
              Save
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </Modal>
  );
};
