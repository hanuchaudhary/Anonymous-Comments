"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { verifyCodeValidation } from "@/validations/Validation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function VerifyCodePage() {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  type verifyCodeSchema = z.infer<typeof verifyCodeValidation>;
  async function onSubmit(data: verifyCodeSchema) {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/verify_code", {
        username: params.username,
        // verifyCode : data.verifyCode
        ...data
      });
      toast({
        title: "Success",
        description: "Your account has been verified.",
        variant:"success"
      });
      router.replace("/signin");
    } catch (error) {
      console.error("Error during verification:", error);
      toast({
        title: "Verification Failed",
        description: "Invalid code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const form = useForm({
    resolver: zodResolver(verifyCodeValidation),
    defaultValues: {
      verifyCode: "",
    },
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background/80 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold tracking-tight lg:text-4xl text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Verify Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="verifyCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verify Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        name="verifyC0de"
                        className="bg-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?{" "}
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={() => {
                toast({
                  title: "Code Resent",
                  description:
                    "A new verification code has been sent to your email.",
                    variant : "success"
                });
              }}
            >
              Resend
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
