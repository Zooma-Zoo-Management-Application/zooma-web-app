"use client"
import TipTap from '@/components/tiptap/TipTap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/constants/appInfos';
import axios from 'axios';
import { differenceInHours, format } from 'date-fns';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function NewViewPage() {
  const { newId } = useParams();
  const [newData, setNewData] = React.useState<any>(null);
  const router = useRouter()

  useEffect(() => {
    axios.get(`${BASE_URL}/api/News/${newId}`)
    .then(res => {
      setNewData(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }, [newId])

  
  return (
    <div className='p-10 bg-light rounded-sm'>
      {
        newData && (
          <>
            <div className="relative w-full h-80 mx-auto">
            {
              newData.image ? (
                <Image
                  src={newData.image}
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
            <h1 className='my-4'>{newData.title}</h1>
            <span className='text-base'>{newData.description}</span>
            <div className="flex items-center space-x-4 my-4 mt-8">
              <Avatar>
                <AvatarImage src="/peguin.jpg" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className="text-sm font-medium leading-none">Jackson Lee</span>
                <span className="text-sm text-muted-foreground">span@example.com</span>
              </div>
              <span className='text-gray-600 text-sm self-center my-1 pl-10'>Create at {format(new Date(newData.date), "HH:mm:ss dd/LL/yyyy")} - {differenceInHours(new Date(), new Date(newData.date))} hours ago</span>
            </div>
            <TipTap content={newData.content} editable={false}/>
          </>
        )
      }
    </div>
  )
}

export default NewViewPage