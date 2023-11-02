"use client"

import { useEffect, useState } from 'react';
import DataTableSkeleton from '../components/DataTableSkeleton'
import { getTickets } from "@/lib/api/ticketAPI";
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { withProtected } from '@/hooks/useAuth';

function UserManagementPage() {
  const [tickets, setTickets] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getTickets();
        setTickets(res.data);
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
          <h2 className="text-3xl font-bold tracking-tight">Tickets Management</h2>
        </div>
        <div className="flex-1 space-y-4">
          {
            isLoading ? (
              <DataTableSkeleton />
            ) : (
              <DataTable columns={columns} data={tickets} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default withProtected(UserManagementPage)