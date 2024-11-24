"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserIcon } from "lucide-react";
import { ToggleTheme } from "./ToogleTheme";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User;

  return (
    <nav className="fixed top-0 rounded-none border-b-4 w-full bg-neutral-300 backdrop-blur-lg border-black z-50">
      <div className="container px-4">
        <div className="flex items-center w-full justify-between py-3">
          <h1 className="md:text-lg font-semibold text-primary">
            @nonymous Message
          </h1>
          <div className="flex items-center gap-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="relative uppercase h-8 w-8">
                    {user?.name?.split(" ").map((n) => n) ||
                      user?.email?.[0] ||
                      "A"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>{user?.name || user?.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive"
                  >
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
            <ToggleTheme />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
