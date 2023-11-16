"use client"

import { DialogContent as FullWidthDialog } from "@/components/shared/full-width-dialog"
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
import { deleteDietDetailById } from "@/lib/api/DietDetailAPI"
import { getTypes } from "@/lib/api/typeAPI"
import useRefresh from "@/stores/refresh-store"
import { DialogClose } from "@radix-ui/react-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, Table, TableMeta } from "@tanstack/react-table"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
  const meta: TableMeta<TData> | undefined = table.options.meta;
  const [updateOpen, setUpdateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [types, setTypes] = useState<any>([])

  const { refresh } = useRefresh()

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
    deleteDietDetailById(row.getValue("id"))
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <DotsHorizontalIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} alignOffset={-5}>
        <DropdownMenuGroup>
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
  const { dietId } = useParams()
  const values = {
    name: row.getValue("name"),
    description: row.getValue("description"),
    updateAt: row.getValue("updateAt"),
    scheduleAt: row.getValue("scheduleAt"),
    endAt: row.getValue("endAt"),
    feedingDate: row.getValue("feedingDateArray"),
    foodId: row.getValue("foodId"),
    quantity: row.getValue("quantity"),
    status: true,
    feedingTime: row.getValue("feedingTime"),
    dietId: dietId
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FullWidthDialog>
        <DialogHeader>Update Diet Detail</DialogHeader>
        <UpdateForm id={row.getValue("id")} valuesParam={values} setOpen={setOpen} />
      </FullWidthDialog>
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
    deleteDietDetailById(row.getValue("id"))
      .then(res => {
        toast({
          title: "Delete Success!",
          description: "Detail has been deleted."
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