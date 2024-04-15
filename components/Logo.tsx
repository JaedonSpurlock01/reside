"use client";

import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Image
        alt="logo"
        height="170"
        width="170"
        src="/images/logo.png"
        className="hidden sm:block"
      ></Image>
      <Image
        alt="logo"
        height="75"
        width="75"
        src="/images/logo2.png"
        className="block sm:hidden"
      ></Image>
    </>
  );
}
