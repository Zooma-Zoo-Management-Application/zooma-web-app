"use client"

import { getSixmonthsRevenues } from "@/lib/api/analysis"
import { formatVND } from "@/lib/utils"
import { Fragment, useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"


export function Overview() {
  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getSixmonthsRevenues();
        const { data } = res;
        //sort data.list
        data.list.sort((a:any, b:any) => {
          return a.month - b.month;
        });

        setData(data);
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [data])


  return (
    <Fragment>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.list}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: any) => `${getMonthName(value)}`}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: any) => `${formatVND(value)}`}
                className="whitespace-nowrap"
              />
              <Bar dataKey="revenue" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
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