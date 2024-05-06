import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import useFilterModal from "@/hooks/useFilterModal";
import { RentCastListing } from "@/types/RentCastListing";

interface FilterHeaderProps {
  listings: RentCastListing[];
  setListings: any;
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export default function FilterHeader({
  listings = [],
  setListings,
}: FilterHeaderProps) {
  const [sortBy, setSortBy] = useState("Sort"); // State to track sorting criteria

  // Function to sort listings by price ascending
  const sortByPriceA = () => {
    setSortBy("Price");
    const sortedListings = [...listings].sort(
      (a, b) => a.body.price - b.body.price
    );
    setListings(sortedListings);
  };

  // Function to sort listings by bed ascending
  const sortByBedA = () => {
    setSortBy("Bed");
    const sortedListings = [...listings].sort(
      (a, b) => a.body.bedrooms - b.body.bedrooms
    );
    setListings(sortedListings);
  };

  // Function to sort listings by bath ascending
  const sortByBathA = () => {
    setSortBy("Bath");
    const sortedListings = [...listings].sort(
      (a, b) => a.body.bathrooms - b.body.bathrooms
    );
    setListings(sortedListings);
  };

  // Function to sort listings by price descending
  const sortByPriceD = () => {
    setSortBy("Price");
    const sortedListings = [...listings].sort(
      (a, b) => b.body.price - a.body.price
    );
    setListings(sortedListings);
  };

  // Function to sort listings by bed descending
  const sortByBedD = () => {
    setSortBy("Bed");
    const sortedListings = [...listings].sort(
      (a, b) => b.body.bedrooms - a.body.bedrooms
    );
    setListings(sortedListings);
  };

  // Function to sort listings by bath descending
  const sortByBathD = () => {
    setSortBy("Bath");
    const sortedListings = [...listings].sort(
      (a, b) => b.body.bathrooms - a.body.bathrooms
    );
    setListings(sortedListings);
  };

  return (
    <div>
      <div className="relative w-full h-20 flex flex-row flex-wrap text-white space-x-2 items-center text-center">
        <Button className="rounded-lg bg-[#3a3838] w-28 h-12 relative" />
      </div>

      <div className="flex flex-row items-center">
        <p className="font-medium text-[#c8c8c8]">{listings?.length} results</p>

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto bg-neutral-700 p-2 rounded-lg mb-auto text-blue-400 flex flex-row items-center gap-2 px-6">
            Sort <IoIosArrowDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-700 border-transparent ">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem
                className="text-blue-400 items-center text-lg hover:bg-neutral-700/80 focus:bg-neutral-700/80"
                value="PriceA"
                onClick={sortByPriceA}
              >
                Sort by lowest price
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                className="text-blue-400 items-center text-lg hover:bg-neutral-700/80 focus:bg-neutral-700/80"
                value="BedA"
                onClick={sortByBedA}
              >
                Sort by least beds
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                className="text-blue-400 items-center text-lg hover:bg-neutral-700/80 focus:bg-neutral-700/80"
                value="BathA"
                onClick={sortByBathA}
              >
                Sort by least baths
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                className="text-blue-400 items-center text-lg hover:bg-neutral-700/80 focus:bg-neutral-700/80"
                value="PriceD"
                onClick={sortByPriceD}
              >
                Sort by highest price
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                className="text-blue-400 items-center text-lg hover:bg-neutral-700/80 focus:bg-neutral-700/80"
                value="BedD"
                onClick={sortByBedD}
              >
                Sort by most beds
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                className="text-blue-400 items-center text-lg hover:bg-neutral-700/80 focus:bg-neutral-700/80"
                value="BathD"
                onClick={sortByBathD}
              >
                Sort by most baths
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
