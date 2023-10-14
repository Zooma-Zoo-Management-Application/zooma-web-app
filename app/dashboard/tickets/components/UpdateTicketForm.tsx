"use client"
 
import { Icons } from "@/components/shared/Icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateTicket } from "@/lib/api/ticketAPI"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
const formSchema = z.object({
  name: z.string().min(2).max(30),
  description: z.string().min(2).max(50),
  price: z.number().min(0),
})

interface IProps {
  ticketId: string
  defaultValues: z.infer<typeof formSchema>
  setOpen: (value: boolean) => void
  handleUpdate: (data:{
    name: string
    description: string
    price: number
  }) => void
}

export default function UpdateTicketForm({ticketId, defaultValues, setOpen, handleUpdate}:IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues.name,
      description: defaultValues.description,
      price: +defaultValues.price,
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)

    let ticketBody : any = {
      name: values.name,
      description: values.description,
      price: values.price,
    };

    updateTicket(ticketId, ticketBody)
    .then(res => {
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      handleUpdate({
        name: values.name,
        description: values.description,
        price: values.price,
      })
      setOpen(false)
    })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public ticket&apos;s name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} 
                  onChange={event => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>Update</>
          )
          }
          </Button>
      </form>
    </Form>
  )
}
