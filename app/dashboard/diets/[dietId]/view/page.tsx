"use client"
import ImageWithTextSkeleton from '@/app/dashboard/components/ImageWithTextSkeleton';
import { Button } from '@/components/ui/button';
import { getDietById, getDietDetailByDietId } from '@/lib/api/dietAPI';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import DietDetailViewPage from './DietDetailView';

function DietViewPage() {
    const { dietId } = useParams();
    const [diet, setDiet] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()
    const [create, setCreate] = useState<string>('/dashboard/diets/' + [dietId] + '/createDietDetail')


    useEffect(() => {
        const initialize = async () => {
            try {
                const res = await getDietById(+dietId);
                const { data } = res;
                setDiet(data);
            } catch (err: any) {
                setError(`Error initializing the app: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, [dietId])

    const handleEdit = () => {
        router.push(`/dashboard/diets/${dietId}/edit`)
    }

    return (
        <div className='p-10 w-full'>
            {
                !isLoading ? (
                    <>
                        <div className='bg-green-500 bg-opacity-70 rounded-sm p-2'>
                            <div className='flex justify-between mb-3'>
                                <h1 className="text-5xl font-bold tracking-tight">{diet?.name}</h1>
                                <div className='my-auto'>
                                    <Button variant="secondary" onClick={handleEdit}>
                                        Edit diet Information
                                    </Button>
                                </div>
                            </div>
                            <span className='text-xs italic bg-green-200 rounded-lg p-1 ml-5'>
                                Created date: {format(new Date(diet?.createAt), "MMM dd, yyyy")} &emsp;&emsp;
                                last updated date: {format(new Date(diet?.updateAt), "MMM dd, yyyy H:mma")}
                                <br />
                            </span>
                            <span className='text-base italic'>{diet?.description}</span>
                            <Separator className='bg-black-500' />
                            <div className='flex'>
                                <div className='flex-1'>
                                    <span className='text-base font-semibold'>Goal: <br /></span>
                                    <span className='text-base pl-2'>{diet?.goal}<br /></span>
                                    <span className='text-base font-semibold'>Scheduled Date: <br /></span>
                                    <span className='text-base pl-2'>{format(new Date(diet?.scheduleAt), "MMM dd, yyyy")}</span>
                                </div>
                                <div className='flex-1'>
                                    <span className='text-base font-semibold'>Total Energy: <br /></span>
                                    <span className='text-base pl-2'>{diet?.totalEnergyValue} <br /></span>
                                    <span className='text-base font-semibold'>Ended Date: <br /></span>
                                    <span className='text-base pl-2'>{format(new Date(diet?.endAt), "MMM dd, yyyy")}<br /></span>
                                </div>
                            </div>
                        </div>
                        <div className=' bg-green-50'>
                            <div className='flex justify-between pt-5'>
                                <h2 className="text-3xl font-bold tracking-tight">Diet&apos;s details:</h2>
                                <div className=' my-auto'>
                                    <a href={create}>
                                        <Button variant="default">
                                            Add Detail
                                        </Button>
                                    </a>
                                </div>
                            </div>
                            <div className="w-full p-3" >
                                <DietDetailViewPage />

                            </div >
                        </div>
                    </>
                ) : (
                    <ImageWithTextSkeleton />
                )
            }
        </div >
    )
}

export default DietViewPage