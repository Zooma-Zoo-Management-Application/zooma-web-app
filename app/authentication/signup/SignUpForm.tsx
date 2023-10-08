"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { BASE_URL } from "@/constants/appInfos"
import FirebaseService from "@/lib/FirebaseService"
import { cn, isBase64Image } from "@/lib/utils"
import axios from "axios"
import { format } from "date-fns"
import { getDownloadURL, ref, uploadBytes, } from "firebase/storage"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { Icons } from "@/components/shared/Icons"
import { useRouter } from "next/navigation"
import useUserState from "@/stores/user-store"

// This can come from your database or API.

const formSignUpSchema = z.object({
  // fullname: z.string()
  // .min(3, {message: 'Name must be at least 3 characters.'})
  // .max(30, {message: 'Name must be max 30 characters'}),
  username: z.string()
  .min(3, {message: 'Username must be at least 3 characters.'})
  .max(30, {message: 'Username must be max 30 characters'}),
  email: z.string().email({message: 'Please enter a valid email address.'}),
  gender: z.string().nonempty(),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  avatarUrl: z.string().url().nonempty(),
  // phoneNumber: z.string(),
  newPassword: z.string({
    required_error: "New Password is required",
  })
  .min(3, {message: 'New Password must be at least 6 characters.'})
  .max(30, {message: 'New Password must be max 30 characters'}),
  confirmNewPassword: z.string({}),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Oops! New Password doesnt match",
  })
  

type SignUpFormValues = z.infer<typeof formSignUpSchema>

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([]);

  const { setCurrentUser } = useUserState();
  const router = useRouter();

  const defaultValues: Partial<SignUpFormValues> = {
    username: "",
    email: "",
    // fullname: "",
    gender: "Male",
    dateOfBirth: new Date(),
    avatarUrl: "",
    // phoneNumber: "",`
    newPassword: "",
    confirmNewPassword: "",
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

    const blob = values.avatarUrl;

    const hasImageChanged = isBase64Image(blob);

    if(hasImageChanged) {
      // const imgRes = await startUpload(files);
      const imageRef = ref(FirebaseService.storage, `images/${values.email}`);
      uploadBytes(imageRef, files[0]).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            values.avatarUrl = url;

            let user : any = {
                "userName": values?.username,
                "email": values.email,
                "fullName": "",
                "phoneNumber": "",
                "gender": values.gender,
                "dateOfBirth": values.dateOfBirth,
                "avatarUrl": values.avatarUrl,
                "password": values.newPassword,
                "confirmPassword": values.confirmNewPassword,
            }
            axios.post(`${BASE_URL}/api/Users/sign-up`, user)
            .then((response) => {
              setIsLoading(false);
              let userAndToken = response.data;
              setCurrentUser(userAndToken.user);
              localStorage.setItem("accessToken", response.data.accessToken);
              // if(user.role === "Admin"){
              //   window.location.href = "/admin";
              // }else if(user.role === "Staff"){
              //   window.location.href = "/user";
              // }else{
              //   window.location.href = "/";
              // }
              router.push("/");
            })
          })
          .catch((error) => {
            console.log(error.message);
            values.avatarUrl = "";
          });
      });
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="avatarUrl"
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-stretch">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <div className="relative w-full">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full appearance-none bg-transparent font-normal"
                      )}
                      {...field}
                    >
                      <option value="inter">Male</option>
                      <option value="manrope">Female</option>
                      <option value="system">Other</option>
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2 justify-start  gap-0">
                <FormLabel>Date of birth</FormLabel>
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
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full hover:shadow-primary-md">
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign Up
        </Button>             
      </form>
    </Form>
  )
}