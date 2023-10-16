"use client"

import { Button } from "@/components/ui/button";
import { getAnimals } from "@/lib/api/animalAPI";
import { useEffect, useState } from "react";
import DataTableSkeleton from '../components/DataTableSkeleton';
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

function UserManagementPage() {
  const [animals, setAnimals] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getAnimals();
        const { data } = res;
        setAnimals(data);
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [])

  return (
    <div className="hidden flex-col md:flex w-full">
      <div className="flex-1 space-y-4 p-8 pt-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Animals Management</h2>
            <a href="/dashboard/news/create">
              <Button variant="default">
                Create
              </Button>
            </a>
        </div>
        <div className="flex-1 space-y-4">
          {
            isLoading ? (
              <DataTableSkeleton />
            ) : (
              <DataTable columns={columns} data={animals} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage