"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import DataTableSkeleton from '../components/DataTableSkeleton';
import { getOrders } from "@/lib/api/orderAPI";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

function UserManagementPage() {
  const [orders, setOrders] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
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
          <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
        </div>
        <div className="flex-1 space-y-4">
          {
            isLoading ? (
              <DataTableSkeleton />
            ) : (
              <DataTable columns={columns} data={orders} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UserManagementPage