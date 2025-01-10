"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  onChange: (value: number | undefined) => void;
}

export default function DateTimePicker({ onChange }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    updateDateTime(date || undefined);
  };

  const updateDateTime = (date: Date | undefined) => {
    if (date) {
      onChange(date.getTime());
    }
  };

  const clearValue = () => {
    setSelectedDate(null);
    onChange(undefined);
  };

  const CustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="flex space-x-2 items-center">
      <Input
        value={value}
        onClick={onClick}
        readOnly
        ref={ref}
        placeholder="Select date and time (UTC)"
      />
      <button onClick={clearValue}>Clear</button>
    </div>
  ));

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      customInput={<CustomInput />}
    />
  );
}
