"use client"

import BackgroundVideo from "@/app/components/BackgroundVideo";
import Feature from "@/app/components/Feature";
import Header from "@/components/shared/Header";
import Hero from "@/app/components/Hero";
import Pricing from "@/app/components/Pricing";
import { Button } from "@/components/ui/button";
import useUIState from "@/stores/ui-store";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { getTickets } from "@/lib/api/ticketAPI";
import { getNews } from "@/lib/api/newAPI";
import { RowData } from "@tanstack/react-table";
import Footer from "@/components/shared/Footer";
import { withPublic } from "@/hooks/useAuth";
import useUserState from "@/stores/user-store";

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    pinNew: (id: string) => void
    unpinNew: (id: string) => void
    delete: (id: string) => void
    update: (id: string, updateData: any) => void
  }
}

function Home() {
  const {isVideoMuted, setIsVideoMuted} = useUIState();
  const [tickets, setTickets] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useUserState()

  useEffect(() => {
    const initialize = async () => {
      try {
        const tickets = await getTickets();
        setTickets(tickets);
      } catch (err:any) {
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, [])
  
  return (
    <div>
      <Button variant="default" size="icon" 
        onClick={() => {
          setIsVideoMuted()
        }}
        className=
        "z-40 fixed bottom-20 lg:bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200"
        >
        {isVideoMuted ? <VolumeX /> : <Volume2 /> }
      </Button> 
      <Header />
      <Hero />
      <Feature />
      <Pricing tickets={tickets.data}/>
      <BackgroundVideo />
      <Footer />
    </div>
  )
}

export default withPublic(Home)