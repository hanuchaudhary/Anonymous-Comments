"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ChevronRight, MessageSquare, Shield, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/data/messages.json";
import { motion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: MessageSquare,
    title: "Anonymous Messaging",
    description: "Share your thoughts without revealing your identity",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "End-to-end encryption for complete privacy",
  },
  {
    icon: Users,
    title: "Team Friendly",
    description: "Perfect for teams of any size",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col pt-20 dark:bg-black bg-white w-full">
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12">
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-primary">
            Transform Feedback into Growth
          </h1>
          <p className="text-xl md:text-2xl text-black dark:text-purple-100/80 mb-8 leading-relaxed">
            Create a culture of open communication where everyone feels safe to
            share their thoughts. Your team's growth starts with honest
            feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/signin"}>
              <Button size="lg">
                Get Started <ChevronRight className="ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </motion.section>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16 w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Card
                key={index}
                className="bg-secondary border-white/20 backdrop-blur-sm text-secondary"
              >
                <CardHeader>
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle className="text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="w-full max-w-6xl mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            Recent Feedback
          </h2>
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="bg-secondary border-white/20 backdrop-blur-sm text-primary h-full">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{message.content}</p>
                      <p className="text-xs ">{message.received}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="md:block hidden">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
      </main>

      <footer className="w-full rounded-t-xl shadow-md py-8 px-4 md:px-6 bg-neutral-950 dark:bg-neutral-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-100/60">
            © 2024 TrueFeedback. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-purple-100/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-purple-100/60 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-purple-100/60 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
