/* eslint-disable @next/next/no-html-link-for-pages */
"use client"

import { navLinks } from "@/constants/landing-page";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { UserNav } from "@/components/user-nav";
import AnimatedButtonWithDecoration from "@/components/framer-motion/AnimatedButtonWithDecoration";
import { useRouter } from "next/navigation";

export default function HeaderNav({isScrollEffect = true} : any) {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[])

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <div className={
        `font-amsi fixed top-0 w-full flex items-center justify-between lg:mx-0 lg:px-2 z-10 transition-all duration-300
        ${active || !isScrollEffect ? "bg-primary" : "bg-gradient-to-b from-dark to-transparent"}
        `
      }>
        <div 
          className="mt-4 mb-2 flex items-center flex-1 pb-2 pl-6 ml-2"
        >
          <Link href="/" className="relative font-bold text-white">
            <Image
              src="/Zooma_Logo.png"
              alt="logo"
              width={60}
              height={60}
              className="inline-block -translate-y-1"
            />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-sm">Zooma</span>
          </Link>
          <div className="hidden pl-10 align-middle lg:flex gap-5 ml-5">
            {
              navLinks.map((link) => (
                <Link key={link.label} href={link.route} className="pr-12 text-lg text-white tracking-[2px]">
                  {link.label.toUpperCase()}
                </Link>
              ))
            }
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden py-1 text-right lg:flex lg:items-center lg:gap-6">
            <Link
              className="inline-flex items-center 
              py-3 text-base font-semibold tracking-[1px] text-white
              transition-all duration-500
              "
              href="/authentication/login"
            >
              Log in
            </Link>
            <AnimatedButtonWithDecoration onClick={() => router.push("/tickets")} text="BOOK YOUR TICKET" active={active || !isScrollEffect} />
            <UserNav />
          </div>
          <button className="pr-12 pl-4">
            <svg
              className="mr-auto inline-block text-white lg:hidden"
              width="33"
              height="50"
              viewBox="0 0 23 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.892578 10.8691H22.1058"
                stroke="white"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M0.892578 18.8691H22.1058"
                stroke="white"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M22.1066 14.8688H0.893399"
                stroke="white"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <motion.div
        className={`
        progress-bar fixed
        top-[90px] left-0 right-0 h-[5px]
        bg-green-700
        z-1000
        origin-bottom-left
        ${isScrollEffect ? "block" : "hidden"}
        `}
        style={{ scaleX }}
      />
      <div>

      </div>
    </>
  );
}