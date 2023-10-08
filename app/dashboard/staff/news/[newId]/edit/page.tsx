"use client"
import TipTap from '@/components/tiptap/TipTap';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { NewsForm } from './NewsForm';
import { BASE_URL } from '@/constants/appInfos';

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
    <div className='p-10'>
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-4">Edit New</h2>
      </div>
      <div>
        {
          newData ? (
            <NewsForm newParam={newData}/>
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
    </div>
  )
}

export default NewViewPage