"use client";

import useFavorite from "@/hooks/useFavorite";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId }) => {
  const { toggleFavorite, hasFavorited } = useFavorite({ listingId });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer z-10"
    >
      <AiOutlineHeart
        size={34}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={30}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
