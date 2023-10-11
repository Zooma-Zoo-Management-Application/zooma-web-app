'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
// Import react scroll
// import ButtonOutline from "../misc/ButtonOutline.";
import useUserState from "@/stores/user-store";
import { Map, Newspaper, Rabbit, Ticket, UserSquare2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserNav } from "@/components/shared/UserNav";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);

  const { currentUser } = useUserState();

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "w-full sticky top-0 z-30 transition-all pt-0 bg-white-500 border-b border-b-gray-200"
        }
      >
        <nav className="px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4 ">
          <div className="col-start-1 col-end-2 flex items-center cursor-pointer"
            onClick={() => router.push("/dashboard/overview")}
          >
            <Image
              src="/logos/Zooma_Black_Text.svg"
              alt="logo"
              width={120}
              height={50}
            />
          </div>
          <div className="col-start-11 col-end-12 font-medium flex justify-end items-center">
            {
              currentUser ? (
                <>
                  <UserNav user={currentUser} />
                </>

              ) : (
              <>
                <Link href="/authentication/login">
                  <span className={"mx-2 sm:mx-4 capitalize tracking-wide hover:text-primary transition-all text-dark"
              }
                  >
                      Login
                  </span>
                </Link>
                <Button onClick={() => router.push("/authentication/signup")
              }
                className={
                    "bg-dark"
                }
              >Sign Up</Button>
              </>
              )
            }
            
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
