"use client";

import { Input } from "@/components/ui/input";
import { City, searchCities } from "@/lib/geosearch/citySearch";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import MenuItem from "./navbar/MenuItem";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Search({
  className,
  resultsClassName,
}: {
  className?: string;
  resultsClassName?: string;
}) {
  const [results, setResults] = useState<City[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    searchCities(newQuery, (foundResults: City[]) => {
      console.log("FOUND: ", foundResults);
      setResults(foundResults);
      if (foundResults.length > 0) {
        setShowSearchResults(true);
      } else {
        setShowSearchResults(false);
      }
    });
  };

  return (
    <div
      className={className}
      style={{
        borderColor: "rgb(55 55 55)",
        backgroundColor: "rgb(58 56 56)",
      }}
    >
      <form className="w-[95%] flex">
        <Input
          placeholder="Enter city or state"
          className="bg-transparent border-none"
          onChange={handleSearch}
        />
        <button type="submit">
          <IoIosSearch />
        </button>
      </form>

      {showSearchResults && (
        <div
          className={cn(
            "absolute z-20 rounded-xl shadow-md border w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] bg-neutral-700 bg-opacity-20 top-12 space-y-1",
            resultsClassName
          )}
          style={{
            borderColor: "rgb(55 55 55)",
            backgroundColor: "rgb(58 56 56)",
          }}
        >
          <div className="w-full h-full overflow-hidden rounded-xl">
            <div className="flex flex-col cursor-pointer !text-sm">
              {results.map((location) => (
                <MenuItem
                  key={location.id}
                  onClick={() => {
                    router.push(
                      `/rent/?city=${location.city}&state=${location.state_name}`
                    );
                    router.refresh();
                  }}
                  label={`${location.city}, ${location.state_name}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
