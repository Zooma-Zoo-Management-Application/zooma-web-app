import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import useUIState from "@/stores/ui-store";
import { OverviewIcon } from "../Icons";
import { sidebarStaffLinks } from "@/constants/sidebar";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
}

interface ISidebarLink {
    title: string;
    links: {icon: string, label: string, route: string}[]
}

const IconComponents = {
  'overview': OverviewIcon,
  'profile': OverviewIcon,
}

export function Sidebar({ className }: SidebarProps) {
  const { isOpenSidebar } = useUIState();
  const router = useRouter();

  return (
    <div  
      className={cn("pb-12", className)}
    >
      <div
        className="space-y-4 py-4"
      >
        <div className="px-3 py-2">
        {
          isOpenSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Button variant="ghost" className="border py-6 mb-4"
                onClick={() => router.push('/dashboard/profile')}
              >
                <div
                  className="flex items-center space-x-4"
                >
                  <Avatar>
                    <AvatarImage src="/assets/user.svgd" />
                    <AvatarFallback>NVA</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center items-start">
                    <p className="text-sm font-medium leading-none">
                      Nguyen Van A
                    </p>
                    <p className="text-sm text-muted-foreground">nguyenvana@example.com</p>
                  </div>
                </div>
              </Button>
            </motion.div>
          )
        }
        {
          sidebarStaffLinks.map((blockLink) : any => (
            <>
              <AnimatePresence>
              {
                isOpenSidebar && (
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mb-2 px-4 text-lg font-semibold tracking-tight"
                  >
                    {blockLink.title}
                  </motion.h2>
                )
              }
              </AnimatePresence>
              <div 
                className="space-y-1 mb-4 flex flex-col"
              >
                {
                  blockLink.links.map((link) : any => {
                    return (
                      <Button variant="ghost" className='justify-start' key={link.label}
                        onClick={() => router.push(link.route)}
                      >
                          <div className="group flex relative ">
                            <Image width={15} height={15}
                              src={link.icon}
                              alt={link.label}
                              className="h-4 w-4"
                              />
                              {
                                !isOpenSidebar && (
                                  <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-sm fixed  z-50
                              -translate-y-full translate-x-4 whitespace-nowrap m-4 opacity-0">{link.label}</span>
                                )
                              }
                          </div>
                          <AnimatePresence>
                          {
                            isOpenSidebar && (
                              <motion.span
                                initial={{ opacity: 0}}
                                animate={{ opacity: 1}}
                                exit={{ opacity: 0}}
                                className="ml-2"
                              >
                                  {link.label}
                              </motion.span>
                            )
                          }
                        </AnimatePresence>
                      </Button>
                    )
                  })
                }
              </div>
            </>
          ))
        }

        </div>
      </div>
    </div>
  )
}