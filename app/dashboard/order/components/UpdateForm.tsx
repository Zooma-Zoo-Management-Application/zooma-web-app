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
import { updateOrder } from "@/lib/api/orderAPI"
import { ChangeEvent, useState } from "react"
import { twMerge } from "tailwind-merge"
import { getStatus } from "@/lib/utils"

const UpdateValidation = z.object({
  paymentMethod: z.string(),
  status: z.string(),
  notes: z.string().min(10, "Notes must be at least 10 characters"),
});


type UpdateFormValues = z.infer<typeof UpdateValidation>

export function UpdateForm({id, values, setOpen}: any) {
  const [files, setFiles] = useState<File[]>([]);

  const defaultValues: Partial<UpdateFormValues> = {
    paymentMethod: values.paymentMethod,
    status: values.status,
    notes: values.notes,
  }

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(UpdateValidation),
    defaultValues,
    mode: "onChange",
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if(e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      setFiles(Array.from(e.target.files));

      if(!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';
        fieldChange(imageDataUrl);
      }

      fileReader.readAsDataURL(file);
    }
  }

  async function onSubmit(values: UpdateFormValues) {
    updateOrder(id, {
      "paymentMethod": values.paymentMethod,
      "status": +values.status,
      "notes": values.notes
    })
    .then((res) => {
      toast({
        title: "Order updated",
        description: "Order has been updated successfully.",
      });
      setOpen(false);
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VnPay">VNPay</SelectItem>
                    <SelectItem value="Money">Money</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">
                      <div className={twMerge("text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3 self-start bg-red-100 text-red-800", 
                        getStatus(0).color)}>{
                        getStatus(0).text
                      }</div>
                    </SelectItem>
                    <SelectItem value="1">
                      <div className={twMerge("text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3 self-start bg-yellow-100 text-yellow-800", 
                        getStatus(1).color)}>{
                        getStatus(1).text
                      }</div>
                    </SelectItem>
                    <SelectItem value="2">
                      <div className={twMerge("text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3 self-start bg-green-100 text-green-800", 
                        getStatus(2).color)}>{
                        getStatus(2).text
                      }</div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className={twMerge("text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3 self-start bg-gray-100 text-gray-800", 
                        getStatus(3).color)}>{
                        getStatus(3).text
                      }</div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea rows={10} placeholder="Notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit">Update order</Button>
      </form>
    </Form>
  )
}