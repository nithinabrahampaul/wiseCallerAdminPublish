import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

export const WCFormSelect = React.forwardRef(
  (
    { name, label, options = [], size, placeholder, control, error, ...rest },
    ref
  ) => {
    return (
      <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Form.Select size={size} {...field} {...rest}>
                <option value={""}>
                  {placeholder ? placeholder : "Please Select"}
                </option>
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
        {error && <span className="form_error">{error?.message}</span>}
      </Form.Group>
    );
  }
);
