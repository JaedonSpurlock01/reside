"use client";

import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const HeartButton = () => {
  const [hasFavorited, setHasFavorited] = useState<boolean>(false);
  const toggleFavorite = () => {
    setHasFavorited(!hasFavorited);
  };

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
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
