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
import { deleteNewById, pinNews, unpinNews } from "@/lib/api/newAPI"
import { useRouter } from "next/navigation"


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

  const handleEdit = () => {
    router.push(`/dashboard/news/${row.getValue("id")}/edit`)
  }
  const handleView = () => {
    router.push(`/dashboard/news/${row.getValue("id")}/view`)
  }

  const handlePin = () => {
    pinNews(row.getValue("id"))
    .then(res => {
      toast({
        title: "Pin Success!",
        description: "News has been pinned."
      })
    })
    .catch(err => {
      toast({
        title: "Pin Failed!",
        description: "Something went wrong.",
        variant: "destructive"
      })
    })
    .finally(() => {
      meta?.pinNew(row.getValue("id"))
    })
  }

  const handleUnPin = () => {
    unpinNews(row.getValue("id"))
    .then(res => {
      toast({
        title: "Unpin Success!",
        description: "News has been unpinned."
      })
    })
    .catch(err => {
      toast({
        title: "Unpin Failed!",
        description: "Something went wrong.",
        variant: "destructive"
      })
    })
    .finally(() => {
      meta?.unpinNew(row.getValue("id"))
    })
  }

  const handleDelete = () => {
    deleteNewById(row.getValue("id"))
    .then(res => {
      toast({
        title: "Delete Success!",
        description: "News has been deleted."
      })
    })
    .catch(err => {
      toast({
        title: "Delete Failed!",
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
        {
          row.getValue("status") === true ? (
            <DropdownMenuItem onClick={handleUnPin}>Unpin</DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handlePin}>Pin</DropdownMenuItem>
          )
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}