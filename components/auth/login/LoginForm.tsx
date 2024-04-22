"use client";

import React, { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Social from "../Social";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import FormError from "../../FormError";
import FormSuccess from "../../FormSuccess";
import { login } from "@/actions/login";
import BackButton from "../BackButton";
import Link from "next/link";

interface LoginFormProps {
  handleBackRef?: () => void;
  handlePasswordReset?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleBackRef,
  handlePasswordReset,
}) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-300">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your password"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>

                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal text-neutral-400"
                  >
                    <BackButton
                      handleBackRef={handlePasswordReset}
                      label="Forgot password?"
                      center={false}
                    />
                  </Button>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full bg-[#4189e8] hover:bg-[#4189e8]/70"
            disabled={isPending}
          >
            Login
          </Button>
        </form>
      </Form>

      <Social />

      <BackButton
        handleBackRef={handleBackRef}
        label="Don't have an account?"
      />
    </div>
  );
};

export default LoginForm;
