import { CircularProgress } from "@mui/material";
import React from "react";
import { RentCastListing } from "@/types/RentCastListing";
import EmptyState from "../EmptyState";
import RoommateGrid from "./RoommateGrid";

interface RoommateListContainerProps {
  title?: string;
  listings: RentCastListing[];
}

export default function RoommateListContainer({
  title,
  listings = [],
}: RoommateListContainerProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="relative font-bold text-lg text-[#f7f7f7] w-full text-left max-w-[1000px]">
        {title}
      </h1>

      <RoommateGrid listings={listings} />
    </div>
  );
}
