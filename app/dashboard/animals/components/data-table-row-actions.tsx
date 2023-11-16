"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, Table, TableMeta } from "@tanstack/react-table"

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
import { deleteAnimal } from "@/lib/api/animalAPI"
import { getDiets } from "@/lib/api/dietAPI"
import { deleteNewById } from "@/lib/api/newAPI"
import { getSpecies } from "@/lib/api/speciesAPI"
import { getTypes } from "@/lib/api/typeAPI"
import useRefresh from "@/stores/refresh-store"
import { DialogClose } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { UpdateForm } from "./UpdateForm"
import { format } from "date-fns"


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

  const [species, setSpecies] = useState<any>([])
  const [diets, setDiets] = useState<any>([])

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getSpecies();
        const { data } = res;
        setSpecies(data);
      } catch (err:any) {
      } 
    };
    initialize();
  }, [])

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getDiets();
        const { data } = res;
        setDiets(data);
      } catch (err:any) {
      } 
    };
    initialize();
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>View Animal</DialogHeader>
        <div className="w-full">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="text-sm font-semibold">Name</div>
              <div className="text-sm">{row.getValue("name")}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm font-semibold">Height-cm</div>
              <div className="text-sm">{row.getValue("height")}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm font-semibold">Weight-kg</div>
              <div className="text-sm">{row.getValue("weight")}</div>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="text-sm font-semibold">Date of Birth</div>
              <div className="text-sm">{format(new Date(row.getValue("dateOfBirth")), "dd/MM/yyyy")}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm font-semibold">Arrival Date</div>
              <div className="text-sm">{format(new Date(row.getValue("arrivalDate")), "dd/MM/yyyy")}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm font-semibold">Species</div>
              <div className="text-sm">{species.find((species:any) => species.id == (row.getValue("speciesId") as number))?.name}</div>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="text-sm font-semibold">Cage</div>
              <div className="text-sm">{row.getValue("cageId")}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm font-semibold">Diet</div>
              <div className="text-sm">{row.getValue("dietId")}</div>
            </div>
            <div className="col-span-1">
              <div className="text-sm font-semibold">Training Plan</div>
              <div className="text-sm">{row.getValue("trainingPlanId")}</div>
            </div>
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
    arrivalDate: new Date(row.getValue("arrivalDate")),
    dateOfBirth: new Date(row.getValue("dateOfBirth")),
    height: row.getValue("height"),
    weight: row.getValue("weight"),
    description: row.getValue("description"),
    speciesId: row.getValue("speciesId"),
    dietId: row.getValue("dietId"),
    cageId: row.getValue("cageId"),
    trainingPlanId: row.getValue("trainingPlanId"),
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Update Animal</DialogHeader>
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
    deleteAnimal(row.getValue("id"))
    .then(res => {
      toast({
        title: "Delete Success!",
        description: "Animal has been deleted."
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