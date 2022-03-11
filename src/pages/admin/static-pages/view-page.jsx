import React from "react";
import { Card, Modal } from "react-bootstrap";

export const ViewPage = ({ visible, onClose, page }) => {
  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Card border="light" className="bg-white shadow-sm">
        <Card.Body>
          <Modal.Header closeButton>{page.name}</Modal.Header>
          <Modal.Body
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></Modal.Body>
        </Card.Body>
      </Card>
    </Modal>
  );
};
