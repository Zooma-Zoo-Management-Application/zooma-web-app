"use client"

import Header from '@/components/shared/header';
import HomeLayout from '@/components/shared/home-layout';
import useCounter from '@/stores/count-store';

export default function Home() {
  const { counter, increaseCounter } = useCounter();

  return (
    <>
      <Header />
      <HomeLayout />      
      {/* <Label>Tailwind, Zustand, NextJs, framer motion</Label>
      <h1>Count:  {counter}</h1>
      <Button onClick={increaseCounter}>Increase</Button>

      <TypographyDemo />

      <div className='mx-auto my-[100px] pb-[100px] max-w-[500px]'>
        <Example />
      </div> */}

    </>
  )
}
