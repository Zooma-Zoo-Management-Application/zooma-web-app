"use client"
import { getNewById } from '@/lib/api/newAPI';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NewsForm } from './NewsForm';
import ImageWithTextSkeleton from '@/app/dashboard/components/ImageWithTextSkeleton';
import { withProtected } from '@/hooks/useAuth';

function NewViewPage() {
  const { newId } = useParams();
  const [news, setNews] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getNewById(+newId);
        setNews(res.data);
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [newId])


  return (
    <div className='p-10'>
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">Edit New</h2>
      </div>
      <div>
        {
          !isLoading ? (
            <NewsForm newParam={news} />
          ) : (
            <ImageWithTextSkeleton />
          )
        }
      </div>
    </div>
  )
}

export default withProtected(NewViewPage)