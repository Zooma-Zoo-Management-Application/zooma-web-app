"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, Table, TableMeta } from "@tanstack/react-table"

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
import { getAnimalWithNoCage } from "@/lib/api/animalAPI"
import { removeCage } from "@/lib/api/cageAPI"
import useRefresh from "@/stores/refresh-store"
import { DialogClose } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "../../animals/components/data-table"
import { UpdateForm } from "./UpdateForm"
import { animalColumns } from "./add-animal-column"
import { AddAnimalTable } from "./add-animal-table"
import { UpdateAreaForm } from "./UpdateAreaForm"


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

  const [updateOpen, setUpdateOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

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
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <ViewFormDialog open={viewOpen} setOpen={setViewOpen} row={row} table={table}/>
      <UpdateFormDialog open={updateOpen} setOpen={setUpdateOpen} row={row} table={table}/>
      <DeleteFormDialog open={deleteOpen} setOpen={setDeleteOpen} row={row} />
    </DropdownMenu>
  )
}

const ViewFormDialog = ({ open, setOpen, row, table }:{
  open: boolean,
  setOpen: (value: boolean) => void,
  row: Row<any>,
  table: Table<any>,
}) => {

  const [animalOpen, setAnimalOpen] = useState(false)

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <FullWidthDialog>
          <DialogHeader>View Cage</DialogHeader>
            <div className="space-y-2">
              <div className="grid grid-cols-2">
                <div>
                  <div className="text-sm font-semibold">Name</div>
                  <div className="text-sm">{row.getValue("name")}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Area</div>
                  <div className="text-sm">{row.getValue("areaId")}</div>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <div className="text-sm font-semibold">Animal Count</div>
                  <div className="text-sm">{row.getValue("animalCount")}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Animal Limit</div>
                  <div className="text-sm">{row.getValue("animalLimit")}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Description</div>
                <div className="text-sm">{row.getValue("description")}</div>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex">
                <h5>Animals</h5>
                <Button type="button" variant="default" className="ml-auto" onClick={() => setAnimalOpen(true)}>Add Animals</Button>
              </div>
              <div className="animal-list">
                <DataTable columns={animalColumns} data={row.getValue("animal") as any[]}/>
                {/* {(row.getValue("animal") as any[]).map((animal) => (
                  <div className="animal-list-item" key={animal.id}>
                    <div className="animal-list-item-name">{animal.name}</div>
                  </div>
                ))} */}
              </div>
            </div>
        </FullWidthDialog>
      </Dialog>
      <AddAnimalTableDialog open={animalOpen} setOpen={setAnimalOpen} row={row} table={table}/>
    </div>
  )
}

const AddAnimalTableDialog =({ open, setOpen, row, table }:{
  open: boolean,
  setOpen: (value: boolean) => void,
  row: Row<any>,
  table: Table<any>
}) => {

  const [animals, setAnimals] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [open, setOpen] = useState<boolean>(false)

  const refreshAnimalWithNoCage = async () => {
    try {
      const res = await getAnimalWithNoCage();
      const { data } = res;
      setAnimals(data);
    } catch (err:any) {
      setError(`Error initializing the app: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getAnimalWithNoCage();
        const { data } = res;
        if(data == null) return;
        setAnimals(data);
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [error])

  

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <FullWidthDialog>
          <DialogHeader>Add Animals</DialogHeader>
          <AddAnimalTable columns={animalColumns} data={animals} cageId={row.getValue("id")}/>
        </FullWidthDialog>
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
    "name": row.getValue("name"),
    "description": row.getValue("description"),
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Update Area Information</DialogHeader>
        {/* <UpdateAreaForm id={row.getValue("areaId") || "1"} values={values} setOpen={setDialogUpdateAreaOpen}/> */}
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
    removeCage(row.getValue("id"))
    .then(res => {
      if(res.error != null) {
        toast({
          title: "Delete Failed!",
          description: res.error,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Delete Success!",
          description: "Cage has been deleted."
        })
      }
      setTimeout(() => {
        setOpen(false)
        refresh()
      }, 1000)
    })
    .catch(err => {
      
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