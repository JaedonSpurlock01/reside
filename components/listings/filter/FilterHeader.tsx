"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import useFilterModal from "@/hooks/useFilterModal";
import { RentCastListing } from "@/types/RentCastListing";

interface FilterHeaderProps {
  listings: RentCastListing[];
}

export default function FilterHeader({ listings = [] }: FilterHeaderProps) {
  const filterModal = useFilterModal();

  return (
    <div>
      <div className="relative w-full h-20 flex flex-row flex-wrap text-white space-x-2 items-center text-center">
        <Button className="rounded-lg bg-[#3a3838] w-28 h-12 relative" />
      </div>

      <div className="flex flex-row">
        <p className="font-medium text-[#c8c8c8]">{listings?.length} results</p>
        <button className="ml-auto text-blue-400 flex flex-row items-center">
          Sort: Recommended <IoIosArrowDown />
        </button>
      </div>
    </div>
  );
}
