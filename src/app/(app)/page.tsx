'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import messages from "@/data/messages.json"
import { motion } from "framer-motion"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Dive into the World of <span className="text-primary">Anonymous Feedback</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8">
            Where your identity remains a secret, but your voice is heard loud and clear.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
            Get Started <ChevronRight className="ml-2" />
          </Button>
        </motion.section>

        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Carousel
            plugins={[
              Autoplay({ delay: 3000 }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="bg-neutral-800 border border-neutral-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-primary">{message.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-start space-x-4">
                        <Mail className="flex-shrink-0 text-primary" />
                        <div>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-neutral-400 mt-2">
                            {message.received}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-neutral-900 text-neutral-400">
        <div className="container mx-auto">
          <p>© 2023 TrueFeedback. All rights reserved.</p>
          <div className="mt-2">
            <Link href="/privacy" className="hover:text-white mr-4">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}