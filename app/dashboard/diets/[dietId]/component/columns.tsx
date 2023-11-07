"use client"

import { ColumnDef } from "@tanstack/react-table"


import { statuses } from "../data/data"
import { Diet } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { format } from "date-fns"

export const columns: ColumnDef<Diet>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("description")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "scheduleAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="scheduled Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {format(new Date(row.getValue("scheduleAt")), "MMM dd, yyyy")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "endAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ended Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {format(new Date(row.getValue("endAt")), "MMM dd, yyyy")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "feedingTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Feeding Dates" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("feedingTime")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "feedingDateArray",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Feeding Dates" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("feedingDateArray")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "foodId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Food" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("foodId")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("quantity")}
          </span>
        </div>
      )
    },
  }
]