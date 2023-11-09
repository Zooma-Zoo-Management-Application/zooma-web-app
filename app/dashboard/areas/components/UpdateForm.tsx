"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { updateCage } from "@/lib/api/cageAPI"
import { getStatus } from "@/lib/utils"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/shared/Icons"
import useRefresh from "@/stores/refresh-store"
import { getAreas } from "@/lib/api/areaAPI"

const UpdateValidation = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  animalLimit: z.number(),
  areaId: z.string(),
});


type UpdateFormValues = z.infer<typeof UpdateValidation>

export function UpdateForm({id, values, setOpen}: any) {
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

  const defaultValues: Partial<UpdateFormValues> = {
    name: values.name,
    description: values.description,
    animalLimit: values.animalLimit,
    areaId: values.areaId.toString() || "1",
  }

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(UpdateValidation),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(values: UpdateFormValues) {
    updateCage(id, {
      "name": values?.name || "",
      "animalLimit": values?.animalLimit || 1,
      "description": values?.description || "",
      "areaId": values?.areaId || "1",
    })
    .then((res) => {
      toast({
        title: "Area updated",
        description: "Area has been updated successfully.",
      });
      setOpen(false);
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
          <div className="grid grid-cols-2 gap-2">
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
                          <SelectItem key={area.id+area.name} value={area.id.toString()}
                          >{area.id.toString()}. {area.name}</SelectItem>
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
            name="animalLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Animal Limit</FormLabel>
                <FormControl>
                  <Input type="number"  
                    placeholder="Animal Limit" {...field} 
                    min={1}
                    max={100}
                    {...field}
                    onChange={event => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
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