"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/components/shared/Icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { createCage, getAreas } from "@/lib/api/areaAPI"
import useRefresh from "@/stores/refresh-store"
import { useEffect, useState } from "react"

// This can come from your database or API.

const formSignUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    imageUrl: z.string().url("Please enter a valid URL"),
    areaId: z.string(),
  })
  

type SignUpFormValues = z.infer<typeof formSignUpSchema>

export function CreateForm({setOpen, areaId}: {setOpen: (value: boolean) => void, areaId: number}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [areas, setAreas] = useState<any>([])

  const { refresh } = useRefresh()

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getAreas();
        const { data } = res;
        setAreas(data);
      } catch (err:any) {
      } 
    };
    initialize();
  }, [])

  const defaultValues: Partial<SignUpFormValues> = {
    name: "",
    description: "",
    imageUrl: "",
    areaId: "1",
  }

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(values: SignUpFormValues) {
    createCage(areaId, {
      "name": values.name,
      "description": values.description,
      "imageUrl": values.imageUrl,
      "areaId": values.areaId,
    })
    .then((response) => {
      if(response.data !== null) {
        toast({
          title: "Create Cage Success",
          description: "Create Cage Success",
        })
        setIsLoading(false);
        setOpen(false);
      } else {
        toast({
          title: "Create Cage Failed",
          description: JSON.stringify(response.error),
        })
        setIsLoading(false);
        values.imageUrl = "";
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Cage name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="areaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      areas && areas.map((area: any) => (
                        <SelectItem key={area.id+area.name} value={area.id.toString()}>{area.id}. {area.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripiton</FormLabel>
                <FormControl>
                  <Textarea rows={10} placeholder="Cage description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button disabled={isLoading} type="submit" className="w-full hover:shadow-primary-md">
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create
        </Button>             
      </form>
    </Form>
  )
}