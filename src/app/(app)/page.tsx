"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LandingCard from "@/components/LandingCard";

export default async function Home() {
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Share and Receive
              <br />
              Feedback Anonymously
            </h1>
            <p className="text-base md:text-lg lg:text-xl">
              With <span className="font-bold">Anonymous Feedback</span>, you
              can create a space to receive honest and anonymous feedback from
              your peers, friends, or followers.
            </p>
            <div className="inline-block">
              <Link href={"/signin"}>
                <Button className="px-6 py-3 text-base lg:text-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-80 lg:h-96">
            <div className="h-full w-full">
              <img src="/S3.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <h1 className="font-semibold text-black text-xl md:text-2xl lg:text-3xl pb-20 md:py-10 pl-4 md:pl-10 lg:pl-20">
        Key Features
      </h1>
      <section className="relative bg-neutral-100 w-full border-black border-y-[3px] py-10 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left">
            Platform Highlights
          </h2>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {[ 
              {
                title: "Anonymous Messaging",
                image: "/S3.png",
                description:
                  "Create a feedback space, share your link, and receive anonymous messages seamlessly.",
              },
              {
                title: "Customizable Spaces",
                image: "/S2.png",
                description:
                  "Personalize your feedback space with options to filter and moderate messages.",
              },
            ].map((feature, idx) => (
              <LandingCard key={idx} data={feature} />
            ))}
          </div>
        </div>
        <section className="absolute md:-top-6 md:left-0 -top-16  px-2 md:px-20 w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-black border-[3px]">
            {[
              "Anonymous Messaging",
              "Easy Sharing",
              "Secure and Private",
              "AI Support",
            ].map((link, idx) => (
              <p
                key={idx}
                className={`group flex items-center font-semibold justify-between bg-neutral-200 px-2 md:px-4 py-2 ${
                  idx === 0 ? "" : "border-l-[3px]"
                } border-black hover:bg-neutral-300 transition-colors`}
              >
                {link}
                <ArrowUpRight className="h-5 md:h-6 w-5 md:w-6 font-semibold" />
              </p>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
