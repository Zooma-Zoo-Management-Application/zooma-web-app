"use client"

import { Overview } from "@/app/dashboard/components/Overview"
import { RecentSales } from "@/app/dashboard/components/RecentSales"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { getSixmonthsAbalysis } from "@/lib/api/analysis"
import { formatVND } from "@/lib/utils"
import { BaggageClaim, Ticket } from "lucide-react"
import { Fragment, useEffect, useState } from "react"
import { Analytics } from "./components/Analytics"
import { PieAnalyst } from "./components/Pie"
import { withProtected } from "@/hooks/useAuth"

function DashboardPage() {
  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getSixmonthsAbalysis();
        const { data } = res;
        // data.list.sort((a:any, b:any) => {
        //   return a.month - b.month;
        // });
        setData(data);
      } catch (err: any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [])

  return (
    <Fragment>
      <div className="flex-col md:flex w-full">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
              {/* <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2 lg:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {
                      isLoading ? (
                        <Skeleton className="w-full h-7" />
                      ) : (
                        <div className="text-2xl font-bold">{formatVND(data.totalRevenue)}</div>
                      )
                    }
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Tickets
                    </CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {
                      isLoading ? (
                        <Skeleton className="w-full h-7" />
                      ) : (
                        <div className="text-2xl font-bold">{data.totalTickets}</div>
                      )
                    }
                    <p className="text-xs text-muted-foreground">
                      In 6 months
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Successful Orders</CardTitle>
                    <BaggageClaim className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                  {
                      isLoading ? (
                        <Skeleton className="w-full h-7" />
                      ) : (
                        <div className="text-2xl font-bold">{data.totalSuccessOrders}</div>
                      )
                    }
                    <p className="text-xs text-muted-foreground">
                    In 6 months
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={data.revenue} isLoading={isLoading} />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    {/* <CardDescription>
                      You made 265 sales this month.
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <RecentSales data={data.recentOrders} isLoading={isLoading} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Staffs
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {
                      isLoading ? (
                        <Skeleton className="w-full h-7" />
                      ) : (
                        <div className="text-2xl font-bold">{data.usersQuantity.staffs}</div>
                      )
                    }
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Visitors
                    </CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {
                      isLoading ? (
                        <Skeleton className="w-full h-7" />
                      ) : (
                        <div className="text-2xl font-bold">{data.usersQuantity.visitors}</div>
                      )
                    }
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Zoo Trainers</CardTitle>
                    <BaggageClaim className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                  {
                      isLoading ? (
                        <Skeleton className="w-full h-7" />
                      ) : (
                        <div className="text-2xl font-bold">{data.usersQuantity.zooTrainers}</div>
                      )
                    }
                    <p className="text-xs text-muted-foreground">
                    In 6 months
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Analytics data={data.tickets} isLoading={isLoading} />
                  </CardContent>
                </Card>
                {/* <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <PieAnalyst data={data.revenue} isLoading={isLoading} />
                  </CardContent>
                </Card> */}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Fragment>
  )
}

export default withProtected(DashboardPage)