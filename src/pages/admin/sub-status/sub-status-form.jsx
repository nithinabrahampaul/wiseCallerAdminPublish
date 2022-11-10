import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm , Controller} from "react-hook-form";
import { WCFormInput } from "../../../common/components/wc-forminput";
import { WCFormSelect } from "../../../common/components/wc-formselect";
import { iconTypesOptions } from "../../../common/contants/selectables";
import { yupResolver } from "@hookform/resolvers/yup";
import { statusFormValidation } from "../../../common/validations/admin";
import { WCFormMultiSelect } from "../../../common/components/wc-formmultiselect";
import { WCDropzone } from "../../../common/components/wc-dropzone";
import { useEffect } from "react";

export const SubStatusForm = ({
  visible,
  onClose,
  onSubmitForm,
  initialValues = {},
  status_array = [],
  statuses,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(statusFormValidation),
  });

  useEffect(() => {
    if(Object.keys(initialValues).length) {
      if(initialValues.parentId?.length) {
        initialValues.parentId.map((item) => {
          let selectedStatus = statuses.find((status) => {
            if(status.value === item.value) {
              return status
            }
          })
          status_array.push(selectedStatus)
          if(selectedStatus) {
            reset({...initialValues, parentId: status_array})
          }
        })
      }
    }
  }, [initialValues])

  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Card border="light" className="bg-white shadow-sm">
          <Card.Body>
            <Modal.Header closeButton>SubStatus</Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <WCFormInput
                    label="Name"
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
                </Col>
                <Col md={6} className="mb-3">
                <WCFormMultiSelect
                    name="parentId"
                    control={control}
                    label={"Select Status"}
                    options={statuses}
                    isMulti={true}
                    value={initialValues.statuses}
                    error={errors?.parentId}
                  />
                </Col>
                {/* <Col md={6} className="mb-3">
                    <Form.Label>{"Status Logo"}</Form.Label>
                    <Controller
                      name="logo"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <WCDropzone onChange={onChange} imageFiles={value} />
                      )}
                    />
                </Col> */}
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
