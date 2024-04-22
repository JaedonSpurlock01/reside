"use client";

import React, { useState, useTransition } from "react";
import BackButton from "../BackButton";

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
import { ResetSchema } from "@/schemas";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import FormError from "../../FormError";
import FormSuccess from "../../FormSuccess";
import { reset } from "@/actions/reset";

interface ResetFormProps {
  handleBackRef?: () => void;
}

const ResetForm: React.FC<ResetFormProps> = ({ handleBackRef }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            className="w-full bg-[#4189e8] hover:bg-[#4189e8]/70"
            disabled={isPending}
          >
            Send reset email
          </Button>
        </form>
      </Form>

      <BackButton handleBackRef={handleBackRef} label="Back to login" />
    </div>
  );
};

export default ResetForm;
