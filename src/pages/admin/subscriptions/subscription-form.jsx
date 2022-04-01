import { faStickyNote, faStopwatch20 } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { yupResolver } from "@hookform/resolvers/yup";
import { subscriptionFormValidation } from "../../../common/validations/admin";
import { typeOptions } from "../../../common/contants/selectables";

export const SubscriptionForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(subscriptionFormValidation),
  });

  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>Subscriptions</Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    label="Name"
                    placeholder="Name...."
                    icon={faStickyNote}
                    {...register("title")}
                    error={errors?.title}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <WCFormSelect
                    name="type"
                    control={control}
                    label={"Type"}
                    options={typeOptions}
                    error={errors?.type}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                      type="number"
                      label="CESS"
                      placeholder="0,1,2...."
                      icon={faStopwatch20}
                      {...register("cess_percentage")}
                      error={errors?.cess_percentage}
                    />
                </Col>
                <Col md={6} className="mb-3">
                  <WCFormInput
                        type="number"
                        label="GST"
                        placeholder="0,1,2...."
                        icon={faStopwatch20}
                        {...register("gst_percentage")}
                        error={errors?.gst_percentage}
                      />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                      type="number"
                      label="Original Price"
                      placeholder="0,1,2...."
                      icon={faStopwatch20}
                      {...register("original_price")}
                      error={errors?.original_price}
                    />
                </Col>
                <Col md={6} className="mb-3">
                  <WCFormInput
                        type="number"
                        label="Duration"
                        placeholder="0,1,2...."
                        icon={faStopwatch20}
                        {...register("duration")}
                        error={errors?.duration}
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
