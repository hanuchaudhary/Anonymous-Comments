'use client'

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { Loader2, RefreshCcw, Copy, Link } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { acceptMessageValidation } from "@/validations/Validation"
import { Message } from "@/model/User"
import MessageCard from "@/components/MessageCard"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function UserDashboard() {
  const { toast } = useToast()
  const router = useRouter()
  const session = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({ resolver: zodResolver(acceptMessageValidation) })
  const { register, watch, setValue } = form
  const acceptMessages = watch("acceptMessages")

  const handleDeleteMessages = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get(`/api/accept_messages`)
      setValue("acceptMessages", response.data.isAcceptingMessages)
    } catch (error) {
      const axiosError = error as AxiosError
      toast({
        title: "Error",
        description: axiosError.message || "Failed to fetch message setting",
        variant: "destructive",
      })
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue, toast])

  const fetchMessages = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`/api/get_messages`)
      setMessages(response.data.messages)
    } catch (error) {
      const axiosError = error as AxiosError
      toast({
        title: "Error",
        description: axiosError.message || "Failed to fetch messages",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    if (!session || !session.data?.user) return
    fetchMessages()
    fetchAcceptMessages()
  }, [session, fetchAcceptMessages, fetchMessages])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post(`/api/accept_messages`, {
        acceptMessages: !acceptMessages,
      })
      setValue("acceptMessages", !acceptMessages)
      toast({
        title: response.data.message,
        variant: "success",
      })
    } catch (error) {
      const axiosError = error as AxiosError
      toast({
        title: "Error",
        description: axiosError.message || "Failed to change switch setting",
        variant: "destructive",
      })
    }
  }

  const username = session?.data?.user?.username
  const profileUrl = `${window.location.protocol}//${window.location.host}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard",
      variant: "success",
    })
  }

  if (!session || !session.data?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => {
              router.replace("/signin")
            }}>Login</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">User Dashboard</CardTitle>
          <CardDescription>Manage your messages and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Your Unique Link</h2>
              <div className="flex items-center space-x-2">
                <Input value={profileUrl} readOnly className="flex-grow" />
                <Button onClick={copyToClipboard} variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                {...register("acceptMessages")}
                checked={acceptMessages}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLoading}
              />
              <span>Accept Messages: {acceptMessages ? "On" : "Off"}</span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Your Messages</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchMessages}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4" />
                )}
                <span className="ml-2">Refresh</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onDeleteMessage={handleDeleteMessages}
            />
          ))
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No messages to display.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}