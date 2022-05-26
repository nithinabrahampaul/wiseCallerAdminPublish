import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormMultiSelect } from "../../../common/components/wc-formmultiselect";

export const GlobalTypesForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues = {},
  statuses,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  return (
    <Modal show={visible} onHide={onClose} size={"lg"}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>Global Types</Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12}>
                  <WCFormInput
                    label="Type"
                    placeholder="Type"
                    {...register("type")}
                    error={errors?.type}
                  />
                </Col>
                <Col md={12}>
                  <WCFormMultiSelect
                    name="statuses"
                    control={control}
                    label={"Select Status"}
                    options={statuses}
                    isMulti={true}
                    value={initialValues.statuses}
                    error={errors?.statuses}
                  />
                </Col>
              </Row>
              <Row>
                <Col></Col>
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
