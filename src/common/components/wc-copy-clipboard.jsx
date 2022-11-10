import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { WCFormInput } from "./wc-forminput";

export const WCCopyClipboard = ({ visible, onClose, paymentUrl }) => {
  const onCopyClipboard = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(paymentUrl);
    } else {
      document.execCommand("copy", true, paymentUrl);
    }
    toast.info("Copied successfully");
  };
  return (
    <Modal show={visible} onHide={onClose} size={"lg"}>
      <Form>
        <Modal.Body>
          <Row>
            <Col md={10} xl={10} sm={12}>
              <WCFormInput defaultValue={paymentUrl} disabled={true} />
            </Col>
            <Col md={2} xl={2} sm={12}>
              <Button
                type="button"
                className="w-100 btn btn-gray-800"
                onClick={onCopyClipboard.bind(this)}
              >
                <FontAwesomeIcon icon={faCopy} />
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
