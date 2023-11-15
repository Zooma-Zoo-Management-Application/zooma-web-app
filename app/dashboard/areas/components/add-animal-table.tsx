"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import * as React from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableRowActions } from "./data-table-row-actions"
import { DataTableToolbar } from "./data-table-toolbar"
import { Button } from "@/components/ui/button"
import { assignAnimalsIntoCage } from "@/lib/api/animalAPI"
import { toast } from "@/components/ui/use-toast"
import useRefresh from "@/stores/refresh-store"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  cageId: string,
  setOpen: any
}

export function AddAnimalTable<TData, TValue>({
  columns,
  data,
  cageId,
  setOpen
}: DataTableProps<TData, TValue>) {
  const [dataState, setDataState] = React.useState<TData[]>(data)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const [types, setTypes] = React.useState<any>([])

  const { refresh } = useRefresh()

  // React.useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const res = await getTypes();
  //       const { data } = res;
  //       setTypes(data);
  //     } catch (err:any) {
  //     } finally {
  //     }
  //   };
  //   initialize();
  // }, [data])

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      columnVisibility: {
        ...columnVisibility,
        // description: false,
        // typeId: false,
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
    getFacetedUniqueValues: getFacetedUniqueValues(),
    meta: {
      pinNew: (id: string) => {
        setDataState((prev) =>
            [
            ...prev.map((item: any) => {
              if (item.id === id) {
                return {
                  ...item,
                  status: true
                }
              }
              return item
            })
          ]
        )
      },
      unpinNew: (id: string) => {
        setDataState((prev) =>
        [
          ...prev.map((item: any) => {
            if (item.id === id) {
              return {
                ...item,
                status: false
              }
            }
            return item
          })
        ]
        )
      },
      delete(id: string) {
        setDataState((prev) => prev.filter((item: any) => item.id !== id));
      },
      update(id: string, updateData: any) {
        console.log("updateData",updateData)
        setDataState((prev) =>
        [
          ...prev.map((item: any) => {
            if (item.id == id) {
              return {
                ...item,
                ...updateData
              }
            }
            return item
          })
        ]
        )
      }
    }
  })
  
  React.useEffect(() => {
    table.setPageSize(5)
  }, [])

  const handleAddAnimalIntoCage = () => {
    // rowSelection
    const selected = table.getRowModel().rows.filter((row) => row.getIsSelected()).map((row) => row.getValue("id"))
    if(selected.length == 0){
      toast({
        title: "Error",
        description: "Please select at least one animal",
      })
    } else {
      assignAnimalsIntoCage(+cageId, selected).then((res) => {
        toast({
          title: "Success",
          description: "Add animal into cage successfully",
        })

      })
      .finally(() => {
        setTimeout(() => {
          refresh()
          setOpen(false)
        }, 1000)
      })
    }
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
                {/* <TableHead>Actions</TableHead> */}
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
                  {/* <TableCell>
                    {
                      handleTypeRow(row.getValue("typeId"))
                    }
                  </TableCell> */}
                  {/* <TableCell>
                    <DataTableRowActions row={row} table={table} />
                  </TableCell> */}
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
      <Button type="button" variant="default" className="ml-auto" onClick={() => handleAddAnimalIntoCage()}>Add animal</Button>
    </div>
  )
}