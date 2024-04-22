"use client";

import React, { useState, useTransition } from "react";

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
import { SettingsSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Seperator from "../Seperator";
import TextRow from "../listing/TextRow";
import Avatar from "../navbar/Avatar";

const SettingsForm = () => {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center gap-6 mb-6">
          <Avatar imageSrc={user?.image} size={100} />
          <span className="hidden md:block text-3xl text-neutral-100 font-bold">
            {user?.name}
          </span>
        </div>
        <TextRow
          leftText="User ID"
          rightText={user?.id as string}
          leftClassName="text-neutral-100"
          rightClassName="text-neutral-300 text-sm bg-[#515151] px-2 rounded-md"
          className="!px-0 font-semibold truncate"
        />
        <TextRow
          leftText="Email"
          rightText={user?.email as string}
          leftClassName="text-neutral-100"
          rightClassName="text-neutral-300 text-sm bg-[#515151] px-2 rounded-md"
          className="!px-0 font-semibold truncate"
        />
        <TextRow
          leftText="Role"
          rightText={user?.role as string}
          leftClassName="text-neutral-100"
          rightClassName="text-neutral-300 text-sm bg-[#515151] px-2 rounded-md"
          className="!px-0 font-semibold truncate"
        />
        <Seperator className="my-8 bg-[#525252]" />
      </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-300">Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter a new name"
                      disabled={isPending}
                      className="bg-neutral-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {user?.isOAuth === false && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter a new email"
                          disabled={isPending}
                          className="bg-neutral-600 text-white"
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
                      <FormLabel className="text-neutral-300">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your current password"
                          disabled={isPending}
                          className="bg-neutral-600 text-white"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter a new password"
                          disabled={isPending}
                          className="bg-neutral-600 text-white"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            className="bg-[#4189e8] hover:bg-[#4189e8]/70"
            type="submit"
            disabled={isPending}
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
