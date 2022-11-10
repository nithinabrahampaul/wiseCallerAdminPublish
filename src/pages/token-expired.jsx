import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import NotFoundImage from "../assets/images/img/illustrations/404.svg";

const TokenExpired = () => {
  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <Container>
        <Row>
          <Col
            xs={12}
            className="text-center d-flex align-items-center justify-content-center"
          >
            <div>
              <Card.Link>
                <Image src={NotFoundImage} className="img-fluid w-75" />
              </Card.Link>
              <h1 className="text-primary mt-5">Token Expired</h1>
              <p className="lead my-4">
                Oops! Looks like you followed a your payment link is expired. If
                you think this is a problem with us, please tell us.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TokenExpired;
