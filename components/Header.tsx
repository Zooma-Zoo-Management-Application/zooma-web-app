'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
// Import react scroll
// import ButtonOutline from "../misc/ButtonOutline.";
import Image from "next/image";
import { Button } from "./ui/button";
import { Newspaper, Rabbit, Ticket, UserSquare2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);

  const router = useRouter();

  const navLinks = [
    {
      route: "/animals",
      label: "Animals",
      icon: <Rabbit className="w-6 h-6" />,
    },
    {
      route: "/news",
      label: "News",
      icon: <Newspaper className="w-6 h-6" />,
    },
    {
      route: "/tickets",
      label: "Tickets",
      icon: <Ticket className="w-6 h-6" />,
    },
    {
      route: "/profile",
      label: "Profile",
      icon: <UserSquare2 className="w-6 h-6" />,
    },
  ]

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "fixed top-0 w-full  z-30 transition-all " +
          (scrollActive ? " shadow-md pt-0 bg-white-500" : " pt-4")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            {
              !scrollActive ? (
                <Image
                  src="/logos/Zooma_White_Text.svg"
                  alt="logo"
                  width={120}
                  height={50}
                />
              ) : (
                <Image
                  src="/logos/Zooma_Black_Text.svg"
                  alt="logo"
                  width={120}
                  height={50}
                />
              )
            }
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-white-500  items-center">
            {
              navLinks.map((navLink, index) => {
                if(navLink.label == "Profile") return (<></>)

                return (
                  <div
                    key={navLink.label}
                    className={
                      "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative font-amsi font-bold tracking-wider" +
                      (false
                        ? " text-primary animation-active "
                        : "  hover:text-primary a")
                      + (
                        scrollActive ? " text-dark" : " text-white-500"
                      )
                    }
                  >
                    {navLink.label}
                  </div>
                )
              })
            }
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <Link href="/authentication/login">
              <span className={"mx-2 sm:mx-4 capitalize tracking-wide hover:text-primary transition-all"
            + (
              scrollActive ? " text-dark" : " text-white-500"
            )    
          }
              >
                  Sign In
              </span>
            </Link>
            <Button onClick={() => router.push("/authentication/signup")}>Sign Up</Button>
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <div
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "about"
                  ? "  border-primary text-primary"
                  : " border-transparent")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </div>
            <div
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "feature"
                  ? "  border-primary text-primary"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Feature
            </div>
            <div
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "pricing"
                  ? "  border-primary text-primary"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pricing
            </div>
            <div
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "testimoni"
                  ? "  border-primary text-primary"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Testimonial
            </div>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
