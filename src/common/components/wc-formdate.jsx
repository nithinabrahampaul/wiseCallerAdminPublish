import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import DateTimePicker from "react-datetime";
import { Controller } from "react-hook-form";
import moment from "moment";

export const WCFormDate = React.forwardRef(({ name, label, control }, ref) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <DateTimePicker
              timeFormat
              {...field}
              renderInput={(props, openCalender) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    value={
                      field.value
                        ? moment(field.value).format("MM/DD/YYYY")
                        : ""
                    }
                    placeholder="MM/DD/YYYY"
                    onFocus={openCalender}
                    onChange={() => {}}
                  />
                </InputGroup>
              )}
            />
          );
        }}
      />
    </Form.Group>
  );
});
