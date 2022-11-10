import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { yupResolver } from "@hookform/resolvers/yup";
import { notesFormValidation } from "../../../common/validations/admin";

export const NotesForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues,
  types,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(notesFormValidation),
  });

  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>Notes</Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={12} className="mb-3">
                  <WCFormSelect
                    name="type"
                    control={control}
                    label={"Select Type"}
                    options={types}
                    error={errors?.type}
                  />
                </Col>
                {/* <Col md={6} className="mb-3">
                  <WCFormSelect
                    name="is_custom"
                    control={control}
                    label={"Custom"}
                    options={statusOptions}
                    error={errors?.is_custom}
                  />
                </Col> */}
              </Row>
              <Row>
                <Col>
                  <WCFormInput
                    label="Text"
                    placeholder="Text...."
                    icon={faStickyNote}
                    {...register("text")}
                    error={errors?.text}
                  />
                </Col>
              </Row>
              {/* <Row>
                <Col md={6}>
                  <WCFormSelect
                    name="display_to"
                    control={control}
                    label={"Display"}
                    options={displayOption}
                    error={errors?.display_to}
                  />
                </Col>
                <Col md={6}>
                  <WCFormSelect
                    name="auto_sms"
                    control={control}
                    label={"Auto SMS"}
                    options={statusOptions}
                    error={errors?.auto_sms}
                  />
                </Col>
              </Row> */}
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
