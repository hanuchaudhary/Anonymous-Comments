'use client'

import React from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { User } from 'next-auth'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserIcon } from "lucide-react"
import { ToggleTheme } from "./ToogleTheme"

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user as User

  return (
    <nav className="fixed top-0 rounded-b-xl w-full bg-background/60 backdrop-blur-lg border-b border-border z-50">
      <div className="container px-4">
        <div className="flex items-center w-full justify-between py-5">
          <h1 className="md:text-xl font-semibold text-primary">
            Anonymous Message
          </h1>
          <div className="flex items-center gap-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="uppercase font-semibold">
                        {user?.name?.[0] || user?.email?.[0] || 'A'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>{user?.name || user?.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size={"sm"} onClick={() => signIn()} variant="default">
                Sign In
              </Button>
            )}
            <ToggleTheme/>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar