/* eslint-disable @next/next/no-html-link-for-pages */

import { navLinks } from "@/constants/header";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(false);

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

  return (
    <>
      <div className={
        `fixed w-full flex items-center justify-between lg:mx-0 lg:px-2 z-10 transition-all duration-300
        ${active ? "bg-primary" : "bg-gradient-to-b from-dark to-transparent"}
        `
      }>
        <div className="mt-2 mb-1 flex items-center flex-1 pb-2 pl-6 ml-2">
          <Link href="/" className="relative font-bold text-white">
            <Image
              src="/Zooma_Logo.png"
              alt="logo"
              width={60}
              height={60}
              className="inline-block -translate-y-1"
            />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm">Zooma</span>
          </Link>
          <div className="hidden pl-10 align-middle lg:inline-block">
            {
              navLinks.map((link) => (
                <Link key={link.label} href={link.route} className="pr-12 text-base text-white">
                  {link.label}
                </Link>
              ))
            }
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden py-1 text-right lg:inline-block">
            <Link
              className="inline-flex items-center 
              px-12 py-3 text-base font-semibold tracking-tighter text-white
              transition-all duration-500
              "
              href="/authentication/login"
            >
              Log in
            </Link>
            <Button
              variant="default"
              size="lg"
              className={`text-base ${active ? "bg-dark text-[#fafafa]" : "bg-primary text-[#fafafa]"} `}
            >
              Order Ticket
            </Button>
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
        className="progress-bar fixed
        top-[79px] left-0 right-0 h-[5px]
        bg-green-700
        z-1000
        origin-bottom-left
        "
        style={{ scaleX: scrollYProgress }}
      />
      <div>

      </div>
    </>
  );
}