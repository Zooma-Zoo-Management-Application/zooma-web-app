"use client"

import { columns } from "@/app/dashboard/news/components/columns";
import { DataTable } from "@/app/dashboard/news/components/data-table";
import { Button } from "@/components/ui/button";
import { getNews } from "@/lib/api/newAPI";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import DataTableSkeleton from '../components/DataTableSkeleton'
import { withProtected } from "@/hooks/useAuth";
import { RefreshCcw } from "lucide-react";

function UserManagementPage() {
  const [news, setNews] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const res = await getNews();
      const { data } = res;
      setNews(data);
    } catch (err: any) {
      setError(`Error initializing the app: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      refresh()
    };
    initialize();
  }, [])

  return (
    <div className="hidden flex-col md:flex w-full">
      <div className="flex-1 space-y-4 p-8 pt-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">News Management</h2>
            <div className="flex gap-4">
                <a href="/dashboard/news/create">
                  <Button variant="default">
                    Create
                  </Button>
                </a>
              <div className="flex items-center justify-center gap-4">
                <Button onClick={refresh} variant={"outline"} size="icon" className="self-end">
                  <RefreshCcw />
                </Button>
              </div>
            </div>
        </div>
        <div className="flex-1 space-y-4">
          {
            isLoading ? (
              <DataTableSkeleton />
            ) : (
              <DataTable columns={columns} data={news} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default withProtected(UserManagementPage)