"use client";

import { useState } from "react";
import Image from "next/image";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import FormWrapper from "./FormWrapper";
import { FormItems } from "@/app/tickets/page";
import { Calendar } from "@/components/ui/custom-calendar";
import useOrder from "@/stores/order-store";

const DateChooseForm = () => {
  const { order, setDate } = useOrder()

  return (
    <FormWrapper
      title="Select your date"
      description="Select the date you want to visit the park."
    >
      <div className="flex justify-center items-center">
        <Calendar
          mode="single"
          selected={order.date}
          onSelect={(date) => setDate(date || new Date())}
          disabled={{ before: new Date() }}
        />
      </div>
    </FormWrapper>
  );
};

export default DateChooseForm;