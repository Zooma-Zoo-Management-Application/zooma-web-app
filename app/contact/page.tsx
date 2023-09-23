import Header from '@/components/shared/Header'
import { Button } from '@/components/ui/button'
import React from 'react'

function ContactPage() {
  return (
    <div>
      <Header isScrollEffect={false}/>
      <section className='w-full mt-24 p-6'>
        Contact Page //Write here
        <Button>Button</Button>
      </section>
    </div>
  )
}

export default ContactPage