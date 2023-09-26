"use client"

import HeaderNav from "@/components/HeaderNav";
import HomeLayout from "@/components/HomeLayout";
import { toast } from "@/components/ui/use-toast";
import useUserState from "@/stores/user-store";
import axios from "axios";
import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
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
              <code className="text-white">{JSON.stringify('Cannot connect to DB', null, 2)}</code>
            </pre>
          ),
        })
      });
  }, []);

  return (
    <>
      <HeaderNav />
      <HomeLayout />      
    </>
  )
}
