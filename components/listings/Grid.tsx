"use client";

import { rentcastTestData } from "@/lib/data";
import React from "react";
import ListingCard from "./ListingCard";
import { RentCastListing } from "@/types/RentCastListing";

interface GridProps {
  listings: RentCastListing[];
}

export default function Grid({ listings = [] }: GridProps) {
  return (
    <ul className="mt-4 grid gap-[12px] grid-cols-auto-fill min-w-[286px] grid-flow-row mb-16">
      {listings?.map((listing, index) => (
        <ListingCard
          key={index}
          address={listing.body.formattedAddress}
          price={listing.body.price}
          bedrooms={listing.body.bedrooms}
          bathrooms={listing.body.bathrooms}
          squareFootage={listing.body.squareFootage}
          images={listing.images}
          listingId={listing.id}
        />
      ))}
    </ul>
  );
}
