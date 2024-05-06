"use client";

import React, { useState } from "react";
import { RentCastListing } from "@/types/RentCastListing";
import ListingInterest from "./ListingInterest";

interface RoommateGridProps {
  listings: RentCastListing[];
  showNav?: boolean;
  showFullscren?: boolean;
}

export default function RoommateGrid({ listings = [] }: RoommateGridProps) {
  const [clientListings, setClientListings] = useState<RentCastListing[]>(listings);

  return (
    <ul className="mt-4 gap-8 min-w-[286px] flex flex-col mb-16 items-center w-full  max-w-[1000px]">
      {clientListings?.map((listing, index) => (
        <ListingInterest
          key={index}
          address={listing.body.addressLine1}
          price={listing.body.price}
          bedrooms={listing.body.bedrooms}
          bathrooms={listing.body.bathrooms}
          squareFootage={listing.body.squareFootage}
          images={listing.images}
          listingId={listing.id}
          setClientListings={setClientListings}
        />
      ))}
    </ul>
  );
}
