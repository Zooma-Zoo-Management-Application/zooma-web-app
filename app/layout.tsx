"use client"

import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import { Toaster } from '@/components/ui/toaster'
import { toast } from "@/components/ui/use-toast"
import { BASE_URL } from '@/constants/appInfos'
import useUserState from "@/stores/user-store"
import '@/styles/globals.scss'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import SeoHead from './SeoHead'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useUIState from '@/stores/ui-store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const { setCurrentUser } = useUserState();

  const {isVideoMuted, setIsVideoMuted} = useUIState();

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
      <SeoHead />
        <body>
          {children}
          <Footer />
          <ScrollToTopButton />
          <Button variant="default" size="icon" 
              onClick={() => {
                setIsVideoMuted()
              }}
              className=
              "z-40 fixed bottom-20 lg:bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200"
              >
              {isVideoMuted ? <VolumeX /> : <Volume2 /> }
            </Button> 
          <Toaster />
        </body>
    </html>
  )
}
