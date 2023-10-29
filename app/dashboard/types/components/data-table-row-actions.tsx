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
import { useState } from "react"
import { UpdateForm } from "./UpdateForm"
import useRefresh from "@/stores/refresh-store"


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

  const handleDelete = () => {
    deleteNewById(row.getValue("id"))
    .then(res => {
      toast({
        title: "Ban Success!",
        description: "Zoo Trainer has been banned."
      })
    })
    .catch(err => {
      toast({
        title: "Ban Failed!",
        description: "Something went wrong.",
        variant: "destructive"
      })
    })
    .finally(() => {
      meta?.delete(row.getValue("id"))
    })
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
        <DialogHeader>View Animal Types</DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-2">
          <Image src={row.getValue("imageUrl")} width={130} height={130} className=" rounded-full" alt="profile"/>
          <div className="text-lg font-semibold">{row.getValue("name")}</div>
          {/* <div className="text-sm">{row.getValue("description")}</div> */}
        </div>
        <div className="">
          <div>
            <div className="text-sm font-semibold">Description</div>
            <div className="text-sm">{row.getValue("description")}</div>
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
    name: row.getValue("name"),
    description: row.getValue("description"),
    imageUrl: row.getValue("imageUrl"),
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Update Profile</DialogHeader>
        <UpdateForm id={row.getValue("id")} values={values} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}