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
import { deleteDietById } from "@/lib/api/dietAPI"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  table: Table<TData>
}

export function DataTableRowActions<TData>({
  row,
  table
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const meta: TableMeta<TData> | undefined = table.options.meta;

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
      } catch (err: any) {
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
    if (!types.length) return (<></>)
    const type = types.find((type: any) => type.id === +typeId)
    return type?.name || typeId
  }
  const handleView = () => {
    router.push(`/dashboard/diets/${row.getValue("id")}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <DotsHorizontalIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} alignOffset={-5}>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleView}>
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
      <UpdateFormDialog open={updateOpen} setOpen={setUpdateOpen} row={row} table={table} />
      <DeleteFormDialog open={deleteOpen} setOpen={setDeleteOpen} row={row} />
    </DropdownMenu>
  )
}

const UpdateFormDialog = ({ open, setOpen, row, table }: {
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
    goal: row.getValue("goal"),
    updateAt: row.getValue("updateAt"),
    scheduleAt: row.getValue("scheduleAt"),
    endAt: row.getValue("endAt"),
    status: true
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Update Diet</DialogHeader>
        <UpdateForm id={row.getValue("id")} data={values} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

const DeleteFormDialog = ({ open, setOpen, row }: {
  open: boolean,
  setOpen: (value: boolean) => void,
  row: Row<any>,
}) => {

  const { refresh } = useRefresh()

  const handleDelete = async () => {
    deleteDietById(row.getValue("id"), false)
      .then(res => {
        toast({
          title: "Delete Success!",
          description: "Diet has been deleted."
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