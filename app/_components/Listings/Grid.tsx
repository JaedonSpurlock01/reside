import { rentcastTestData } from "@/lib/data";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * index },
  }),
};

export default function Grid() {
  return (
    <ul className="mt-4 grid gap-[12px] grid-cols-auto-fill min-w-[286px] grid-flow-row mb-16">
      {rentcastTestData.map((listing, index) => (
        <motion.li
          className="relative min-h-[265px] list-item shadow-lg rounded-xl hover:border hover:border-white"
          key={index}
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={index}
        >
          <Link
            href={{
              pathname: `/${encodeURIComponent(listing.formattedAddress)}`,
            }}
          >
            <div className="h-full bg-[#3a3838] rounded-xl p-2 hover:cursor-pointer">
              <div>
                <Image
                  src="/example_apartment.jpg"
                  alt={listing.formattedAddress}
                  className="object-cover w-full min-h-full rounded-xl"
                  width={1024}
                  height={576}
                ></Image>
              </div>
              <div className="p-2 pb-4 ">
                <div>
                  <span className="font-bold text-xl text-neutral-300">
                    ${listing.price.toLocaleString()}/mo
                  </span>
                </div>
                <div className="text-neutral-400">
                  {listing.bedrooms} bds | {listing.bathrooms} ba |{" "}
                  {listing.squareFootage.toLocaleString()} sqft
                </div>
                <div className="text-neutral-400">
                  {listing.formattedAddress}
                </div>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
