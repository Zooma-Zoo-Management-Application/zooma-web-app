"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableRowActions } from "./data-table-row-actions"
import { useEffect, useState } from "react"
import { getFoods } from "@/lib/api/foodAPI"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
const dates = [
  { id: "0", label: "Sun", },
  { id: "1", label: "Mon", },
  { id: "2", label: "Tue", },
  { id: "3", label: "Wed", },
  { id: "4", label: "Thu", },
  { id: "5", label: "Fri", },
  { id: "6", label: "Sat", },
  { id: "7", label: "Everyday" }
] as const

interface food {
  id: number,
  name: string,
  description: string,
  energyValue: number,
  imageUrl: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [dataState, setDataState] = React.useState<TData[]>(data)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [foods, setFoods] = useState<food[]>([])

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getFoods();
        setFoods(res.data);
      } catch (err: any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [])

  const table = useReactTable({
    data: dataState,
    columns,
    state: {
      sorting,
      columnVisibility: {
        ...columnVisibility,
        feedingTime: false,
        feedingDateArray: false,
        foodId: false,
        quantity: false,
      },
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  })

  const handleDateRow = (feedingDateArray: string[], feedingTime: string) => {
    let str = "";
    feedingDateArray?.map((date: string) => {
      if (dates.find((date1) => date1.id === date)) {
        str += (dates.find((date1) => date1.id === date)?.label) + ". "
      }
    })
    if (str === "Sun. Mon. Tue. Wed. Thu. Fri. Sat. ") return <>
      <div className="flex space-x-2">
        {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
        <span className="max-w-[300px] truncate font-medium">
          At {feedingTime.substring(0, 5)}{<br />}{dates.at(7)?.label}
        </span>
      </div>
    </>
    return <>
      <div className="flex space-x-2">
        {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
        <span className="max-w-[300px] truncate font-medium">
          At {feedingTime.substring(0, 5)}{<br />}{str}
        </span>
      </div>
    </>;
  }

  const handleFoodRow = (foodId: number, quantity: number) => {
    let str = "";
    if (foods.find((food) => food.id === foodId)) {
      str = (foods.find((food) => food.id === foodId)?.name) as string
    } else {
      error
    }
    return <>
      <div className="flex space-x-2">
        {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
        <span className="max-w-[300px] truncate font-medium text-center">
          {str}: {quantity}kg
        </span>
      </div>
    </>;
  }

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
                <TableHead>Feeding dates</TableHead>
                <TableHead>Food</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {
                      handleDateRow(row.getValue("feedingDateArray"), row.getValue("feedingTime"))
                    }
                  </TableCell>
                  <TableCell>
                    {
                      handleFoodRow(row.getValue("foodId"), row.getValue("quantity"))
                    }
                  </TableCell>
                  <TableCell>
                    <DataTableRowActions row={row} table={table} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}