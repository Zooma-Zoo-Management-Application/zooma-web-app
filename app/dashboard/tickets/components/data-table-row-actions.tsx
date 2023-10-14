"use client"

import { Row, Table, TableMeta } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { deleteNewById, pinNews, unpinNews } from "@/lib/api/newAPI"
import { DialogClose } from "@radix-ui/react-dialog"
import { PenSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import UpdateTicketForm from "./UpdateTicketForm"
import { useState } from "react"


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

  const [open, setOpen] = useState(false);

  const handleUpdate = ({
    name,
    description,
    price,
  }: {
    name: string
    description: string
    price: number
  }) => {
    meta?.update(row.getValue("id"), {
      name: name,
      description: description,
      price: price,
    })
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PenSquare  />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Ticket</DialogTitle>
        </DialogHeader>
        <UpdateTicketForm 
        ticketId={row.getValue("id")}
        defaultValues={
          {
            name: row.getValue("name"),
            description: row.getValue("description"),
            price: row.getValue("price"),
          }
        } 
        setOpen={setOpen}
        handleUpdate={(data:any) => handleUpdate(data)}
        />
        {/* <DialogFooter>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

