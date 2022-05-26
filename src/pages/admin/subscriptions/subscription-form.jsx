import {
  faBolt,
  faMinusCircle,
  faPlusCircle,
  faRupeeSign,
  faStickyNote,
  faStopwatch20,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  subscriptionFormValidation,
  featureFormValidation,
} from "../../../common/validations/admin";
import { typeOptions } from "../../../common/contants/selectables";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SubscriptionForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues,
}) => {
  const [features, setFeatures] = useState([{ feature: "", text: "" }]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(subscriptionFormValidation),
  });

  useEffect(() => {
    if (Object.keys(initialValues).length) {
      setFeatures([...features, ...initialValues.features]);
    }
  }, [initialValues, features]);

  const onSubmitFeature = (values) => {
    let temp_features = [...features];
    temp_features.push(values);
    setFeatures(temp_features);
  };

  const onRemoveFeature = (index) => {
    let temp_features = [...features];
    temp_features.splice(index, 1);
    setFeatures(temp_features);
  };

  const FeatureComponent = ({ feature, index }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: feature,
      resolver: yupResolver(featureFormValidation),
    });
    return (
      <Row className="align-items-center">
        <Col md={5}>
          <WCFormInput
            placeholder="Feature"
            {...register("feature")}
            error={errors?.feature}
          />
        </Col>
        <Col md={6}>
          <WCFormInput
            placeholder="Description"
            {...register("text")}
            error={errors?.text}
          />
        </Col>
        <Col md={1}>
          <ButtonGroup>
            {!feature?.feature ? (
              <Button
                type="button"
                variant="link"
                onClick={handleSubmit(onSubmitFeature)}
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </span>
              </Button>
            ) : (
              <Button
                type="button"
                variant="link"
                onClick={onRemoveFeature.bind(this, index)}
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faMinusCircle} />
                </span>
              </Button>
            )}
          </ButtonGroup>
        </Col>
      </Row>
    );
  };

  const onSubscriptionForm = (values) => {
    let temp_features = [...features];
    temp_features.shift();
    onSubmitForm({ ...values, features: temp_features });
  };

  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Form onSubmit={handleSubmit(onSubscriptionForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>Subscriptions</Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <WCFormInput
                    label="Name"
                    placeholder="Name"
                    icon={faStickyNote}
                    {...register("title")}
                    error={errors?.title}
                  />
                </Col>
                <Col md={6}>
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
                <Col md={6}>
                  <WCFormInput
                    type="number"
                    label="CESS"
                    placeholder="0.00"
                    icon={faBolt}
                    {...register("cess_percentage")}
                    error={errors?.cess_percentage}
                  />
                </Col>
                <Col md={6}>
                  <WCFormInput
                    type="number"
                    label="GST"
                    placeholder="0.00"
                    icon={faBolt}
                    {...register("gst_percentage")}
                    error={errors?.gst_percentage}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <WCFormInput
                    type="number"
                    label="Original Price"
                    placeholder="0.00"
                    icon={faRupeeSign}
                    {...register("original_price")}
                    error={errors?.original_price}
                  />
                </Col>
                <Col md={6}>
                  <WCFormInput
                    type="number"
                    label="Duration"
                    placeholder="0 Months"
                    icon={faStopwatch20}
                    {...register("duration")}
                    error={errors?.duration}
                  />
                </Col>
              </Row>
              <Row>
                <Form.Label>{"Features"}</Form.Label>
                {features.map((item, index) => (
                  <FeatureComponent key={index} feature={item} index={index} />
                ))}
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
