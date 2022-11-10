import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { iconTypesOptions } from "../../../common/contants/selectables";
import { yupResolver } from "@hookform/resolvers/yup";
import { statusFormValidation } from "../../../common/validations/admin";
// import { WCFormMultiSelect } from "../../../common/components/wc-formmultiselect";

export const StatusForm = ({
  visible,
  onClose,
  onSubmitForm,
  types,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(statusFormValidation),
  });

  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>Status</Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    label="Status"
                    placeholder="Name"
                    icon={faStickyNote}
                    {...register("status")}
                    error={errors?.status}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <WCFormSelect
                    name="icon_style"
                    control={control}
                    label={"Select Icon Style"}
                    options={iconTypesOptions}
                    error={errors?.icon_style}
                  />
                  {/* <WCFormMultiSelect
                    name="applicable_types"
                    control={control}
                    label={"Select Types"}
                    options={types}
                    isMulti={true}
                    value={initialValues.applicable_types}
                    error={errors?.applicable_types}
                  /> */}
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {/* <WCFormSelect
                    name="icon_style"
                    control={control}
                    label={"Select Icon Style"}
                    options={iconTypesOptions}
                    error={errors?.icon_style}
                  /> */}
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
