"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { updateArea } from "@/lib/api/areaAPI"
import useRefresh from "@/stores/refresh-store"

const UpdateValidation = z.object({
  name: z.string(),
  description: z.string()
    .min(10, "Description must be at least 10 characters long"),
});


type UpdateFormValues = z.infer<typeof UpdateValidation>

export function UpdateAreaForm({id, values, setOpen}: any) {
  const { refresh } = useRefresh()

  const defaultValues: Partial<UpdateFormValues> = {
    name: values?.name,
    description: values?.description,
  }

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(UpdateValidation),
    defaultValues,
    mode: "onChange",
  })

  
  async function onSubmit(values: UpdateFormValues) {
    updateArea(id, {
      "name": values.name,
      "description": values.description,
    })
    .then((res) => {
      toast({
        title: "Animal type updated",
        description: "Animal type has been updated successfully.",
      });
      setOpen(false);
    })
    
    setTimeout(() => {
      refresh();
    }, 1000);
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
                  <Input placeholder="Name" {...field} />
                </FormControl>
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
                  <Textarea rows={5} placeholder="Animal Types" {...field} />
                </FormControl>
                <FormDescription>
                  This is a description of area.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit">Update type</Button>
      </form>
    </Form>
  )
}