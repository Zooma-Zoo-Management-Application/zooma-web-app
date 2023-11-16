"use client"

import Header from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { withProtected, withPublic } from '@/hooks/useAuth';
import { returnVNPay } from '@/lib/api/orderAPI';
import { ArrowLeft, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Fragment } from 'react';

function Page() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [message, setMessage] = React.useState<string>("")
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)

  React.useEffect(() => {
    const initialize = async () => {
      try {
        const { data, error } = await returnVNPay(searchParams.toString());
        if(error){
          setMessage(error);
          setIsSuccess(false);
        }else{
          setMessage(data.message);
          setIsSuccess(true);
        }
      } catch (err:any) {
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [])

  return (
    <div>
      <Header />
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="p-12 max-w-[400px] md:mx-auto bg-white-500">
          {
            isLoading ? (
              <Skeleton className="w-40 h-24" />
            ) : (
              <>
                {
                  isSuccess ? (
                    <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                  ) : (
                    <div className='flex items-center justify-center my-4'>
                      <XCircle className='w-16 h-16 text-red-600'/>
                    </div>
                  )
                }
              </>
            )
          }
          <div className="text-center space-y-4">
              {
                isLoading ? (
                  <div className='space-y-4'>
                    
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                ) : (
                  <Fragment>
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">{message}</h3>
                    <p className="text-gray-600 my-2">{
                      isSuccess ? (
                        "Your order has been successfully paid!"
                      ) : (
                        "Your order has been canceled!"
                      )
                    }</p>
                    {
                    isSuccess && (
                      <p>Have a great day!</p>
                    )
                    } 
                    {
                      isSuccess ? (
                        <Button variant={"default"}>
                            <Link href="/profile/order-history">
                              Check your order history here
                            </Link>
                        </Button>
                      ) : (
                        <Button variant={"default"}>
                            <Link href="/tickets" className='gap-2 flex items-center justify-center'>
                            <ArrowLeft className='w-4 h-4'/> Try again 
                            </Link>
                        </Button>
                      )
                    }
                  </Fragment>
                )
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default withPublic(Page)