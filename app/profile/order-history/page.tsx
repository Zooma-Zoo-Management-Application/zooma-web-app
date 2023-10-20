"use client"

import ImageWithTextSkeleton from '@/app/dashboard/components/ImageWithTextSkeleton';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getOrders, getOrdersByUserId } from '@/lib/api/orderAPI';
import { formatVND, getImageOfTicket, getImageOfTicketById } from '@/lib/utils';
import useUserState from '@/stores/user-store';
import { Order } from '@/types/Order';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {currentUser} = useUserState();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      try {
        if(currentUser == null) return <h1>You need to login</h1>;
        const { data } = await getOrdersByUserId(currentUser.id);
        if(data != null) setOrders(data)
      } catch (error:any) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [currentUser])

  return (
    <div className='min-h-[50vh]'>
      {
        isLoading ? (
          <ImageWithTextSkeleton />
        ) : (
          <ol className="relative border-l pl-10 border-gray-200">
            {
              orders.length === 0 ? (
                <h1>Your ticket is empty</h1>
              ) : (
                orders.map((order, index) => {

                return (
                  <li key={order.id+order.orderDate} className="mb-10 ml-6">            
                    <Collapsible>
                      <CollapsibleTrigger className='w-full'>
                        <span className={
                          twMerge("absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8", getStatus(order.status).ring)
                        }>
                          <Calendar className="w-6 h-6"/>
                        </span>
                        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                          Your order at Zooma
                          {
                            index === 0 && <span className="bg-gray-200 text-black-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 ml-3">Latest</span>
                          }
                          <span className={twMerge("text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3", getStatus(order.status).color)}>{
                            getStatus(order.status).text
            }</span>
                        </h3>
                        <time className="block text-left mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                          Order on {format(new Date(order.orderDate), 'MMMM dd, yyyy')}
                        </time>
                        <p className="mb-4 text-left text-base font-normal text-gray-700 dark:text-gray-400">
                        Payment method: {order.paymentMethod}<br />
                          Total: {formatVND(order.totalPrice)}
                        </p>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='space-y-4'>
                        {
                          order.orderDetails === null ? (
                            <h1>Your ticket is empty</h1>
                          ) : (
                            order.orderDetails.map((orderDetail:any) => {
                              if(orderDetail.quantity === 0) return <Fragment></Fragment>
                              return (
                                <div key={orderDetail?.ticketId+orderDetail?.name} className="flex justify-between items-center gap-4">
                                  <div>
                                    <Image
                                      src={getImageOfTicketById(orderDetail?.ticketId)}
                                      width={50}
                                      height={50}
                                      alt="ds"
                                    />
                                  </div>
                                  <div className='flex-1'>
                                    <h4 className='flex items-center'>{orderDetail.quantity}x {orderDetail.ticket.name}
                                      <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 ml-3">{orderDetail.usedTicket}/{orderDetail.quantity}</span>
                                    </h4>
                                    <span>{orderDetail.ticket.description}</span>
                                  </div>
                                  <div>
                                  {formatVND(orderDetail.ticket.price * orderDetail.quantity)}
                                  </div>
                                </div>
                              )
                            })
                          )
                        }
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                )}
                )
              )
            }   
          </ol>
        )
      }
    </div>
  )
}

const getStatus = (status: number) => {
  switch (status) {
    case 0:
      return {
        text: "Unsuccessful",
        color: "bg-red-100 text-red-800",
        ring: "ring-red-400 bg-red-400"
      }
    case 1:
      return {
        text: "Pending",
        color: "bg-yellow-100 text-yellow-800",
        ring: "ring-yellow-400 bg-yellow-400"
      }
    case 2:
      return {
        text: "Successful",
        color: "bg-green-100 text-green-800",
        ring: "ring-green-400 bg-green-400"
      }
    case 3:
      return {
        text: "Refunded",
        color: "bg-gray-100 text-gray-800",
        ring: "ring-gray-400 bg-gray-400"
      }
    default:
      return {
        text: "Unknown",
        color: "bg-black-100 text-black-800",
        ring: "ring-black-400 bg-black-400"
      }
  }
}

export default OrderHistory