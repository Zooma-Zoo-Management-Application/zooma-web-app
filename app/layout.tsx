"use client"

import Footer from '@/components/shared/Footer'
import ScrollToTopButton from '@/components/shared/ScrollToTopButton'
import { Toaster } from '@/components/ui/toaster'
import { BASE_URL } from '@/constants/appInfos'
import useUserState from "@/stores/user-store"
import '@/styles/globals.css'
import axios from "axios"
import { useEffect } from "react"

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
  });

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
