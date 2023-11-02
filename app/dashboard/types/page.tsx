"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { getZooTrainers } from "@/lib/api/userAPI";
import { useEffect, useState } from "react";
import DataTableSkeleton from '../components/DataTableSkeleton';
import { UserCreateForm } from "./components/UserCreateForm";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { RefreshCcw } from "lucide-react";
import useRefresh from "@/stores/refresh-store";
import { getTypes } from "@/lib/api/typeAPI";
import { withProtected } from "@/hooks/useAuth";

function UserManagementPage() {
  const [types, setTypes] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false)

  const refresh = async () => {
    try {
      const res = await getTypes();
      const { data } = res;
      setTypes(data);
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
        const res = await getTypes();
        const { data } = res;
        setTypes(data);
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
          <h2 className="text-3xl font-bold tracking-tight">Animal Types Management</h2>
            <div className="flex items-center justify-center gap-4">
              <Button onClick={refresh} variant={"outline"} size="icon" className="self-end">
                <RefreshCcw />
              </Button>
            </div>
        </div>
        <div className="flex-1 space-y-4">
          {
            isLoading ? (
              <DataTableSkeleton />
            ) : (
              <DataTable columns={columns} data={types} />
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
        <DialogHeader>Create User</DialogHeader>
        <UserCreateForm setOpen={setOpen}/>
      </DialogContent>
    </Dialog>
  )
}

export default withProtected(UserManagementPage)