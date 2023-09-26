/* eslint-disable @next/next/no-html-link-for-pages */
"use client"

import { navLinks, profileLinks } from "@/constants/landing-page";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { UserNav } from "@/components/user-nav";
import AnimatedButtonWithDecoration from "@/components/framer-motion/AnimatedButtonWithDecoration";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import useUserState from "@/stores/user-store";

export default function HeaderNav({isScrollEffect = true} : any) {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();

  const { currentUser } = useUserState();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    const handleResize = () => {
      if (window.scrollX > 768) {
        setIsOpenMenu(true);
      } else {
        setIsOpenMenu(false);
      }
    };
    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
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
        ${active || !isScrollEffect || isOpenMenu ? "bg-primary" : "bg-gradient-to-b from-dark to-transparent"}
        `
      }>
        <div 
          className="mt-4 mb-2 flex items-center flex-1 pb-2 pl-6 ml-2 relative"
        >
          <Link href="/" className="relative font-bold text-white">
            <Image
              src="/logos/Zooma_White_Text.svg"
              alt="logo"
              width={120}
              height={50}
            />
          </Link>
          <div className="hidden pl-10 align-middle lg:flex gap-5 ml-5">
            
          </div>
        </div>
        <div className="flex items-center">
          <Button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-light mr-4 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
          </Button>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          className={`${isOpenMenu ? "absolute left-0 top-20 " : "hidden"} w-full md:flex md:items-center md:w-auto`}>
            <ul className={`${isOpenMenu ? "bg-primary" : ""} font-medium flex flex-col p-4 md:p-0 mt-3 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 gap-1`}>
              <UserNav isMobile={true} />
              <Separator className="md:hidden"/>
              {
                navLinks.map((link) => (
                  <li key={link.label} className="flex items-center order-3 w-full md:w-min">
                    <Link href={link.route} className="w-full md:w-min py-2 pl-3 pr-4 text-white bg-primary rounded md:bg-transparent md:p-0 dark:text-white">
                      {link.label.toUpperCase()}
                    </Link>
                  </li>
                ))
              }
              <li className="hidden md:flex items-center justify-center order-3 mt-0">
                <AnimatedButtonWithDecoration onClick={() => router.push("/tickets")} text="BOOK YOUR TICKET" active={active || !isScrollEffect || isOpenMenu} />
              </li>
              <li className="flex items-center order-2 md:order-3 mx-0">
                <div className="hidden md:block mr-4">
                  {
                    currentUser ? (
                      <UserNav user={currentUser}/>
                    ) : (
                        <Link href="/authentication/login" className="w-full md:w-min py-4 text-white bg-primary rounded md:bg-transparent md:p-0 dark:text-white">
                            LOGIN
                        </Link>
                    )
                  }
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      <div>
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
      </div>
    </>
  );
}