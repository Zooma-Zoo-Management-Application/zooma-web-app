"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import useCounter from '@/stores/count-store';

export default function Home() {
  const { counter, increaseCounter } = useCounter();

  return (
    <div className='flex w-80 m-auto flex-col justify-center items-center gap-10 mt-10'>
      <Label>Tailwind, Zustand, NextJs</Label>
      <h1>Count:  {counter}</h1>
      <Button onClick={increaseCounter}>Toggle Theme</Button>
    </div>
  )
}
