"use client"

import TextSkeleton from '@/app/dashboard/components/TextSkeleton';
import { getExperiencesById } from '@/lib/api/experienceAPI';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SkillDetailForm } from '../../components/expFormWithParam';
import { withProtected } from '@/hooks/useAuth';

function Home() {
    const { expId } = useParams()
    const [exp, setExp] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getExperiencesById(+expId);
                setExp(res.data);
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [expId])

    return (
        <div className="hidden flex-col md:flex w-full">
            <div className="flex-1 space-y-4 px-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight pt-5">Edit Experience: {!isLoading ? (
                        exp.skill.name
                    ) : (
                        <TextSkeleton />
                    )}</h2>
                </div>
                {
                    !isLoading ? (
                        <SkillDetailForm expParam={exp} />
                    ) : (
                        <TextSkeleton />
                    )
                }
            </div>
        </div>
    )
}

export default withProtected(Home)