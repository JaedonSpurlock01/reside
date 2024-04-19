"use client";

import React, { useState, useTransition } from "react";
import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import Social from "../auth/Social";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { login } from "@/actions/login";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

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
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const bodyContent = (
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
                      placeholder="johndoe@example.com"
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
                      placeholder="*****"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
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

      <div className="text-center w-full text-neutral-300">
        <span
          onClick={() => {
            loginModal.onClose();
            registerModal.onOpen();
          }}
          className="hover:cursor-pointer hover:underline text-sm"
        >
          Don&apos;t have an account?
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Welcome back"
      onClose={loginModal.onClose}
      body={bodyContent}
      noButton
    />
  );
};

export default LoginModal;
