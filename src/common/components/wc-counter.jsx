import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Row } from "react-bootstrap";

export const WCCounter = ({ count, title, icon }) => {
  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-xl-flex align-items-center">
          <Col
            xl={5}
            className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
          >
            <div
              className={`icon icon-shape icon-md icon-shape-secondary rounded me-4 me-sm-0`}
            >
              <FontAwesomeIcon icon={icon} />
            </div>
            <div className="d-sm-none">
              <h5>{title}</h5>
              <h3 className="mb-1">{count}</h3>
            </div>
          </Col>
          <Col xs={12} xl={7} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{title}</h5>
              <h3 className="mb-1">{count}</h3>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
