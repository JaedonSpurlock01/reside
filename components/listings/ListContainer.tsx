import { CircularProgress } from "@mui/material";
import React from "react";
import FilterHeader from "./filter/FilterHeader";
import Grid from "./Grid";
import { ListingPagination } from "./ListingPagination";
import { RentCastListing } from "@/types/RentCastListing";
import EmptyState from "../EmptyState";

interface ListContainerProps {
  selectedCity?: string;
  selectedStateCode?: string | null;
  loadingRentals?: boolean;
  className?: string;
  listings: RentCastListing[];
  setListings?: any; // Used for sorting
  showFilter?: boolean;
}

export default function ListContainer({
  selectedCity,
  selectedStateCode,
  loadingRentals,
  className,
  listings = [],
  showFilter = true,
  setListings,
}: ListContainerProps) {
  return (
    <div className={className}>
      <h1 className="relative font-bold text-lg text-[#f7f7f7]">
        {selectedCity} {selectedStateCode?.toUpperCase()} Rental Listings
      </h1>

      {showFilter && (
        <FilterHeader
          setListings={setListings ? setListings : () => {}}
          listings={listings}
        />
      )}

      {loadingRentals ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <CircularProgress size={20} thickness={5} />
        </div>
      ) : listings.length > 0 ? (
        <>
          <Grid listings={listings} />
          {/* <ListingPagination /> */}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
