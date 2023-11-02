"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { formatVND } from "@/lib/utils"
import { Fragment, useEffect, useState } from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


export function Analytics({data, isLoading}: {data: any, isLoading: boolean}) {
  return (
    <Fragment>
      {
        isLoading ? (
          <div className="grid grid-cols-6 h-80 gap-x-2 w-full">
            <Skeleton className="col-span-1 w-full h-full" />
            <Skeleton className="col-span-1 w-full h-full" />
            <Skeleton className="col-span-1 w-full h-full" />
            <Skeleton className="col-span-1 w-full h-full" />
            <Skeleton className="col-span-1 w-full h-full" />
            <Skeleton className="col-span-1 w-full h-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data.sort(
              (a:any, b:any) => a.month - b.month
            )}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: any) => `${getMonthName(value)}`}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: any) => `${(value)} tickets`}
                stroke="#82ca9d"
                className="whitespace-nowrap"
              />
              <Area type="monotone" dataKey="adultTickets" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="childTickets" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="seniorTickets" stackId="1" stroke="#ffc658" fill="#ffc658" />
              <Tooltip 
              labelFormatter={(value) => `Month: ${getMonthName(value)}`}
              formatter={(value, name, props) => {
                if(name === "revenue") {
                  return [formatVND(+value), "Total In-Month Revenue: "]
                }
                else{
                  return [value, name]
                }
              }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      }
    </Fragment>
  )
}

function getMonthName(monthNumber:number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'short',
  });
}