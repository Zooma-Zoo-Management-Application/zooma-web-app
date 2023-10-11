"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Icons } from "@/components/shared/Icons"
import Tiptap from "@/components/tiptap/TipTap"
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
import FirebaseService from "@/lib/FirebaseService"
import { editNew } from "@/lib/api/newAPI"
import { isBase64Image } from "@/lib/utils"
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

// This can come from your database or API.

const formNewSchema = z.object({
  title: z.string()
  .min(3, {message: 'Name must be at least 3 characters.'}),
  description: z.string()
  .min(3, {message: 'Name must be at least 3 characters.'}),
  content: z.string()
  .min(3, {message: 'Name must be at least 3 characters.'}),
  image: z.string().url().nonempty(),
  })
  

type FormNewValues = z.infer<typeof formNewSchema>

export function NewsForm({ newParam } : any) {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter()

  const defaultValues: Partial<FormNewValues> = {
    title: newParam.title || "",
    description: newParam.description || "",
    content: newParam.content || "",
    image: newParam.image || "",
  }

  const form = useForm<FormNewValues>({
    resolver: zodResolver(formNewSchema),
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


  async function onSubmit(values: FormNewValues) {
    setIsLoading(true);
    console.log("submit")
    const blob = values.image;

    const hasImageChanged = isBase64Image(blob);

    // random from 1-10000
    const randomInt = (max: number) => Math.floor(Math.random() * max) + 1;

    if(hasImageChanged) {
      // const imgRes = await startUpload(files);
      const imageRef = ref(FirebaseService.storage, `news/${values.title}` + randomInt(10000));
      uploadBytes(imageRef, files[0]).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            values.image = url;

            let newsbody : any = {
              title: values.title,
              description: values.description,
              content: values.content,
              image: values.image,
              userId: 1
            };
            editNew(newParam.id, newsbody)
          })
          .catch((error) => {
            console.log(error.message);
            values.image = "";
          })
          .finally(() => {
            setIsLoading(false);
            router.push(`/dashboard/news/${newParam.id}/view`);
          })
          ;
      });
    } else {
      let newsbody : any = {
        title: values.title,
        description: values.description,
        content: values.content,
        image: values.image,
        userId: 1
      };
      editNew(newParam.id, newsbody)
      .finally(() => {
        setIsLoading(false);
        router.push(`/dashboard/news/${newParam.id}/view`);
      })
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-full">
                  {field.value ? (
                      <div className="relative w-full h-60 mx-auto">
                        <Image
                          src={
                            field.value
                          }
                          layout='fill'
                          className="rounded-t-md"
                          objectFit='cover'
                          alt="News"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-60 mx-auto">
                        <Image
                          src="/peguin.jpg"
                          layout='fill'
                          className="rounded-t-md"
                          objectFit='cover'
                          alt="News"
                        />
                      </div>
                    )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-500">
                  <Input 
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo" 
                    className="account-form_image-input opacity-0"
                    onChange={e => handleImage(e, field.onChange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="New's title" {...field} />
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
                  <Input placeholder="New's description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Tiptap content={field.value} handleUpdate={(html) => field.onChange(html)}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" disabled={isLoading}
         className="w-full hover:shadow-primary-md">
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>Edit New</>
          )
          }
          </Button>
      </form>
    </Form>
  )
}