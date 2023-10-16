import { FormItems } from "@/app/tickets/page";
import { Checkbox } from "@/components/ui/checkbox";
import FormWrapper from "./FormWrapper";
import { Button } from "../../../../components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { formatVND } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useOrder from "@/stores/order-store";

type stepProps = {
  isLoading: boolean;
};

const TicketChooseForm = ({ isLoading }: stepProps) => {
  const {order, increaseTicketById, decreaseTicketById} = useOrder();

  return (
    <FormWrapper
      title="Choose your ticket"
      description="Select the ticket you want to buy."
    >
      {
        isLoading ? (<>
        <div className="flex items-center space-x-4">
          <div className="space-y-6 grid-cols-3 w-full">
            <Skeleton className="h-16 w-full col-span-1"/>
            <Skeleton className="h-16 w-full col-span-1"/>
            <Skeleton className="h-16 w-full col-span-1"/>
          </div>
          <div className="space-y-6 grid-cols-3 w-full">
            <Skeleton className="h-16 w-full col-span-1"/>
            <Skeleton className="h-16 w-full col-span-1"/>
            <Skeleton className="h-16 w-full col-span-1"/>
          </div>
          <div className="space-y-6 grid-cols-3 w-full">
            <Skeleton className="h-16 w-full col-span-1"/>
            <Skeleton className="h-16 w-full col-span-1"/>
            <Skeleton className="h-16 w-full col-span-1"/>
          </div>
        </div>
        </>) : (
          <div className="flex flex-col gap-3">
        {
          order.tickets.map((ticket) => (
            <div key={ticket.name} className='grid grid-cols-3 gap-2 justify-items-center items-center py-8'>
              <div className={`flex flex-col items-center justify-center text-dark`}>
                <h4 className='text-base sm:text-3xl font-amsi whitespace-nowrap'>{ticket.name}</h4>
                <span className='text-xs sm:text-sm font-bold whitespace-nowrap'>{ticket.description}</span>
              </div>
              <div className='flex justify-center gap-2 '>
                <Button type="button" variant="default" size="icon" onClick={() => decreaseTicketById(ticket.id)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input type="number" value={ticket.quantity} className='w-10'/>
                <Button type="button" variant="default" size="icon" onClick={() => increaseTicketById(ticket.id)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className='text-base sm:text-2xl font-amsi whitespace-nowrap flex-1'>
                {formatVND(ticket.price)}
              </div>
            </div>
          ))
        }
      </div>
        )
      }
    </FormWrapper>
  );
};

export default TicketChooseForm;