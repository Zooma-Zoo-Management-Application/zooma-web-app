"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { getSpecies } from "@/lib/api/speciesAPI";
import useRefresh from "@/stores/refresh-store";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import DataTableSkeleton from '../components/DataTableSkeleton';
import { UserCreateForm } from "./components/UserCreateForm";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getAnimals } from "@/lib/api/animalAPI";

function UserManagementPage() {
  const [animals, setAnimals] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false)

  const refresh = async () => {
    try {
      const res = await getAnimals();
      const { data } = res;
      setAnimals(data);
    } catch (err:any) {
      setError(`Error initializing the app: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }
  const { setRefresh } = useRefresh()

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getAnimals();
        const { data } = res;
        if(data == null) return;
        setAnimals(data);
        setRefresh(refresh)
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [error])

  return (
    <div className="hidden flex-col md:flex w-full">
      <div className="flex-1 space-y-4 p-8 pt-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Animals Management</h2>
            <div className="flex items-center justify-center gap-4">
              <Button variant="default" onClick={() => setOpen(true)}>
                Create
              </Button>
              <Button onClick={refresh} variant={"outline"} size="icon" className="self-end">
                <RefreshCcw />
              </Button>
            </div>
        </div>
        <div className="flex-1 space-y-4">
          {
            isLoading && animals.length != 0 ? (
              <DataTableSkeleton />
            ) : (
              <DataTable columns={columns} data={animals} />
            )
          }
        </div>
      </div>
      <CreateFormDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

const CreateFormDialog = ({ open, setOpen }:{
  open: boolean,
  setOpen: (value: boolean) => void,
}) => {

  const handleClose = () => {
    setOpen(false)
  }

  const values = {
    userName: "",
    email: "",
    fullName: "",
    gender: "",
    dateOfBirth: new Date(),
    avatarUrl: "",
    phoneNumber: "",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>Create Animal</DialogHeader>
        <UserCreateForm setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}

export default UserManagementPage