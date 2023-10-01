"use client"

import BackgroundVideo from "@/components/BackgroundVideo";
import Feature from "@/components/Feature";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";

export default function Home() {
  
  return (
    <>
      <Header   />
      <Hero />
      <Feature />
      <Pricing />
      <BackgroundVideo />
    </>
  )
}
