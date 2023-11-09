"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/components/shared/Icons"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { createAnimal, updateAnimal } from "@/lib/api/animalAPI"
import { getDiets } from "@/lib/api/dietAPI"
import { getSpecies } from "@/lib/api/speciesAPI"
import { cn } from "@/lib/utils"
import useRefresh from "@/stores/refresh-store"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

const UpdateValidation = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
    arrivalDate: z.date().refine((date) => date <= new Date(), {
      message: "Arrival date must be in the past",
    }),
    dateOfBirth: z.date().refine((date) => date <= new Date(), {
      message: "Date of birth must be in the past",
    }),
    height: z.number().min(0, "Height must be greater than 0"),
    weight: z.number().min(0, "Weight must be greater than 0"),
    description: z.string().min(3, "Description must be at least 3 characters"),
    speciesId: z.string(),
    dietId: z.string().nullable(),
    cageId: z.string().nullable(),
    trainingPlanId: z.string().nullable(),
});


type UpdateFormValues = z.infer<typeof UpdateValidation>

export function UpdateForm({id, values, setOpen}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const [species, setSpecies] = useState<any>([])
  const [diets, setDiets] = useState<any>([])

  const { refresh } = useRefresh()

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getSpecies();
        const { data } = res;
        setSpecies(data);
      } catch (err:any) {
      } 
    };
    initialize();
  }, [])

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getDiets();
        const { data } = res;
        setDiets(data);
      } catch (err:any) {
      } 
    };
    initialize();
  }, [])

  const defaultValues: Partial<UpdateFormValues> = {
    name: values.name,
    arrivalDate: values.arrivalDate,
    dateOfBirth: values.dateOfBirth,
    height: values.height,
    weight: values.weight,
    description: values.description,
    speciesId: values.speciesId,
    dietId: values.dietId,
    cageId: values.cageId,
    trainingPlanId: values.trainingPlanId,
  }

  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(UpdateValidation),
    defaultValues,
    mode: "onChange",
  });  

  async function onSubmit(values: UpdateFormValues) {
    setIsLoading(true);

    updateAnimal(id,{
      "name": values.name,
      "arrivalDate": values.arrivalDate.toISOString(),
      "dateOfBirth": values.dateOfBirth.toISOString(),
      "height": values.height,
      "weight": values.weight,
      "description": values.description,
      "status": true,
      "speciesId": values.speciesId,
      "dietId": values.dietId,
      "cageId": values.cageId,
      "trainingPlanId": values.trainingPlanId,
    })
    .then((response) => {
      if(response.data !== null) {
        toast({
          title: "Update Animal Success",
          description: "Update Animal Success",
        })
        setIsLoading(false);
        setOpen(false);
      } else {
        toast({
          title: "Update Animal Failed",
          description: JSON.stringify(response.error),
        })
        setIsLoading(false);
      }
    })
    .finally(() => {
      setTimeout(() => {
        refresh();
      }, 1000);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Animal name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} 
                      placeholder="Animal weight" {...field} 
                      step={0.01}
                      onChange={event => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} 
                      {...field} 
                      placeholder="Animal height" 
                      step={0.01}
                      onChange={event => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="arrivalDate"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2 justify-start  gap-0">
                  <FormLabel>Arrival Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromYear={1960}
                        toYear={2023}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2 justify-start  gap-0">
                  <FormLabel>Date Of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        captionLayout="dropdown-buttons"
                        fromYear={1960}
                        toYear={2023}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="speciesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Species Type</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value.toString())} defaultValue={(field.value ?? undefined)?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Species Types" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-scroll z-[1000] h-[200px]">
                      {
                        species && species.map((specie: any) => (
                          <SelectItem key={specie.id+specie.name} value={specie.id.toString()}>{specie.name}</SelectItem>
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
              name="dietId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet</FormLabel>
                  <Select onValueChange={(value) => field.onChange(value.toString())} defaultValue={(field.value ?? undefined)?.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Diet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-scroll z-[1000] h-[200px]">
                      {
                        diets && diets.map((diet: any) => (
                          <SelectItem key={diet.id+diet.name} value={diet.id.toString()}>{diet.name}</SelectItem>
                        ))
                      }
                      
                    </SelectContent>
                  </Select>
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
                  <Textarea rows={3} placeholder="Species description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button disabled={isLoading} type="submit" className="w-full hover:shadow-primary-md">
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Update
        </Button>             
      </form>
    </Form>
  )
}