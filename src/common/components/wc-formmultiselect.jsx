import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

export const WCFormMultiSelect = React.forwardRef(
  ({ label, options, name, control, value, error, ...rest }, ref) => {
    return (
      <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <ReactSelect
                defaultValue={value}
                {...rest}
                {...field}
                options={options}
              />
            );
          }}
        />
        {error && <span className="form_error">{error?.message}</span>}
      </Form.Group>
    );
  }
);
