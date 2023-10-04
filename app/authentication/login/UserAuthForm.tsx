"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import axios from "axios"
import useUserState from "@/stores/user-store"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { BASE_URL } from '@/constants/appInfos'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3,{
    message: "Password must be at least 3 characters long",
  }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { setCurrentUser } = useUserState();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formLoginSchema>) {
    setIsLoading(true)

    // 3. Send the data somewhere
    axios.post(`${BASE_URL}/api/Users/Login`, {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
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
    .catch((error) => {
      toast({
        title: "Login Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-light">{JSON.stringify(error.message, null, 2)}</code>
          </pre>
        )
      })
      setIsLoading(false);
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="items-center justify-between flex space-x-2">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me?
                </label>
              </div>
            </div>

            <div>
              <Link href="/authentication/forgot-password"
              className="text-sm text-primary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              > 
                Forgot password?
              </Link>
            </div>
          </div>
          <Button disabled={isLoading} className="w-full">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login with Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}