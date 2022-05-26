import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

export const WCFormDateRange = React.forwardRef(
  ({ label, name, control }, ref) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const onChangeDate = (e) => {
              setDateRange(e);
              field.onChange(e);
            };

            if (field.value) {
              setDateRange(field.value);
            }

            return (
              <DatePicker
                {...field}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                showDisabledMonthNavigation
                className="form-control"
                onChange={onChangeDate}
                placeholderText={"MM/DD/YYYY - MM/DD/YYYY"}
              />
            );
          }}
        />
      </Form.Group>
    );
  }
);
