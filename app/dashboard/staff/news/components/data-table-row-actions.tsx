"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import axios from "axios"
import { BASE_URL } from "@/constants/appInfos"
import { toast } from "@/components/ui/use-toast"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const router = useRouter();
  const handleEdit = () => {
    router.push(`/dashboard/staff/news/${row.getValue("id")}/edit`)
  }
  const handleView = () => {
    router.push(`/dashboard/staff/news/${row.getValue("id")}/view`)
  }

  const handleDelete = () => {
    axios
    .delete(`${BASE_URL}/api/News/`+row.getValue("id"))
    .then(res => {
      toast({
        title: "Delete Success!",
        description: (
          <div>
            <p>News has been deleted.</p>
          </div>
        )
      })
      router.refresh()
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
        <DropdownMenuItem>Pin</DropdownMenuItem>
        <DropdownMenuItem>Unpin</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}