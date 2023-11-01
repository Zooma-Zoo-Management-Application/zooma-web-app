"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, Table, TableMeta } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
//import { deleteDietById} from "@/lib/api/dietAPI"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"


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

  const handleEdit = () => {
    router.push(`/dashboard/diets/${row.getValue("id")}/edit`)
  }
  const handleView = () => {
    router.push(`/dashboard/diets/${row.getValue("id")}/view`)
  }

  // const handleDelete = () => {
  //   deleteNewById(row.getValue("id"))
  //     .then(res => {
  //       toast({
  //         title: "Delete Success!",
  //         description: "News has been deleted."
  //       })
  //     })
  //     .catch(err => {
  //       toast({
  //         title: "Delete Failed!",
  //         description: "Something went wrong.",
  //         variant: "destructive"
  //       })
  //     })
  //     .finally(() => {
  //       meta?.delete(row.getValue("id"))
  //     })
  // }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Delete
            </DropdownMenuItem>
          </DialogTrigger> */}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <DialogContent>
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
      </DialogContent> */}
    </Dialog>
  )
}