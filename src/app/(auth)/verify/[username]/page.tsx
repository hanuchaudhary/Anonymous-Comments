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
      await axios.post("/api/verify_code", {
        username: params.username,
        ...data,
      });
      toast({
        title: "Success",
        description: "Your account has been verified.",
        variant: "success",
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative max-w-2xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black">
              Verify Your Account
            </CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="verifyCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-black">Verify Code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          name="verifyC0de"
                          placeholder="123456"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
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
            <p className="text-neutral-600 text-sm font-semibold">
              Didn't receive the code?{" "}
              <span
              className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                  toast({
                    title: "Code Resent",
                    description:
                      "A new verification code has been sent to your email.",
                    variant: "default",
                  });
                }}
              >
                Resend
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
