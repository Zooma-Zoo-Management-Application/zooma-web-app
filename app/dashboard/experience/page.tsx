"use client"

import { Button } from "@/components/ui/button";
import DataTableSkeleton from '../components/DataTableSkeleton'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import { withProtected } from "@/hooks/useAuth";
import useUserState from "@/stores/user-store";
import { getExperiencesByTrainerId } from "@/lib/api/experienceAPI";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

function UserManagementPage() {
    const [exps, setExps] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { currentUser } = useUserState();

    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getExperiencesByTrainerId(currentUser.id);
                setExps(res.data);
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        }
        initialize();
    }, [])

    return (
        <div className="hidden flex-col md:flex w-full">
            <div className="flex-1 space-y-4 p-8 pt-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Experience Management</h2>
                    <Link href="/dashboard/experience/create">
                        <Button variant="default">
                            Create
                        </Button>
                    </Link>
                </div>
                <div className="flex-1 space-y-4">
                    {
                        isLoading ? (
                            <DataTableSkeleton />
                        ) : (
                            <DataTable columns={columns} data={exps} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withProtected(UserManagementPage)
