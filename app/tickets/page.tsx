"use client"

import CardChooseDate from '@/components/Cards/card-choose-date';
import CardProfile from '@/components/Cards/card-profile';
import CardTicket from '@/components/Cards/card-ticket';
import SuccessMessage from '@/components/shared/SuccessMessage';
import Header from '@/components/shared/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useMultiplestepForm } from '@/hooks/useMultiplestepForm';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

type FormItems = {
  ticketTypes: {
    id: number,
    name: 'adult' | 'children' | 'senior',
    description?: string,
    price: number,
    quanity: number
  }[],
  date: Date,
}

const initialValues: FormItems = {
  ticketTypes: [
    {
      id: 1,
      name: 'children',
      description: 'Under 1.2m',
      price: 100000,
      quanity: 0
    },
    {
      id: 2,
      name: 'adult',
      description: 'From 1.2m',
      price: 200000,
      quanity: 0
    },
    {
      id: 3,
      name: 'senior',
      description: 'From 1.2m',
      price: 150000,
      quanity: 0
    }
  ],
  date: new Date()
}

function TicketsPage() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(3);

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

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { ticketTypes, date } = fieldToUpdate;

    // if (name && name.trim().length < 3) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     name: "Name should be at least 3 characters long",
    //   }));
    // } else if (name && name.trim().length > 15) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     name: "Name should be no longer than 15 characters",
    //   }));
    // } else {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     name: "",
    //   }));
    // }
    // if (email && !/\S+@\S+\.\S+/.test(email)) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     email: "Please enter a valid email address",
    //   }));
    // } else {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     email: "",
    //   }));
    // }

    // if (phone && !/^[0-9]{10}$/.test(phone)) {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     phone: "Please enter a valid 10-digit phone number",
    //   }));
    // } else {
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     phone: "",
    //   }));
    // }

    setFormData({ ...formData, ...fieldToUpdate });
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    nextStep();
  };


  return (
    <>
      <Header isScrollEffect={false} />
      <section className='bg-light w-full'>
        <div className='max-w-6xl mx-auto mt-24 py-5 flex flex-col items-center'>
          <div className="flex flex-col items-start gap-2 sm:gap-0 sm:flex-row sm:items-center p-3 text-sm font-medium dark:text-gray-400 sm:text-base sm:p-4 sm:space-x-4">
            {!showSuccessMsg ? (
              <>
                {
                stepper.map((step, index) => (
                    <li key={step.label} className={`cursor-pointer flex items-center ${index == currentStepIndex && "text-primary dark:text-primary"}`} onClick={() => goTo(index)}>
                        <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0 ${step.isActive && "border-primary dark:border-primary"}`}>
                            {index + 1}
                        </span>
                        <span className="hidden sm:block">{step.label}</span>
                        {
                          stepper && index !== stepper.length - 1 && (
                            <svg className="hidden sm:block w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                              <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                            </svg>
                          )
                        }
                    </li>
                  ))
                }
              </>
            ) : (
              ""
            )}
          </div>
          <div className='w-full'>
            <Card className='w-full p-2 space-x-2 mt-2'>
              
              {showSuccessMsg ? (
                <AnimatePresence mode="wait">
                  <SuccessMessage />
                </AnimatePresence>
              ) : (
                <>
                  <CardContent>
                      <form
                        onSubmit={handleOnSubmit}
                        className="w-full flex flex-col justify-between h-full"
                      >
                        <AnimatePresence mode="wait">
                          {currentStepIndex === 0 && (
                            <CardTicket 
                              key="step1"
                              {...formData}
                              // updateForm={updateForm}
                              // errors={errors}
                            />
                          )}
                          {currentStepIndex === 1 && (
                            <div 
                            key="step2"
                            {...formData}
                            // updateForm={updateForm}
                            // errors={errors}
                            >
                              Hello
                            </div>
                          )}
                          {currentStepIndex === 1 && (
                            <CardTicket 
                            key="step3"
                            {...formData}
                            // updateForm={updateForm}
                            // errors={errors}
                          />
                          )}
                        </AnimatePresence>
                        <div className="w-full items-center flex justify-between">
                          <div className="">
                            <Button
                              onClick={previousStep}
                              type="button"
                              variant="ghost"
                              className={`${
                                isFirstStep
                                  ? "invisible"
                                  : "visible p-0 text-neutral-200 hover:text-white"
                              }`}
                            >
                              Go Back
                            </Button>
                          </div>
                          <div className="flex items-center">
                            <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                              <Button
                                type="submit"
                                className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-black/10 rounded-xl hover:text-white"
                              >
                                {isLastStep ? "Confirm" : "Next Step"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                </>
              )}

            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default TicketsPage