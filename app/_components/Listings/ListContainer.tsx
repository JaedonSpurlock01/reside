import { CircularProgress } from "@mui/material";
import React from "react";
import FilterHeader from "./Filter/FilterHeader";
import Grid from "./Grid";

export default function ListContainer({
  selectedCity,
  selectedStateCode,
  loadingRentals,
  className,
}: {
  selectedCity: string;
  selectedStateCode: string | null;
  loadingRentals: boolean;
  className: string;
}) {
  return (
    <div className={className}>
      <div>
        <h1 className="relative font-bold overflow-hidden text-lg text-[#f7f7f7]">
          {selectedCity} {selectedStateCode?.toUpperCase()} Rental Listings
        </h1>

        <FilterHeader />

        {loadingRentals ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <CircularProgress size={20} thickness={5} />
          </div>
        ) : (
          <Grid />
        )}
      </div>
    </div>
  );
}
