"use client"

import NewSlider from '@/components/NewSlider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BASE_URL } from '@/constants/appInfos';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';


function NewsPage() {
  const [listNews, setListNews] = useState<any>([]);
  

  useEffect(() => {
    axios.get(`${BASE_URL}/api/News`)
    .then(res => {
      setListNews(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
      <div className='max-w-full mx-auto mt-16 mb-0 bg-white-500 rounded-sm p-10'>
        <div className='w-full'>
          <section className='aspect-video w-full grid grid-cols-8 max-h-[50vh]'>
            {
              listNews && (
                <div className='relative col-span-5 max-h-[50vh]'>
                  <div className='w-full'>
                    <Image
                      src={listNews[0]?.image || '/peguin.jpg'}
                      alt="Animal"
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <div className="absolute inset-0 h-full grid grid-cols-6 grid-rows-6 gap-0 bg-gradient-to-t from-stone-900 from-10% to-40%">
                    <div className="col-start-1 col-end-2 row-start-1mb-0 pb-0"><span className=' bg-white-300 '>Popular news</span></div>
                    <div className="col-start-1 col-end-6 row-start-5 text-white">
                      <span className='text-5xl pt-3 text-white-500 px-1'><span className='text-base pl-1'>{listNews[0]?.date}</span>{listNews[0]?.title}</span>
                    </div>
                    <div className="col-start-1 col-end-7 row-start-6 text-xl text-white-500 pt-3 px-1">{listNews[0]?.description}</div>
                  </div>
                </div>
              )
            }
            
            
            <div className=" col-span-3 max-h-[50vh]">
              <ScrollArea className="h-full w-full">
                <div className="text-white">
                {listNews.map((listNew:any, index:any) => (
                  <div key={index} className="">
                    <div className="flex justify-start pt-3 px-3">
                      <Image
                        src={listNew?.image || '/peguin.jpg'}
                        alt="Animal"
                        width={100}
                        height={100}
                      />
                      <div className="w-5/6 bg-black-600">
                        <h4>{listNew?.title || 'title'}</h4>
                        <p className="text-gray-100">{listNew?.description || 'descripiton'}</p>
                        <a href="#" className="text-blue-500 block hover:underline">Read More</a>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </ScrollArea>
            </div>
          </section>
        </div>

        <div className='mt-20'>
          <h2 className='p-4 font-amsi'>News In Zooma</h2>
          <NewSlider />       
        </div>            
      </div>
  )
}

export default NewsPage