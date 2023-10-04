"use client"

import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { BASE_URL } from '@/constants/appInfos'
import useUIState from '@/stores/ui-store'
import useUserState from "@/stores/user-store"
import '@/styles/globals.css'
import axios from "axios"
import { Volume2, VolumeX } from 'lucide-react'
import { Metadata } from 'next'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const metadata: Metadata = {
  title: 'Zooma',
  applicationName: 'Zooma',
  description:
    'Zooma is a zoo management web application that aims to transform how information is managed within the zoo facility.',
  robots: 'follow, index',
  authors: [{
    name: 'UyDev',
    url: 'lequocuyit@gmail.com'
  }],
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setCurrentUser } = useUserState();


  useEffect(() => {
    const accessTokenCheck = localStorage.getItem("accessToken");

    if(accessTokenCheck == null) return;
    
    // Create a custom Axios instance with headers
    const axiosInstance = axios.create({
      // gắn token vào header để backend giải quyết
      headers: {
        Authorization: `Bearer ${accessTokenCheck}`, // Attach the access token as a Bearer token
      },
    });
  
    // Make the GET request using the custom Axios instance
    axiosInstance

      .get(`${BASE_URL}/api/Users/Launch`)

      .then((response) => {
        console.log(response.data)
        setCurrentUser(response.data);
      })
      .catch((error) => {

        // toast({
        //   title: "Login Error",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify('Cannot connect to DB' + error.message, null, 2)}</code>
        //     </pre>
        //   ),
        // })

      });
  }, []);

  return (
    <html lang="en">
        <title>Zooma - Landing Page</title>
        <body>
          {children}
          <Footer />
          <ScrollToTopButton />
          <Toaster />
        </body>
    </html>
  )
}
