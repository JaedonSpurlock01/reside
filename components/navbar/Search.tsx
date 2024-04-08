"use client";

import { Input } from "@/components/ui/input";
import { City, searchCities } from "@/lib/geosearch/citySearch";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

export default function Search({ className }: { className: string }) {
  const [results, setResults] = useState<City[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

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
          placeholder="City, State, ZIP, Address"
          className="bg-transparent border-none"
          onChange={handleSearch}
        />
        <button type="submit">
          <IoIosSearch />
        </button>
      </form>

      {showSearchResults && (
        <div
          className="absolute z-20 rounded-lg border w-[18rem] bg-neutral-400 bg-opacity-20 p-1 top-12 space-y-1"
          style={{
            borderColor: "rgb(55 55 55)",
            backgroundColor: "rgb(58 56 56)",
          }}
        >
          {results.map((location) => (
            <p
              key={location.id}
              className="truncate z-20 text-xs p-2 rounded-md hover:bg-neutral-800"
            >
              {location.city}, {location.state_name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
