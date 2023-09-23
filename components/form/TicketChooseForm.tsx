import { FormItems } from "@/app/tickets/page";
import { Checkbox } from "@/components/ui/checkbox";
import FormWrapper from "./FormWrapper";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { formatVND } from "@/lib/utils";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const TicketChooseForm = ({ tickets, yearly, updateForm }: stepProps) => {
  function handleNumberInscrease(ticketId: number) {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          quantity: ticket.quantity + 1,
        };
      }
      return ticket;
    })
    updateForm({ tickets: updatedTickets });
  }

  function handleNumberDecrease(ticketId: number) {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId) {
        if(ticket.quantity === 0) return ticket;
        return {
          ...ticket,
          quantity: ticket.quantity - 1,
        };
      }
      return ticket;
    })
    updateForm({ tickets: updatedTickets });
  }

  return (
    <FormWrapper
      title="Choose your ticket"
      description="Select the ticket you want to buy."
    >
      <div className="flex flex-col gap-3">
        {
          tickets.map((ticket) => (
            <div key={ticket.label} className='grid grid-cols-3 gap-2 justify-items-center items-center py-8'>
              <div className={`flex flex-col items-center justify-center text-dark`}>
                <h4 className='text-base sm:text-3xl font-amsi whitespace-nowrap'>{ticket.label}</h4>
                <span className='text-xs sm:text-sm font-bold whitespace-nowrap'>{ticket.description}</span>
              </div>
              <div className='flex justify-center gap-2 '>
                <Button type="button" variant="default" size="icon" onClick={() => handleNumberDecrease(ticket.id)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input type="number" value={ticket.quantity} className='w-10'/>
                <Button type="button" variant="default" size="icon" onClick={() => handleNumberInscrease(ticket.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className='text-base sm:text-2xl font-amsi whitespace-nowrap flex-1'>
                {formatVND(ticket.price)}
              </div>
            </div>
          ))
        }
        {/* {tickets.map((addOn) => (
          <div
            className={`border border-neutral-600 flex items-center gap-3 p-3 rounded-md focus:border-[#77f6aa] outline-none hover:border-[#77f6aa] md:gap-5 md:p-5`}
            key={addOn.id}
          >
            <Checkbox
              id="online-service"
              checked={addOn.checked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(addOn.id, checked as boolean)
              }
            />
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col">
                <label
                  htmlFor="online-service"
                  className="font-semibold"
                >
                  {addOn.title}
                </label>
                <p className="text-sm">{addOn.subtitle}</p>
              </div>
              <p className="text-[#77f6aa]">
                {`+$${yearly ? addOn.price * 10 : addOn.price}${
                  yearly ? "/yr" : "/mo"
                }`}
              </p>
            </div>
          </div>
        ))} */}
      </div>
    </FormWrapper>
  );
};

export default TicketChooseForm;