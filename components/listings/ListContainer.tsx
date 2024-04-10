import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import FilterHeader from "./filter/FilterHeader";
import Grid from "./Grid";
import { ListingPagination } from "./ListingPagination";
import { RentCastListing } from "@/types/RentCastListing";

interface ListContainerProps {
  selectedCity?: string;
  selectedStateCode?: string | null;
  loadingRentals?: boolean;
  className?: string;
  listings?: RentCastListing[];
}

export default function ListContainer({
  selectedCity,
  selectedStateCode,
  loadingRentals,
  className,
  listings = [],
}: ListContainerProps) {
  return (
    <div className={className}>
      <h1 className="relative font-bold text-lg text-[#f7f7f7]">
        {selectedCity} {selectedStateCode?.toUpperCase()} Rental Listings
      </h1>

      <FilterHeader listings={listings} />

      {loadingRentals ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <CircularProgress size={20} thickness={5} />
        </div>
      ) : (
        <>
          <Grid listings={listings} />
          <ListingPagination />
        </>
      )}
    </div>
  );
}
