import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Fragment } from "react";
import { formatVND } from "@/lib/utils";

export function RecentSales({data, isLoading}: {data: any, isLoading: boolean}) {
  return (
    <div className="space-y-8">
      {
        isLoading ? (
          <Fragment>
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </Fragment>
        ) : (
          <Fragment>
            {
              data.map((order:any, index:number) => (
                <div key={order.id+order.orderDate} className="flex items-center">
                  <Avatar className="h-12 w-12 ml-4">
                    <AvatarImage src={order.user?.avatarUrl} alt={order.user?.userName} />
                    <AvatarFallback>{order.user?.userName}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{
                      order.user.userName
                    }</p>
                    <p className="text-sm text-muted-foreground">
                      {order.user.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+{formatVND(order.totalPrice)}</div>
                </div>
              ))
            }
          </Fragment>
        )
      }
    </div>
  )
}