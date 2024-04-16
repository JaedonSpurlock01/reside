"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HoverBorderGradient } from "./HoverBorderGradient";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <HoverBorderGradient
      className="w-full h-full bg-neutral-700 p-2"
      containerClassName="w-full h-full rounded-xl shadow-2xl"
    >
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 max-w-7xl gap-2">
        {cards.map((card, i) =>
          i < 3 ? (
            <div key={i} className={cn(card.className, "")}>
              <motion.div
                onClick={() => {
                  if (!selected) {
                    handleClick(card);
                  } else {
                    handleOutsideClick();
                  }
                }}
                className={cn(
                  card.className,
                  "relative overflow-hidden",
                  selected?.id === card.id
                    ? "rounded-lg cursor-pointer absolute inset-0 h-auto m-4 w-auto z-50 flex justify-center items-center flex-wrap flex-col"
                    : lastSelected?.id === card.id
                    ? "z-40 bg-transparent rounded-xl h-full w-full"
                    : "bg-transparent rounded-xl h-full w-full"
                )}
                layout
              >
                {selected?.id === card.id && (
                  <SelectedCard selected={selected} />
                )}
                <BlurImage card={card} />
              </motion.div>
            </div>
          ) : null
        )}

        <motion.div
          onClick={handleOutsideClick}
          className={cn(
            "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
            selected?.id ? "pointer-events-auto" : "pointer-events-none"
          )}
          animate={{ opacity: selected?.id ? 0.3 : 0 }}
        />
      </div>
    </HoverBorderGradient>
  );
};

const BlurImage = ({ card }: { card: Card }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={card.thumbnail}
      height="1080"
      width="1920"
      onLoad={() => setLoaded(true)}
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200 hover:scale-105",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
