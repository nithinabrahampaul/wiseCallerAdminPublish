import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

export const WCFormDateRange = ({ label, name, control }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          let startValue = null;
          let endValue = null;
          if (field.value) {
            const [startDate, endDate] = field.value;
            startValue = startDate;
            endValue = endDate;
          }
          const onChangeDate = (e) => {
            field.onChange(e);
          };

          return (
            <DatePicker
              {...field}
              selectsRange={true}
              startDate={startValue}
              endDate={endValue}
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
};
