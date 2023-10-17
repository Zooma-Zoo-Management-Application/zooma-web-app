"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import useOrder from "@/stores/order-store"

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { order, setDate } = useOrder()

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal rounded-e-none",
              !order.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {order.date ? (
              <React.Fragment>
                {format(order.date, "LLLL dd, y")}
              </React.Fragment>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            // mode="range"
            defaultMonth={order.date}
            selected={order.date}
            onDayClick={(day) => setDate(day)}
            disabled={{ before: new Date() }}
            // numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}