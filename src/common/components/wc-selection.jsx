import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

export const WCSelection = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const checkRef = ref || defaultRef;

    useEffect(() => {
      checkRef.current.indeterminate = indeterminate;
    }, [checkRef, indeterminate]);

    return <Form.Check type="checkbox" ref={checkRef} {...rest} />;
  }
);
