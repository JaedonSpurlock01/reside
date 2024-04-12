"use client";

import Image from "next/image";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { listingsData } from "./ExampleListings";
import { HoverBorderGradient } from "../HoverBorderGradient";

type ExampleListingProps = (typeof listingsData)[number];

export default function ExampleListing({
  title,
  description,
  tags,
  imageUrl,
  link,
}: ExampleListingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <HoverBorderGradient
        className="rounded-lg max-w-[42rem] sm:group-even:even:pl-8 bg-neutral-700 hover:bg-neutral-600 sm:pr-8 sm:h-[19rem] "
        containerClassName="rounded-lg overflow-hidden relative transition text-white text-left"
      >
        <a href={link} target="_blank">
          <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[20rem]">
            <h3 className="text2xl font-semibold">{title}</h3>
            <p className="mt-2 leading-relaxed text-white/70">{description}</p>
            <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
              {tags.map((tag, index) => (
                <li
                  className="bg-neutral-900 px-3 py-1 text-[0.7rem] uppercase tracking-wider rounded-lg text-white/70"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            alt="ExampleListing"
            quality={95}
            className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl transition
            group-hover:-translate-x-3
            group-hover:translate-y-3
            group-hover:-rotate-2
            group-hover:scale-[1.04]
            group-even:group-hover:translate-x-3
            group-even:group-hover:translate-y-3
            group-even:group-hover:rotate-2
            group-even:right-[initial]
            group-even:-left-40 "
          />
        </a>
      </HoverBorderGradient>
    </motion.div>
  );
}
