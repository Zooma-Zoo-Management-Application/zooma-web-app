import Header from '@/components/shared/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatVND } from '@/lib/utils'
import { ArrowBigLeft, ArrowBigRight, ArrowRightCircle, Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function TicketsPage() {

  const stepper = [{
    label: 'Choose Your Ticket',
    isActive: true
    },{
    label: 'Choose Your Date',
    isActive: false
    },{
    label: 'Enter Your Details',
    isActive: false
  }]

  const ticketTypes = [{
    label: 'Children',
    description: '(0 - 14)',
    price: 49000,
    quantity: 0,
    color: "text-[#FF0000]"
    },{
    label: 'Adult',
    description: '(15 - 59)',
    price: 69000,
    quantity: 0,
    color: "text-[#16A34A]"
    },{
    label: 'Senior',
    description: '(60+)',
    price: 59000,
    quantity: 0,
    color: "text-[#0D0A7C]"
  }]

  return (
    <>
      <Header isScrollEffect={false} />
      <section className='bg-light w-full'>
        <div className='max-w-6xl mx-auto mt-24 py-5 flex flex-col items-center'>
          <div className="flex flex-col items-start gap-2 sm:gap-0 sm:flex-row sm:items-center p-3 text-sm font-medium dark:text-gray-400 sm:text-base sm:p-4 sm:space-x-4">
              {
                stepper.map((step, index) => (
                  <li key={step.label} className={`flex items-center ${step.isActive && "text-primary dark:text-primary"}`}>
                      <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${step.isActive && "border-primary dark:border-primary"}`}>
                          {index + 1}
                      </span>
                          {step.label}
                      {
                        stepper && index !== stepper.length - 1 && (
                          <svg className="hidden sm:block w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                          </svg>
                        )
                      }
                  </li>
                ))
              }
          </div>
          <div className='w-full'>
            <Card className='w-full p-2 space-x-2 mt-2'>
              <CardHeader>
                <Link href="/" className='flex gap-1 text-sm font-bold sm:text-base'>
                  <ArrowBigLeft /> Back
                </Link>
                <h1 className='text-3xl font-bold mx-auto font-amsi sm:text-4xl'>CHOOSE YOUR TICKET</h1>
                <span className='text-sm mx-auto text-red-600 sm:text-base'>Choose at least 1 ticket type, if you choose a children ticket, at least an adult or an senior must be chosen</span>
              </CardHeader>
              <CardContent>
                {
                  ticketTypes.map((ticketType) => (
                    <div key={ticketType.label} className='flex gap-5 sm:gap-0 sm:grid sm:grid-cols-3 justify-items-center items-center py-8'>
                      <div className={`flex flex-1 flex-col items-center justify-center ${ticketType.color}`}>
                        <h4 className='text-base sm:text-3xl font-amsi whitespace-nowrap'>{ticketType.label}</h4>
                        <span className='text-xs sm:text-sm font-bold whitespace-nowrap'>{ticketType.description}</span>
                      </div>
                      <div className='flex justify-center gap-2'>
                        <Button variant="default" size="icon">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input type="number" value={ticketType.quantity} className='flex-1 w-10'/>
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
          </div>
        </div>
      </section>
    </>
  )
}

export default TicketsPage