"use client"

import { ScrollArea } from '@/components/ui/scroll-area';
import { withPublic } from '@/hooks/useAuth';
import { getPinNews, getUnpinNews } from '@/lib/api/newAPI';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NewSlider from '../components/NewSlider';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Slider from 'react-slick';


function NewsPage() {
  const [listNews, setListNews] = useState<any>([]);
  const router = useRouter()

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getPinNews();
        setListNews(res.data);
      } catch (err:any) {
        console.log(err);
      }
    }
    initialize();
  }, [])

  const [listOldNews, setListOldNews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // init
    const initialize = async () => {
      try {
        getUnpinNews()
        .then((response) => {
          const { data } = response;
          setListOldNews(data);
          setIsLoading(false);
        })
      } catch (err:any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [])

  const settings = {
    dots: true,
    customPaging: function (i:any) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute -bottom-24  ",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState<any>(null);

  return (
      <div className='max-w-full mx-auto mt-16 mb-0 bg-white-500 rounded-sm p-4 sm:p-10'>
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
                      <h5>{listNews[0]?.date}</h5>
                      <h2 className='text-xl sm:text-2xl'>{listNews[0]?.title}</h2>
                      <span className='text-sm sm:text-base'>{(listNews[0]?.description?.slice(0, 50) || "loading") + "..."}</span>
                    </div>
                  </div>
                </div>
              )
            }
            <div className=" col-span-3 max-h-[50vh]">
              <ScrollArea className="h-full w-full">
                <div className="text-white space-y-2">
                {listNews?.map((listNew:any, index:any) => {
                  if(index === 0) return null;
                return (
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
                      <h4 className='text-base'>{listNew?.title.slice(0, 40)+"..." || 'title'}</h4>
                      <h4 className='text-base text-green-500 cursor-pointer'
                        onClick={() => router.push(`/news/${listNew?.id}`)}
                      >View more</h4>
                    </div>
                  </div>
                )
                })}
                </div>
              </ScrollArea>
            </div>
          </section>
        </div>
        <div className='mt-12'>
          <h2 className='p-4 font-amsi'>News In Zooma</h2>
          <div>
          {
            isLoading ? (
              <div>
                <div className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                        </svg>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="flex items-center mt-4 space-x-3">
                      <svg className="w-10 h-10 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        <div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-3 gap-4'>
                {listOldNews?.map((listNew:any, index:any) => (
                  <Card  key={listNew.title} className="p-0 border-2 border-gray-500 hover:border-primary transition-all rounded-lg flex flex-col justify-between">
                    <CardHeader className="p-0">
                      <div className="relative w-full h-32 mx-auto">
                        <Image
                          src={listNew.image}
                          layout='fill'
                          className="rounded-t-md"
                          objectFit='cover'
                          alt="News"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="py-4 px-8 flex flex-col justify-start items-start">
                      <h4 className="font-bold text-left mb-4 text-lg">{listNew.title || "Title"}</h4>
                      <p className="text-justify text-ellipsis">
                      {listNew.description || "Description"}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between flex-row-reverse">
                      <Button
                      className="hover:shadow-primary-md"
                      onClick={() => router.push(`/news/${listNew.id}`)}
                      >
                        View more
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )
          }
    </div>    
        </div>            
      </div>
  )
}

export default withPublic(NewsPage)