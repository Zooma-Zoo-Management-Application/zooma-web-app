"use client"
import ImageWithTextSkeleton from '@/app/dashboard/components/ImageWithTextSkeleton';
import TipTap from '@/components/tiptap/TipTap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getNewById } from '@/lib/api/newAPI';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function NewViewPage() {
  const { newId } = useParams();
  const [news, setNews] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getNewById(+newId);
        const { data } = res;
        setNews(data);
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [newId])

  const handleEdit = () => {
    router.push(`/dashboard/news/${newId}/edit`)
  }
  
  return (
    <div className='p-10 w-full'>
      <div className='flex justify-between mb-4'>
        <h2 className="text-3xl font-bold tracking-tight">View New</h2>
        <Button variant="default" onClick={handleEdit}>
          Edit
        </Button>
      </div>
      {
        !isLoading ? (
          <>
            <div className="relative w-full h-60 mx-auto">
            {
              news ? (
                <Image
                  src={news.image}
                  layout='fill'
                  className="rounded-t-md"
                  objectFit='cover'
                  alt="News"
                />
              ) : (
                <Image
                  src="/peguin.jpg"
                  layout='fill'
                  className="rounded-t-md"
                  objectFit='cover'
                  alt="News"
                />
              )
            }
            </div>
            <h1 className='my-4'>{news?.title}</h1>
            <span className='text-base'>{news?.description}</span>
            <div className="flex items-center space-x-4 my-4 mt-8">
              <Avatar>
                <AvatarImage src="/peguin.jpg" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className="text-sm font-medium leading-none">Jackson Lee</span>
                <span className="text-sm text-muted-foreground">span@example.com</span>
              </div>
              {/* <span className='text-gray-600 text-sm self-center my-1 pl-10'>Create at {format(new Date(news.date), "HH:mm:ss dd/LL/yyyy")} - {differenceInHours(new Date(), new Date(news.date))} hours ago</span> */}
            </div>
            <TipTap content={news?.content} editable={false}/>
          </>
        ) : (
          <ImageWithTextSkeleton />
        )
      }
    </div>
  )
}

export default NewViewPage