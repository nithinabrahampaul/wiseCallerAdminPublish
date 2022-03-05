import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

export const WCFormSelect = React.forwardRef(
  ({ name, label, options = [], defaultValue = "", control, ...rest }, ref) => {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Form.Select {...field} {...rest}>
                <option value={""}>Please Select</option>
                {options.length &&
                  options.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </Form.Select>
            );
          }}
        />
      </Form.Group>
    );
  }
);
