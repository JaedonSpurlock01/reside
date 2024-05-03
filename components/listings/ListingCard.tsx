"use client";

import React from "react";
import ImageGallery from "react-image-gallery";
import { motion } from "framer-motion";
import Link from "next/link";
import HeartButton from "./HeartButton";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * index },
  }),
};

interface ListingCardProps {
  images?: string[];
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  address: string;
  listingId: string;
  showNav?: boolean;
  showFullscreen?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  images = [],
  price = 0,
  bedrooms = 1,
  bathrooms = 1,
  squareFootage = 0,
  address = "No Address",
  listingId,
  showNav = true,
  showFullscreen = true,
}) => {
  return (
    <motion.li
      className="relative min-h-[265px] list-item shadow-lg rounded-xl border border-transparent hover:border-white"
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="h-full bg-[#3a3838] rounded-xl p-2 hover:cursor-pointer flex flex-col">
        <div className="flex-grow">
          <div className="w-full min-h-full">
            <ImageGallery
              showNav={showNav}
              showBullets={false}
              showFullscreenButton={showFullscreen}
              showPlayButton={false}
              showThumbnails={false}
              items={images.map((imageSrc) => ({
                original: imageSrc,
                thumbnail: imageSrc,
              }))}
            />
            <div className="absolute top-6 right-6">
              <HeartButton listingId={listingId} />
            </div>
          </div>
        </div>
        <Link
          href={{
            pathname: `/listings/${listingId}`,
          }}
        >
          <div className="p-2 pb-4 ">
            <div>
              <span className="font-bold text-xl text-neutral-300">
                ${price.toLocaleString()}/mo
              </span>
            </div>
            <div className="text-neutral-400">
              {bedrooms} bds | {bathrooms} ba | {squareFootage.toLocaleString()}{" "}
              sqft
            </div>
            <div className="text-neutral-400 truncate">{address}</div>
          </div>
        </Link>
      </div>
    </motion.li>
  );
};

export default ListingCard;
