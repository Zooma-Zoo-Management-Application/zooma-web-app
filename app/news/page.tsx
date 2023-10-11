"use client"

import NewSlider from '@/app/components/NewSlider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getNews } from '@/lib/api/newAPI';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


function NewsPage() {
  const [listNews, setListNews] = useState<any>([]);
  const router = useRouter()

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getNews();
        setListNews(res.data);
      } catch (err:any) {
        console.log(err);
      }
    }
    initialize();
  }, [])

  return (
      <div className='max-w-full mx-auto mt-16 mb-0 bg-white-500 rounded-sm p-10'>
        <div className='w-full'>
          <section className='aspect-video w-full grid grid-cols-1 md:grid-cols-8 max-h-[50vh] space-y-2 md:space-y-0 md:space-x-2'>
            {
              listNews && (
                <div className='relative col-span-5 h-[50vh] cursor-pointer rounded-sm'
                onClick={() => router.push(`/news/${listNews[0]?.id}`)}
                >
                  <div className='w-full'>
                    <Image
                      src={listNews[0]?.image || '/peguin.jpg'}
                      alt="Animal"
                      layout='fill'
                      objectFit='cover'
                      className=' rounded-sm'
                    />
                  </div>
                  <div className="rounded-sm absolute p-4 inset-0 h-full grid grid-cols-6 grid-rows-8 gap-0 bg-gradient-to-t from-stone-900 from-10% to-40%">
                    <div className="col-start-1 col-end-2 row-start-1">
                      <span className="py-1 px-3 bg-primary rounded-full text-sm text-white-500">Popular</span>
                    </div>
                    <div className="col-start-1 col-end-7 row-start-6 row-span-2 text-xl text-white-500 pt-3 px-1 flex flex-col justify-end">
                      {/* {listNews[0]?.description} */}
                      <h5>{listNews[0]?.date}</h5>
                      <h2>{listNews[0]?.title}</h2>
                      This is description of news. This is description of news. This is description of news. This is description of news
                    </div>
                  </div>
                </div>
              )
            }
            <div className=" col-span-3 max-h-[50vh]">
              <ScrollArea className="h-full w-full">
                <div className="text-white space-y-2">
                {listNews.map((listNew:any, index:any) => (
                  <div key={listNew.title} className="flex justify-start gap-4">
                    <div className='h-20 aspect-video'>
                      <Image
                        src={listNew?.image || '/peguin.jpg'}
                        alt="News"
                        width={300}
                        height={300}
                        className=' rounded-sm h-full'
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <h4 className='text-base'>{listNew?.title || 'title'}</h4>
                      <h4 className='text-base text-green-500 cursor-pointer'
                        onClick={() => router.push(`/news/${listNew?.id}`)}
                      >View more</h4>
                    </div>
                  </div>
                ))}
                </div>
              </ScrollArea>
            </div>
          </section>
        </div>
        <div className='mt-12'>
          <h2 className='p-4 font-amsi'>News In Zooma</h2>
          <NewSlider />       
        </div>            
      </div>
  )
}

export default NewsPage