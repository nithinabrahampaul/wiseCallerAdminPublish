import { Button, Card } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Slot = ({ onPageChange, activeStep }) => {
  return (
    <Card className="mb-4 mb-xl-0">
      <Card.Header className="border-gray-100 py-5 px-4">
        <div className="d-flex mb-3">
          <h5 className="mb-0">$</h5>
          <span className="price display-2 text-gray-800 mb-0">
            <span>0</span>
          </span>
          <h6 className="fw-normal align-self-end">/month</h6>
        </div>
        <h4 className="mb-3 text-black">Free trial</h4>
        <p className="fw-normal mb-0">
          If you're new to SEO or just need the basics.
        </p>
      </Card.Header>
      <Card.Body className="py-5 px-4">
        <div className="d-flex align-items-center mb-3">
          <FontAwesomeIcon icon={faCheck} className="me-2" />
          <span>Slot - 1</span>
        </div>
      </Card.Body>
      <Card.Footer className="border-gray-100 d-grid px-4 pb-4">
        <Button
          className="w-100 btn btn-gray-800"
          onClick={onPageChange.bind(this, activeStep + 1)}
        >
          Slot
        </Button>
      </Card.Footer>
    </Card>
  );
};
