"use client"

import CardChooseDate from '@/components/Cards/card-choose-date';
import CardProfile from '@/components/Cards/card-profile';
import CardTicket from '@/components/Cards/card-ticket';
import Header from '@/components/shared/header'
import React from 'react'

function TicketsPage() {
  const [bookingStep, setBookingStep] = React.useState(1);

  const handleNextStep = () => {
    if(bookingStep === 3) return
    setBookingStep(bookingStep + 1)
  }

  const handlePrevStep = () => {
    if(bookingStep === 1) return
    setBookingStep(bookingStep - 1)
  }

  const stepper = [{
    label: 'Choose Your Ticket',
    isActive: true,
    component: <CardTicket />
    },{
    label: 'Choose Your Date',
    isActive: false,
    component: <CardChooseDate />
    },{
    label: 'Enter Your Details',
    isActive: false,
    component: <CardProfile />
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
            {
              stepper[bookingStep - 1].component
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default TicketsPage