"use client"

import { TypographyDemo } from '@/components/Typography';
import Example from '@/components/example/Example';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import useCounter from '@/stores/count-store';


export default function Home() {
  const { counter, increaseCounter } = useCounter();

  return (
    <div className='p-10 flex flex-col gap-10 items-start relative'>

      <Label>Tailwind, Zustand, NextJs, framer motion</Label>
      <h1>Count:  {counter}</h1>
      <Button onClick={increaseCounter}>Increase</Button>

      <TypographyDemo />

      <div className='mx-auto my-[100px] pb-[100px] max-w-[500px]'>
        <Example />
      </div>

    </div>
  )
}
