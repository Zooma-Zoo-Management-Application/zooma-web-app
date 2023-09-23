import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function AnimalCard() {
  return (
    <Card className="w-[350px] rounded-none">
      <Image
          src="https://firebasestorage.googleapis.com/v0/b/zooma-bf129.appspot.com/o/90999724_1373586466162248_652645393300979712_n.jpg?alt=media&token=023d1b85-942d-4512-90f2-20a5ee70429b"
          alt="Animal"
          width={400}
          height={300}
          className="object-cover"
        />
      <CardHeader>
        <CardTitle>Trung bình người MU lạc quan nhất</CardTitle>
        <CardDescription>Create at: 08:23 Fri 19/09/2023</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Cuộc sống luôn đầy hy vọng và tiềm năng</p>
      </CardContent>
      <CardFooter className="flex justify-between flex-row-reverse">
        <Button
        >
          View
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor"></path></svg>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AnimalCard