"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { PieChart } from "lucide-react"
import { Fragment } from "react"
import { Pie, ResponsiveContainer, Tooltip } from "recharts"


export function PieAnalyst({data, isLoading}: {data: any, isLoading: boolean}) {
  return (
    <Fragment>
      {
        isLoading ? (
          <div className="grid grid-cols-6 h-80 gap-x-2 w-80">
            <Skeleton className="col-span-1 w-full h-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="revenue"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Pie dataKey="revenue" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
              <Tooltip />
            </PieChart>
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