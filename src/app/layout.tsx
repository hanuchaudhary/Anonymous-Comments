"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>Anonymous Feedback</title>
          <link rel="icon" href="/logoColor.svg" type="image/svg+xml" />
        </head>
        <body>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className="dark:bg-neutral-500">

              {children}
              </div>
            </ThemeProvider>
            <Toaster/>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
