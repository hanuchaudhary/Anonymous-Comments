'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Loader2, Send, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { messageValidation } from "@/validations/Validation"
import SuggestedMessages from "@/data/suggestedMsg.json"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"

interface SuggestedMsg {
  id: string
  comment: string
}

export default function AnonymousMessagePage() {
  const { toast } = useToast()
  type messageTypes = z.infer<typeof messageValidation> 
  const [isLoading, setIsLoading] = useState(false)
  const [randomMessages, setRandomMessages] = useState<SuggestedMsg[]>([])
  const { username } = useParams()

  async function onSubmit(data: messageTypes) {
    try {
      setIsLoading(true)
      const response = await axios.post(`/api/create_message`, {
        username,
        ...data,
      })
      console.log(response)
      toast({
        title: "Success",
        description: "Message sent successfully.",
        variant: "success",
      })
      form.reset()
    } catch (error: any) {
      console.log(error);
      toast({
        title: "!Failed",
        description: error.response.data.message || "Error while sending message",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const form = useForm<messageTypes>({
    resolver: zodResolver(messageValidation),
  });

  const suggestMessages = () => {
    const shuffledMessages = [...SuggestedMessages].sort(() => 0.5 - Math.random())
    const selectedMessages = shuffledMessages
      .slice(0, 4)
      .map((message) => ({ ...message, id: message.id.toString() }))
    setRandomMessages(selectedMessages)
  }
  const defaultMessages: SuggestedMsg[] = [
    { id: "1", comment: "You're doing great, keep it up!" },
    { id: "2", comment: "I really admire your work." },
    { id: "3", comment: "You're an inspiration to others." },
    { id: "4", comment: "Keep shining bright!" },
  ]
  const displayedMessages = randomMessages.length > 0 ? randomMessages : defaultMessages

  return (
    <div className="container mx-auto py-12 mt-16 lg:mt-28 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Send Anonymous Message</CardTitle>
          <CardDescription className="text-center">to @{username}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your message here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Suggested Messages</h2>
              <Button onClick={suggestMessages} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={displayedMessages.map(m => m.id).join(',')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-2"
              >
                {displayedMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      variant="secondary"
                      className="justify-start h-auto py-2 px-4 text-left w-full"
                      onClick={() => form.setValue('content', message.comment)}
                    >
                      {message.comment}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}