import { CircularProgress } from "@mui/material";
import React from "react";
import FilterHeader from "./filter/FilterHeader";
import Grid from "./Grid";
import { ListingPagination } from "./ListingPagination";

interface ListContainerProps {
  selectedCity?: string;
  selectedStateCode?: string | null;
  loadingRentals?: boolean;
  className?: string;
}

export default function ListContainer({
  selectedCity,
  selectedStateCode,
  loadingRentals,
  className,
}: ListContainerProps) {
  return (
    <div className={className}>
      <h1 className="relative font-bold text-lg text-[#f7f7f7]">
        {selectedCity} {selectedStateCode?.toUpperCase()} Rental Listings
      </h1>

      <FilterHeader />

      {loadingRentals ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <CircularProgress size={20} thickness={5} />
        </div>
      ) : (
        <>
          <Grid />
          <ListingPagination />
        </>
      )}
    </div>
  );
}
