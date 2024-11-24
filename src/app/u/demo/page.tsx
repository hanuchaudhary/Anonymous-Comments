"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted", { username, password });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-neutral-300 shadow-md  rounded-lg p-8 mt-40 w-96">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              className="w-full bg-white text-black border-2 border-black font-semibold z-10 relative focus:ring-0 transition-colors"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="h-full w-full bg-black absolute rounded-md top-1 left-1" />
          </div>
          <div className="relative">
            <Input
              className="w-full bg-white text-black border-2 border-black font-semibold z-10 relative  transition-colors"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="h-full w-full bg-black absolute rounded-md top-1 left-1" />
          </div>
          <div className="relative">
            <motion.div
              className="relative z-20 w-full"
              whileTap={{ translateX: 4, translateY: 4 }}
            >
              <button
                type="submit"
                className="w-full p-2 rounded-md border-2 font-semibold  bg-white text-black relative z-10"
              >
                Login
              </button>
            </motion.div>
            <div className="h-full w-full bg-black absolute rounded-md top-1 left-1" />
          </div>
        </form>
      </div>
    </div>
  );
}
