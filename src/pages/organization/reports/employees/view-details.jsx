import {
  Button,
  Card,
  Col,
  ListGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
const tableHeaders = [
  "Subscription",
  "Redeemed Coupon",
  "Subscription Expiry Date",
  "Revoke",
];

export const ViewDetails = ({
  visible,
  onClose,
  user,
  subscriptions,
  onPlanRevoke,
}) => {
  const { active_subscriptions, phones } = user;

  const mySubscription = (selected) => {
    let selected_subscription = subscriptions.find(
      (subscription) => subscription._id === selected
    );
    return selected_subscription.title || "__";
  };

  return (
    <Modal size="xl" as={Modal.Dialog} show={visible} onHide={onClose}>
      <Card border="light" className="bg-white shadow-sm">
        <Card.Body>
          <ListGroup.Item className="px-0">
            <Row className="align-items-center">
              <Col md={4} sm={4} xl={4} className="ms--2">
                <h4 className="h6 mb-0">
                  <a href="#!">{"Fullname"}</a>
                </h4>
                <small>{`${user?.first_name || "__"} ${
                  user?.last_name || "__"
                }`}</small>
              </Col>
              <Col md={4} sm={4} xl={4} className="ms--2">
                <h4 className="h6 mb-0">
                  <a href="#!">{"Primary Number"}</a>
                </h4>
                <small>
                  {phones.find((item) => item.type === "PRIMARY")?.no || "__"}
                </small>
              </Col>
              <Col md={4} sm={4} xl={4} className="ms--2">
                <h4 className="h6 mb-0">
                  <a href="#!">{"Secondary Number"}</a>
                </h4>
                <small>
                  {phones.find((item) => item.type === "SECONDARY")?.no || "__"}
                </small>
              </Col>
            </Row>
          </ListGroup.Item>
          <Card.Header className="border-bottom border-light d-flex justify-content-between">
            <h5 className="mb-0">Subscriptions</h5>
          </Card.Header>
          <Table
            responsive
            className="align-items-center table-flush"
            style={{ overflowX: "unset" }}
          >
            <thead className="thead-light">
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {active_subscriptions.map((item, index) => (
                <tr key={index}>
                  <td className="border-0">
                    {mySubscription(item.subscription)}
                  </td>
                  <td className="border-0">{item?.coupon_code || "__"}</td>
                  <td className="border-0">
                    {item?.subscription_end_date || "__"}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={onPlanRevoke.bind(this, item)}
                      style={{ marginRight: 5 }}
                    >
                      {"Revoke"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Modal>
  );
};
