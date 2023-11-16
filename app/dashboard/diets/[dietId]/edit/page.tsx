"use client"
import { getDietById } from '@/lib/api/dietAPI';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NewsForm } from './DietForm';
import TextSkeleton from '@/app/dashboard/components/TextSkeleton';
import useRefresh from '@/stores/refresh-store';
import { withProtected } from '@/hooks/useAuth';

function NewViewPage() {
    const { dietId } = useParams();
    const [diet, setDiet] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const refresh = async () => {
        try {
            const res = await getDietById(+dietId);
            const { data } = res;
            setDiet(data);
        } catch (err: any) {
            setError(`Error initializing the app: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }
    const { setRefresh } = useRefresh()

    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getDietById(+dietId);
                const { data } = res;
                setDiet(data);
                setRefresh(refresh)
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [dietId])
    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getDietById(+dietId);
                setDiet(res.data);
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [dietId])


    return (
        <div className="hidden flex-col md:flex w-full">
            <div className="flex-1 space-y-4 px-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight pt-5">Edit Diet Information</h2>
                </div>
                <div>
                    {
                        !isLoading ? (
                            <NewsForm dietParam={diet} />
                        ) : (
                            <TextSkeleton />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withProtected(NewViewPage) 