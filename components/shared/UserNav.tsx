"use client"

import { useRouter } from "next/navigation"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Link from "next/link"
import { profileLinks } from "@/constants/landing-page"
import { getCharPerWord } from "@/lib/utils"
import useUserState from "@/stores/user-store"
import { Fragment } from "react"

interface IUserNavProps{
  user?: {
    id: string,
    avatarUrl: string,
    userName: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: string,
    roleId: number,
    status: number,
  } | null,
  isMobile?: boolean
}

export function UserNav({user = null, isMobile = false} : IUserNavProps) {
  const router = useRouter()
  const { setCurrentUser } = useUserState();
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    setCurrentUser(null);
  }

  if(!user) return (
    <Fragment></Fragment>
  )

  return (
    <Fragment>
      {
        !isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl} alt={user?.userName} />
                  <AvatarFallback>{user?.userName?.toString().slice(0,2) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/profile/order-history')}>
                  Order History
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        ) : (
          <div className="md:hidden flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ml-4">
                <AvatarImage src={user?.avatarUrl} alt={user?.userName} />
                <AvatarFallback>{user?.userName}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-xl font-medium leading-none text-light">{user?.userName}</p>
                <p className="text-base leading-none text-light">
                  {user?.email}
                </p>
              </div>
            </div>
            {
              profileLinks.map((link) => (
                <li key={link.label} className="w-full md:w-min flex items-center order-3 md:hidden">
                  <Link href={link.route} className="w-full md:w-min py-2 pl-3 pr-4 text-white bg-primary rounded md:bg-transparent md:text-primary md:p-0 dark:text-white md:dark:text-blue-500">
                    {link.label.toUpperCase()}
                  </Link>
                </li>
              ))
            }
          </div>
        )
      }
    </Fragment>
  )
}