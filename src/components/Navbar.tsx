
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, LogOut, UserIcon } from "lucide-react";
import { ToggleTheme } from "./ToogleTheme";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User;

  return (
    <nav className="fixed top-0 rounded-none border-b-4 w-full bg-neutral-300 dark:bg-neutral-800 backdrop-blur-lg border-black dark:border-neutral-700 z-50">
      <div className="container px-4">
        <div className="flex items-center w-full justify-between py-3">
          <div className="flex items-center">
            <img className="h-6 w-6" src="/logo.svg" alt="" />
            <h1 className="md:text-lg font-semibold text-primary">
              @nonymous Feedback
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="md:inline-block hidden">
              <a href="https://github.com/hanuchaudhary" target="_blank">
                <Button>
                  <Github className="h-5 w-5" />
                  Github
                </Button>
              </a>
            </div>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="relative uppercase h-8 w-8"
                  >
                    {user?.name?.split(" ").map((n) => n) ||
                      user?.email?.[0] ||
                      "A"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-none border-[3px] border-black"
                >
                  <DropdownMenuItem className="flex items-center rounded-none">
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
