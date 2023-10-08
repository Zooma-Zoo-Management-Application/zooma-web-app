"use client";

import { useState } from "react";
import Image from "next/image";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import FormWrapper from "./FormWrapper";
import { FormItems } from "@/app/tickets/page";
import { Calendar } from "@/components/ui/custom-calendar";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const DateChooseForm = ({ updateForm, date }: stepProps) => {
  const [ticketDate, setTicketDate] = useState<Date | undefined>(date)


  return (
    <FormWrapper
      title="Select your date"
      description="Select the date you want to visit the park."
    >
      <div className="flex justify-center items-center">
        <Calendar
          mode="single"
          selected={ticketDate}
          onSelect={setTicketDate}
        />
      </div>
    </FormWrapper>
  );
};

export default DateChooseForm;