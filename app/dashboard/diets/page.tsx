"use client"

import { columns } from "@/app/dashboard/diets/components/columns";
import { DataTable } from "@/app/dashboard/diets/components/data-table";
import { Button } from "@/components/ui/button";
import { getDiets } from "@/lib/api/dietAPI";
import { useEffect, useState } from "react";
import DataTableSkeleton from '../components/DataTableSkeleton'

function UserManagementPage() {
  const [diets, setDiets] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getDiets();
        setDiets(res.data);
      } catch (err: any) {
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
          <h2 className="text-3xl font-bold tracking-tight">Diet Management</h2>
          <a href="/dashboard/diets/create">
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
              <DataTable columns={columns} data={diets} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage