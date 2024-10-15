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
} from "@/components/ui/dropdown-menu"
import { LogOut, User as UserIcon } from "lucide-react"

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user as User

  return (
    <nav className="fixed top-0 rounded-b-xl w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
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
              <Button onClick={() => signIn()} variant="default">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar