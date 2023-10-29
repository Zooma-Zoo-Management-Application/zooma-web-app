"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, Table, TableMeta } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { deleteNewById } from "@/lib/api/newAPI"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"
import useRefresh from "@/stores/refresh-store"
import { format } from "date-fns"
import { formatVND, getImageOfTicketById, getStatus } from "@/lib/utils"
import { twMerge } from "tailwind-merge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UpdateForm } from "./UpdateForm"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  table: Table<TData>
}

export function DataTableRowActions<TData>({
  row,
  table
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const meta : TableMeta<TData> | undefined = table.options.meta;

  const [viewOpen, setViewOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)

  const { refresh } = useRefresh()

  const handleUpdate = (value: boolean) => {
    setUpdateOpen(value)
    refresh()
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <DotsHorizontalIcon className="w-5 h-5"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} alignOffset={-5}>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => setViewOpen(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setUpdateOpen(true)}>
            Update
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <UpdateFormDialog open={updateOpen} setOpen={handleUpdate} row={row} table={table}/>
      <ViewFormDialog open={viewOpen} setOpen={setViewOpen} row={row} table={table}/>
    </DropdownMenu>
  )
}

const ViewFormDialog = ({ open, setOpen, row, table }:{
  open: boolean,
  setOpen: (value: boolean) => void,
  row: Row<any>,
  table: Table<any>
}) => {

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="flex flex-row gap-2">
          <span className="font-bold text-2xl">
            <div>Order #{row.getValue("id")}</div>
            <div className="flex gap-1 text-gray-600">
              <div className="text-sm font-semibold">Date:</div>
              <div className="text-sm font-semibold">{format(new Date(row.getValue("orderDate")) || new Date(), "dd/MM/yyyy")}</div>
            </div>
          </span>
          <div className={twMerge("text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3 self-start", getStatus(row.getValue("status")).color)}>{
                          getStatus(row.getValue("status")).text
          }</div>
        </DialogHeader>
        <div className="flex flex-col items-start justify-center space-y-4">
          <div className="flex flex-col gap-1">
            <div className="font-semibold">User</div>
            <div className="flex gap-4 items-center justify-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src={(row.getValue("user") as any)?.avatarUrl || "/peguin.jpg"} alt={(row.getValue("user") as any)?.userName} />
                <AvatarFallback>{(row.getValue("user") as any)?.userName.slice(0,2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center">
                <div className="text-lg font-semibold">{(row.getValue("user") as any).userName}</div>
                <div className="text-sm">{(row.getValue("user") as any).email}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Order Details</div>
            <div className="space-y-2">
              {
                (row.getValue("orderDetails") as any[]).map((orderDetail:any) => {
                  if(orderDetail?.quantity === 0) return <Fragment></Fragment>
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
              }
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold">Notes</div>
            <div className="flex flex-col gap-1">
              <div className="text-sm">{row.getValue("notes")}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const UpdateFormDialog = ({ open, setOpen, row, table }:{
  open: boolean,
  setOpen: (value: boolean) => void,
  row: Row<any>,
  table: Table<any>
}) => {

  const handleClose = () => {
    setOpen(false)
  }

  const values = {
    paymentMethod: row.getValue("paymentMethod"),
    notes: row.getValue("notes"),
    status: row.getValue("status")+""
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Update Order</DialogHeader>
        <UpdateForm id={row.getValue("id")} values={values} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}