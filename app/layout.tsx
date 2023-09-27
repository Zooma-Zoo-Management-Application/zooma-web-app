"use client"

import ScrollToTopButton from '@/components/scroll-to-top-button'
import { Toaster } from '@/components/ui/toaster'
import { toast } from "@/components/ui/use-toast"
import useUserState from "@/stores/user-store"
import '@/styles/globals.scss'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Head from './head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { setCurrentUser } = useUserState();

  useEffect(() => {
    const accessTokenCheck = localStorage.getItem("accessToken");
    
    // Create a custom Axios instance with headers
    const axiosInstance = axios.create({
      // gắn token vào header để backend giải quyết
      headers: {
        Authorization: `Bearer ${accessTokenCheck}`, // Attach the access token as a Bearer token
      },
    });
  
    // Make the GET request using the custom Axios instance
    axiosInstance
      .get("https://localhost:7128/api/Users/Launch")
      .then((response) => {
        console.log(response.data)
        setCurrentUser(response.data);
      })
      .catch((error) => {
        toast({
          title: "Login Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify('Cannot connect to DB' + error.message, null, 2)}</code>
            </pre>
          ),
        })
      });
  }, []);

  return (
    <html lang="en">
      <Head />
        <body>
          {children}
          {/* <Footer /> */}
          <ScrollToTopButton />
          <Toaster />
        </body>
    </html>
  )
}
