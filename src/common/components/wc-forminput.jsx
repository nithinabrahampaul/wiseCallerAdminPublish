import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export const WCFormInput = React.forwardRef(
  ({ label, placeholder, type = "text", icon, error, ...rest }, ref) => {
    return (
      <Form.Group className="mb-4">
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup>
          {icon && (
            <InputGroup.Text>
              <FontAwesomeIcon icon={icon} />
            </InputGroup.Text>
          )}
          <Form.Control
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...rest}
          />
        </InputGroup>
        {error && <span className="form_error">{error?.message}</span>}
      </Form.Group>
    );
  }
);
