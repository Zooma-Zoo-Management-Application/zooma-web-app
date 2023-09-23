import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { ArrowBigLeft, ArrowRightCircle, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import { ticketTypes } from '@/constants/tickets'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { formatVND } from '@/lib/utils'

function CardTicket() {
  return (
    <Card className='w-full p-2 space-x-2 mt-2'>
      <CardHeader>
        <Link href="/" className='flex gap-1 text-sm font-bold sm:text-base mb-4'>
          <ArrowBigLeft /> Back
        </Link>
        <h1 className='text-3xl font-bold sm:mx-auto font-amsi sm:text-4xl'>CHOOSE YOUR TICKET</h1>
        <span className='text-sm mx-auto text-gray-600 sm:text-base'>Choose at least 1 ticket type, if you choose a children ticket, at least an adult or an senior must be chosen</span>
      </CardHeader>
      <CardContent className='px-0 sm:px-6'>
        {
          ticketTypes.map((ticketType) => (
            <div key={ticketType.label} className='grid grid-cols-3 gap-2 justify-items-center items-center py-8'>
              <div className={`flex flex-col items-center justify-center text-dark`}>
                <h4 className='text-base sm:text-3xl font-amsi whitespace-nowrap'>{ticketType.label}</h4>
                <span className='text-xs sm:text-sm font-bold whitespace-nowrap'>{ticketType.description}</span>
              </div>
              <div className='flex justify-center gap-2 '>
                <Button variant="default" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
                <Input type="number" value={ticketType.quantity} className='w-10'/>
                <Button variant="default" size="icon" >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className='text-base sm:text-2xl font-amsi whitespace-nowrap flex-1'>
                {formatVND(ticketType.price)}
              </div>
            </div>
          ))
        }
        
        
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <ArrowRightCircle className="mr-2 h-4 w-4" /> Continue 
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardTicket