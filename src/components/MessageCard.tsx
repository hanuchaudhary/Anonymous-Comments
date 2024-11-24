"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Message } from "@/model/User";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import MessageCardTopBar from "./MessageCardTopBar";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export default function MessageCard({
  message,
  onMessageDelete,
}: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/delete_message/${message._id}`);
      onMessageDelete(message._id as string);
      toast({
        title: "Message deleted",
        description: "Your message has been successfully deleted.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Deletion failed",
        description:
          "An error occurred while deleting the message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const formattedDate = formatDate(message.createdAt);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <MessageCardTopBar className="flex items-center justify-center">
        <time
          dateTime={new Date(message.createdAt).toISOString()}
          className="text-sm text-black"
        >
          {formattedDate}
        </time>
      </MessageCardTopBar>
      <CardContent className="pt-6">
        <p className="text-base text-card-foreground whitespace-pre-wrap">
          {message.content}
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
              <span className="sr-only">Delete message</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div>
              <MessageCardTopBar>Delete this message?</MessageCardTopBar>
              <AlertDialogDescription className="p-6">
                This action cannot be undone. The message will be permanently
                removed from our servers.
              </AlertDialogDescription>
            </div>
            <AlertDialogFooter className="p-6">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
