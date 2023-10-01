'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
// Import react scroll
// import ButtonOutline from "../misc/ButtonOutline.";
import useUserState from "@/stores/user-store";
import { Newspaper, Rabbit, Ticket, UserSquare2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { UserNav } from "./user-nav";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);

  const { currentUser } = useUserState();

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
            {
              currentUser ? (
                <>
                  <UserNav user={currentUser} />
                </>

              ) : (
              <>
                <Link href="/authentication/login">
                  <span className={"mx-2 sm:mx-4 capitalize tracking-wide hover:text-primary transition-all"
                + (
                  scrollActive ? " text-dark" : " text-white-500"
                )    
              }
                  >
                      Login
                  </span>
                </Link>
                <Button onClick={() => router.push("/authentication/signup")}>Sign Up</Button>
              </>
              )
            }
            
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white-500 sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            {
              navLinks.map((navLink, index) => {

                return (
                  <div
                    key={navLink.label}
                    className={
                      "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                      (activeLink === "about"
                        ? "  border-primary text-primary"
                        : " border-transparent")
                    }
                  >
                    {navLink.icon}
                    {navLink.label}
                  </div>
                )
              })
            }
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
