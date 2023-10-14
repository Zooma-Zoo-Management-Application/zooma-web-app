"use client"

import Footer from '@/components/shared/Footer'
import ScrollToTopButton from '@/components/shared/ScrollToTopButton'
import { Toaster } from '@/components/ui/toaster'
import { BASE_URL } from '@/constants/appInfos'
import { checkToken } from '@/lib/api/userAPI'
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
    const initialize = async () => {
      try {
        const accessTokenCheck = localStorage.getItem("accessToken");
        if(accessTokenCheck == null) return;

        checkToken(accessTokenCheck)
        .then((response:any) => {
          let {data} = response;
          setCurrentUser(data);
        })
        .catch((err:any) => {
          console.log(err);
        })
      } catch (err:any) {
        console.log(err.message);
      } 
    };
    initialize();
  }, []);

  return (
    <html lang="en">
        <title>Zooma - Landing Page</title>
        <body>
          {children}
          {/* <Footer /> */}
          <ScrollToTopButton />
          <Toaster />
        </body>
    </html>
  )
}
