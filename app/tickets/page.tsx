"use client"

import DateChooseForm from '@/app/tickets/components/form/DateChooseForm';
import FinalStep from '@/app/tickets/components/form/FinalStep';
import SideBar from '@/app/tickets/components/form/SidebarStep';
import TicketChooseForm from '@/app/tickets/components/form/TicketChooseForm';
import UserInfoForm from '@/app/tickets/components/form/UserInfoForm';
import { Button } from '@/components/ui/button';
import { withPublic } from '@/hooks/useAuth';
import { useMultiplestepForm } from '@/hooks/useMultiplestepForm';
import { checkoutTicket, getTickets } from '@/lib/api/ticketAPI';
import useOrder from '@/stores/order-store';
import useUserState from '@/stores/user-store';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Tickets {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export type FormItems = {
  currentUser: any;
  date: Date;
  tickets: Tickets[];
};


function TicketsPage() {
  const { order, setOrder, setTickets, setCurrentUser } = useOrder();
  const { currentUser } = useUserState()
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const callbackStepUrl = searchParams.get("step") || "0";

  const [link, setLink] = useState<string>("/profile/order-history")


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

  useEffect(() => {
    const initialize = async () => {
      try {
        const tickets = await getTickets();
        setTickets(tickets.data.map((ticket: any) => {
          const quantity = order.tickets.find((orderTicket: any) => orderTicket.id === ticket.id)?.quantity || 0
          return {
            ...ticket,
            quantity
          }
        }))

        if(currentUser !== null) {
          setCurrentUser(currentUser)
        }
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, [currentUser])

  useEffect(() => {
    goTo(+callbackStepUrl-1);
  },[callbackStepUrl])

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isLastStep){
      checkoutTicket(order)
      .then((res) => {
        const { data } = res;
        console.log("sadasdasd data",data)
        setLink(data.url)


      })
      .catch((error : any) => {
        console.log(error)
      })
    }
    nextStep();
  };

  const router = useRouter()

  return (
    <div className='h-screen'>
      <section className='w-full h-full flex justify-center xl:grid xl:grid-cols-6'>
        <div className='w-full h-full wood-sand-texture flex flex-col justify-center items-center col-span-4 p-4'>
          <div className="hidden lg:flex relative self-start z-20 items-start text-lg font-medium ml-16">
            <Image
              src="/logos/Zooma_Black_Text.svg"
              alt="logo"
              width={150}
              height={150}
              onClick={() => router.push("/")}
              className='cursor-pointer'
            />
          </div>
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
                  <div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                          <path fill="currentColor"
                              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                          </path>
                      </svg>
                      <h1 className="text-3xl font-semibold text-center">
                        Thank you for your order!
                      </h1>
                      <div className="text-lg text-center">
                        Please&nbsp;
                         <Link href={link} className='font-bold underline'>checkout</Link>
                        &nbsp;to complete your order.
                      </div>
                      <Link href={link}>
                        <Button variant={"default"}>
                          Checkout
                        </Button>
                      </Link>
                      <div>
                        Go to <Link href="/profile/order-history" className='font-bold underline'>Orders</Link> to see your orders.
                      </div>
                      </div>
                  </div>
                </AnimatePresence>
              ) : (
                <form
                  onSubmit={handleOnSubmit}
                  className="w-full flex flex-col justify-between h-full"
                >
                  <AnimatePresence mode="wait">
                    {currentStepIndex === 0 && (
                      <TicketChooseForm key="step1" isLoading={isLoading}/>
                    )}
                    {currentStepIndex === 1 && (
                      <DateChooseForm key="step2" />
                    )}
                    {currentStepIndex === 2 && (
                      <UserInfoForm
                        key="step3"
                        {...order}
                      />
                    )}
                    {currentStepIndex === 3 && (
                      <FinalStep key="step4" {...order} goTo={goTo} />
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

export default withPublic(TicketsPage)
