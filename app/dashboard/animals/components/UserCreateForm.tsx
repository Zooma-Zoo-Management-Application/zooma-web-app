"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/components/shared/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { toast } from "@/components/ui/use-toast"
import FirebaseService from "@/lib/FirebaseService"
import { getTypes } from "@/lib/api/typeAPI"
import { registerUserBasedRole } from "@/lib/api/userAPI"
import { cn, isBase64Image } from "@/lib/utils"
import { format } from "date-fns"
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createSpecies } from "@/lib/api/speciesAPI"
import useRefresh from "@/stores/refresh-store"

// This can come from your database or API.

const formSignUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    imageUrl: z.string().url("Please enter a valid URL"),
    typeId: z.string(),
  })
  

type SignUpFormValues = z.infer<typeof formSignUpSchema>

export function UserCreateForm({setOpen}: {setOpen: (value: boolean) => void}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const [types, setTypes] = useState<any>([])

  const { refresh } = useRefresh()

  useEffect(() => {
    const initialize = async () => {
      try {
        const res = await getTypes();
        const { data } = res;
        setTypes(data);
      } catch (err:any) {
      } 
    };
    initialize();
  }, [])

  const defaultValues: Partial<SignUpFormValues> = {
    name: "",
    description: "",
    imageUrl: "",
    typeId: "1",
  }

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSignUpSchema),
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

  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true);

    const blob = values.imageUrl;

    const hasImageChanged = isBase64Image(blob);

    if(hasImageChanged) {
      const imageRef = ref(FirebaseService.storage, `images/${values.name + "hello"}`);
      uploadBytes(imageRef, files[0]).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            values.imageUrl = url;
            createSpecies({
              "name": values.name,
              "description": values.description,
              "imageUrl": values.imageUrl,
              "typeId": values.typeId,
            })
            .then((response) => {
              if(response.data !== null) {
                toast({
                  title: "Create Species Success",
                  description: "Create Species Success",
                })
                setIsLoading(false);
                setOpen(false);
              } else {
                toast({
                  title: "Create Species Failed",
                  description: JSON.stringify(response.error),
                })
                setIsLoading(false);
                values.imageUrl = "";
              }
            })
          })
          .catch((error) => {
            toast({
              title: "Login Error",
              description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-light">{JSON.stringify(error, null, 2)}</code>
                </pre>
              )
            })
            setIsLoading(false);
            values.imageUrl = "";
          })
          .finally(() => {
            setTimeout(() => {
              refresh();
            }, 1000);
          });
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                    <Image
                      src={
                          field.value
                      }
                      alt="profile photo"
                      width={100}
                      height={100}
                      priority
                      className="rounded-full object-cover h-full w-full"
                    />
                  ) : (
                    <Image
                      src= "/Zooma_Logo.svg"
                      alt="profile photo"
                      width={100}
                      height={100}
                      priority
                      className="object-contain"
                    />
                  )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-500">
                <Input 
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo" 
                  className="account-form_image-input"
                  onChange={e => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Species name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Species Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Species Types" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      types && types.map((type: any) => (
                        <SelectItem key={type.id+type.name} value={type.id.toString()}>{type.name}</SelectItem>
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
                  <Textarea rows={10} placeholder="Species description" {...field} />
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