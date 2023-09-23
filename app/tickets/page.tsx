"use client"

import SuccessMessage from '@/components/SuccessMessage';
import DateChooseForm from '@/components/form/DateChooseForm';
import FinalStep from '@/components/form/FinalStep';
import SideBar from '@/components/form/SidebarStep';
import TicketChooseForm from '@/components/form/TicketChooseForm';
import UserInfoForm from '@/components/form/UserInfoForm';
import { Button } from '@/components/ui/button';
import { useMultiplestepForm } from '@/hooks/useMultiplestepForm';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

// type FormItems = {
//   ticketTypes: {
//     id: number,
//     name: 'adult' | 'children' | 'senior',
//     description?: string,
//     price: number,
//     quanity: number
//   }[],
//   date: Date,
// }

interface Tickets {
  id: number;
  label: "Children" | "Adult" | "Senior";
  description: string;
  quantity: number;
  price: number;
}

export type FormItems = {
  name: string;
  email: string;
  phone: string;
  date: Date;
  yearly: boolean;
  tickets: Tickets[];
};

const initialValues: FormItems = {
  name: "",
  email: "",
  phone: "",
  date: new Date(),
  yearly: false,
  tickets: [
    {
      id: 1,
      label: "Children",
      description: '(0 - 14)',
      price: 49000,
      quantity: 0,
    },
    {
      id: 2,
      label: "Adult",
      description: '(15 - 59)',
      price: 69000,
      quantity: 0,
    },
    {
      id: 3,
      label: "Senior",
      description: '(60+)',
      price: 59000,
      quantity: 0,
    },
  ],
};
// const initialValues: FormItems = {
//   ticketTypes: [
//     {
//       id: 1,
//       name: 'children',
//       description: 'Under 1.2m',
//       price: 100000,
//       quanity: 0
//     },
//     {
//       id: 2,
//       name: 'adult',
//       description: 'From 1.2m',
//       price: 200000,
//       quanity: 0
//     },
//     {
//       id: 3,
//       name: 'senior',
//       description: 'From 1.2m',
//       price: 150000,
//       quanity: 0
//     }
//   ],
//   date: new Date()
// }

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
  } = useMultiplestepForm(4);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, email, phone } = fieldToUpdate;

    if (name && name.trim().length < 3) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be at least 3 characters long",
      }));
    } else if (name && name.trim().length > 15) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be no longer than 15 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      setErrors((prevState) => ({
        ...prevState,
        phone: "Please enter a valid 10-digit phone number",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        phone: "",
      }));
    }

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
    <div className='h-screen'>
      <section className='w-full h-full flex justify-center xl:grid xl:grid-cols-6'>
        <div className='w-full h-full wood-sand-texture flex justify-center items-center col-span-4'>
          <div
            className={` flex justify-between w-11/12 max-w-4xl relative m-1 rounded-lg p-4`}
          >
            {!showSuccessMsg ? (
              <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
            ) : (
              ""
            )}
            <main
              className={`${showSuccessMsg ? "w-full" : "w-full md:mt-5 md:w-[65%]"}`}
            >
              {showSuccessMsg ? (
                <AnimatePresence mode="wait">
                  <SuccessMessage />
                </AnimatePresence>
              ) : (
                <form
                  onSubmit={handleOnSubmit}
                  className="w-full flex flex-col justify-between h-full"
                >
                  <AnimatePresence mode="wait">
                    {currentStepIndex === 0 && (
                      <TicketChooseForm key="step3" {...formData} updateForm={updateForm} />
                    )}
                    {currentStepIndex === 1 && (
                      <DateChooseForm key="step2" {...formData} updateForm={updateForm} />
                    )}
                    {currentStepIndex === 2 && (
                      <UserInfoForm
                        key="step1"
                        {...formData}
                        updateForm={updateForm}
                        errors={errors}
                      />
                    )}
                    {currentStepIndex === 3 && (
                      <FinalStep key="step4" {...formData} goTo={goTo} />
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
                            : "visible"
                        }`}
                      >
                        Go Back
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                        <Button
                          type="submit"
                          className="relative"
                          variant="default"
                        >
                          {isLastStep ? "Confirm" : "Next Step"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </main>
          </div>
        </div>
        <div className='hidden xl:block col-span-2'>
          <Image src="/red-panda.jpg" 
          alt='red panda' 
          layout="fill" 
          objectFit="cover"
          className="z-[-1] translate-x-[40%]"
          />
        </div>
      </section>
    </div>
  )
}

export default TicketsPage