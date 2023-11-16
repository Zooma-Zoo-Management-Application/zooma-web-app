"use client";

import { useState, useEffect } from "react";
import FormWrapper from "./FormWrapper";
import { Separator } from "@/components/ui/separator";
import { FormItems } from "@/app/tickets/page";
import useOrder from "@/stores/order-store";
import { formatVND } from "@/lib/utils";

type StepProps = FormItems & {
  goTo: (index: number) => void;
};

const FinalStep = ({ goTo }: StepProps) => {
  
  const { order, getTotalPrice, } = useOrder()

  if(order.currentUser == null) return <>Please login or sign up to continue</> 

  return (
    <FormWrapper
      title="Finishing Up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="px-4 pt-2 mb-8 rounded-sm">
        <div className="">
          {
            order.currentUser && (
              <div>
                <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                  <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10" placeholder="your.email@gmail.com" disabled value={order.currentUser.email} />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          }

          <div className="my-4 space-y-4">
            {
              order.tickets.map(ticket => {
                if(ticket.quantity === 0) return <></>

                return (
                  <div key={ticket.name} className="flex justify-between items-center">
                    <div>
                      <h4>{ticket.quantity}x {ticket.name}</h4>
                      <span>{ticket.description}</span>
                    </div>
                    <div>
                    {formatVND(ticket.price)}
                    </div>
                  </div>
                )
              })
            }
          </div>
          
          {/* <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">$399.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">$8.00</p>
            </div>
          </div> */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">{formatVND(getTotalPrice())}</p>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default FinalStep;