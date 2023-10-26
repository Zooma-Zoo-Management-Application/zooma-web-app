"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, Table, TableMeta } from "@tanstack/react-table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { deleteNewById } from "@/lib/api/newAPI"
import { getTypes } from "@/lib/api/typeAPI"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UpdateForm } from "./UpdateForm"
import { DialogClose } from "@radix-ui/react-dialog"
import { deleteSpecies } from "@/lib/api/speciesAPI"
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
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [types, setTypes] = useState<any>([])

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getTypes();
        const { data } = res;
        setTypes(data);
      } catch (err:any) {
      } finally {
      }
    };
    initialize();
  }, [])

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

  const handleTypeRow = (typeId: string) => {
    if(!types.length) return (<></>)
    const type = types.find((type:any) => type.id === +typeId)
    return type?.name || typeId
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
          <DropdownMenuItem onSelect={() => setDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <ViewFormDialog open={viewOpen} setOpen={setViewOpen} row={row} table={table} typeName={handleTypeRow(row.getValue("typeId"))}/>
      <UpdateFormDialog open={updateOpen} setOpen={setUpdateOpen} row={row} table={table}/>
      <DeleteFormDialog open={deleteOpen} setOpen={setDeleteOpen} row={row} />
    </DropdownMenu>
  )
}

const ViewFormDialog = ({ open, setOpen, row, table, typeName }:{
  open: boolean,
  setOpen: (value: boolean) => void,
  row: Row<any>,
  table: Table<any>,
  typeName: string
}) => {

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>View Species</DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Avatar className="w-28 h-28">
              <AvatarImage src={row.getValue("imageUrl")} className="bg-cover bg-center"/>
              <AvatarFallback>{row.getValue("name")?.toString().slice(0,2)}</AvatarFallback>
            </Avatar>
            <div className="text-lg font-semibold">{row.getValue("name")}</div>
            {/* <div className="text-sm">{row.getValue("description")}</div> */}
          </div>
          <div className="">
            <div>
              <div className="text-sm font-semibold">Animal Type</div>
              <div className="text-sm">{typeName}</div>
            </div>
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
    typeId: row.getValue("typeId")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Update Species</DialogHeader>
        <UpdateForm id={row.getValue("id")} values={values} setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}

const DeleteFormDialog = ({ open, setOpen, row }:{
  open: boolean,
  setOpen: (value: boolean) => void,
  row: Row<any>,
}) => {

  const { refresh } = useRefresh()

  const handleDelete = async () => {
    deleteSpecies(row.getValue("id"))
    .then(res => {
      toast({
        title: "Delete Success!",
        description: "Species has been deleted."
      })
      
      setTimeout(() => {
        setOpen(false)
        refresh()
      }, 1000)
    })
    .catch(err => {
      toast({
        title: "Delete Failed!",
        description: "Something went wrong.",
        variant: "destructive"
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this new from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="destructive" onClick={handleDelete}>Confirm</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
    </Dialog>
  )
}