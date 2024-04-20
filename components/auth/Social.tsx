"use client";

import React from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full bg-neutral-600 hover:bg-neutral-500"
        size="lg"
        variant="ghost"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        className="w-full bg-neutral-600 group hover:bg-neutral-500"
        size="lg"
        variant="ghost"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5 fill-neutral-300 group-hover:fill-neutral-100" />
      </Button>
    </div>
  );
};

export default Social;
