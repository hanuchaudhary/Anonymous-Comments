"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Send, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { messageValidation } from "@/validations/Validation";
import SuggestedMessages from "@/data/suggestedMsg.json";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import MessageCardTopBar from "@/components/MessageCardTopBar";

export default function AnonymousMessagePage() {
  const { toast } = useToast();
  type messageTypes = z.infer<typeof messageValidation>;
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedLoading, setSuggestedLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([
    "You're doing great, keep it up!",
    "I really admire your work.",
    "You're an inspiration to others.",
  ]);
  const { username } = useParams();

  async function onSubmit(data: messageTypes) {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/create_message`, {
        username,
        ...data,
      });
      console.log(response);
      toast({
        title: "Success",
        description: "Message sent successfully.",
        variant: "success",
      });
      form.setValue("content", "");
      form.reset();
    } catch (error: any) {
      console.log(error);
      toast({
        title: "!Failed",
        description:
          error.response.data.message || "Error while sending message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const generateSuggestedMessages = async () => {
    try {
      setSuggestedLoading(true);
      const response = await axios.post("/api/suggested_messages");
      const data = response.data.code;
      const sm = data.split("||");
      setSuggestedMessages(sm);
    } catch (error) {
      console.log("Error: ", error);
      toast({
        title: "Error",
        description: "Error while Suggesting Messages",
        variant: "destructive",
      });
    } finally {
      setSuggestedLoading(false);
    }
  };

  const form = useForm<messageTypes>({
    resolver: zodResolver(messageValidation),
  });

  return (
    <div className="container min-h-screen max-w-2xl mx-auto md:py-40 py-20 px-2">
      <Card>
        <div>
          <MessageCardTopBar className="flex items-center justify-center">
            <div className="md:flex items-center justify-center gap-1">
              <p className="w-full">Send Anonymous Message to</p>
              <span className="text-sm text-neutral-700">@{username}</span>
            </div>
          </MessageCardTopBar>
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Your Message
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your message here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant={"success"}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8">
            <div className="flex justify-between md:flex-row flex-col gap-1 items-center mb-4">
              <h2 className="text-lg text-black font-semibold">
                Suggested Messages
              </h2>

              <Button
                disabled={suggestedLoading}
                variant="default"
                size="sm"
                className="font-semibold"
                onClick={generateSuggestedMessages}
              >
                {suggestedLoading ? (
                  <div className="flex animate-pulse">
                    <motion.img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMxYjZkYzUiIGQ9Ik0yNCAxMi4wMjRjLTYuNDM3LjM4OC0xMS41OSA1LjUzOS0xMS45NzcgMTEuOTc2aC0uMDQ3QzExLjU4OCAxNy41NjMgNi40MzYgMTIuNDEyIDAgMTIuMDI0di0uMDQ3QzYuNDM3IDExLjU4OCAxMS41ODggNi40MzcgMTEuOTc2IDBoLjA0N2MuMzg4IDYuNDM3IDUuNTQgMTEuNTg4IDExLjk3NyAxMS45Nzd6Ii8+PC9zdmc+"
                      alt="loading"
                    />
                    <span className="ml-2">Generating Your Suggestions!</span>
                  </div>
                ) : (
                  <div className="flex">
                    <motion.img
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMxYjZkYzUiIGQ9Ik0yNCAxMi4wMjRjLTYuNDM3LjM4OC0xMS41OSA1LjUzOS0xMS45NzcgMTEuOTc2aC0uMDQ3QzExLjU4OCAxNy41NjMgNi40MzYgMTIuNDEyIDAgMTIuMDI0di0uMDQ3QzYuNDM3IDExLjU4OCAxMS41ODggNi40MzcgMTEuOTc2IDBoLjA0N2MuMzg4IDYuNDM3IDUuNTQgMTEuNTg4IDExLjk3NyAxMS45Nzd6Ii8+PC9zdmc+"
                      alt="suggestion"
                    />
                    <span className="ml-2">Suggest a Message with AI!</span>
                  </div>
                )}
              </Button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-2 w-full"
              >
                {suggestedMessages.map((message, index) => (
                  <motion.div
                    className="w-full"
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      variant="secondary"
                      className="justify-start text-wrap h-auto py-2 px-4 text-left w-full"
                      onClick={() => form.setValue("content", message)}
                    >
                      {message}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
