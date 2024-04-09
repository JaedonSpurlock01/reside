"use client";

import { rentcastTestData } from "@/lib/data";
import React from "react";
import ListingCard from "./ListingCard";

export default function Grid() {
  return (
    <ul className="mt-4 grid gap-[12px] grid-cols-auto-fill min-w-[286px] grid-flow-row mb-16">
      {rentcastTestData.map((listing, index) => (
        <ListingCard
          key={index}
          address={listing.formattedAddress}
          price={listing.price}
          bedrooms={listing.bedrooms}
          bathrooms={listing.bathrooms}
          squareFootage={listing.squareFootage}
          imageSrc="/example_apartment.jpg"
        />
      ))}
    </ul>
  );
}
