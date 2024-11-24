import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LandingCard({ data }: any) {
  return (
    <div>
      <div
        key={data.title}
        className="border-black border-[3px] bg-white overflow-hidden"
      >
        <div className="border-b-[3px] border-black bg-neutral-200 p-2">
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-full border-[3px] bg-white border-black"></div>
            <div className="h-3 w-3 rounded-full border-[3px] bg-white border-black"></div>
          </div>
        </div>
        <div className="relative h-48">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold">{data.title}</h3>
          <p className="mb-4 text-sm">{data.description}</p>
          <div className="inline-block">
            <Link href={"/signup"}>
              <Button>Explore</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
