"use client";

import Image from "next/image";
import React from "react";

interface AvatarProps {
  size?: number;
  imageSrc?: string | null;
}

export default function Avatar({ size, imageSrc }: AvatarProps) {
  return (
    <Image
      className="rounded-full"
      height={size || 30}
      width={size || 30}
      alt="Avatar"
      src={imageSrc || "/images/placeholder.png"}
    />
  );
}
