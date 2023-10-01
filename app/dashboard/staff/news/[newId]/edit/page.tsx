"use client"
import { Input } from '@/components/ui/input';
import React, { useEffect } from 'react';

function NewViewPage() {
  const [text, setText] = React.useState("1");
  const [result, setResult] = React.useState("");

  useEffect(() => {
    const controller = new AbortController();

    const delayDebounceFn = setTimeout(() => {
      fetch("https://dummyjson.com/posts/" + text, {
      signal: controller.signal,  
      })
      .then((response) => response.json())
      .then((data) => {
        setResult(JSON.stringify(data.id))
      })
      .catch((error) => {
        console.log(error.message)
      })

      return 

    }, 2000)

    return () => {
      controller.abort();
      clearTimeout(delayDebounceFn);
    }

  }, [text])
  
  return (
    <div className='p-24'>
      <Input type='number' min={0} max={70} onChange={(e) => setText(e.target.value)} />
      <h1>{result}</h1>
    </div>
  )
}

export default NewViewPage