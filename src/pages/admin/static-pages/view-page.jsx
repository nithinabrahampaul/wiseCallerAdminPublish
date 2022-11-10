import React from "react";
import { Card, Modal } from "react-bootstrap";
import { staticPageOptions } from "../../../common/contants/selectables";

export const ViewPage = ({ visible, onClose, page }) => {
  return (
    <Modal show={visible} onHide={onClose} size={"xl"}>
      <Card border="light" className="bg-white shadow-sm">
        <Card.Body>
          <Modal.Header closeButton>
            {staticPageOptions.find((item) => item.value === page.name).label}
          </Modal.Header>
          <Modal.Body
            dangerouslySetInnerHTML={{ __html: page.content }}
          ></Modal.Body>
        </Card.Body>
      </Card>
    </Modal>
  );
};
