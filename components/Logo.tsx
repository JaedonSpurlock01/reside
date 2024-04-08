"use client";

import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      alt="logo"
      className="hidden md:block mb-4"
      height="170"
      width="170"
      src="/images/logo.png"
    ></Image>
  );
}
