"use client"

import { CardContent, CardHeader } from '@/components/ui/card';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type FormWrapperProps = {
  title: string
  description: string
  children: ReactNode
}

const formVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      ease: "easeOut",
    },
  },
};

export function FormWrapper({ title, description, children}: FormWrapperProps) {
  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <CardHeader>
        <h1 className='text-3xl font-bold sm:mx-auto font-amsi sm:text-4xl'>{title}</h1>
        <span className='text-sm mx-auto text-gray-600 sm:text-base'>{description}</span>
        {/* Choose at least 1 ticket type, if you choose a children ticket, at least an adult or an senior must be chosen */}
      </CardHeader>
      <CardContent className='px-0 sm:px-6'>
        {children}
      </CardContent>
    </motion.div>
  )
}