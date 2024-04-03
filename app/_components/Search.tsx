import { Input } from "@/components/ui/input";
import { City, searchCity } from "@/lib/geosearch/citySearch";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const testData = [
  "123 Main Street, Springfield, IL 62701",
  "456 Elm Avenue, Oakville, CA 94562",
  "789 Maple Lane, Manchester, UK M1 1AB",
  "987 Pine Road, Sydney, NSW 2000, Australia",
  "654 Birch Street, Toronto, ON M5J 2H7, Canada",
  "321 Cedar Avenue, Berlin, Germany 10115",
  "246 Oakwood Drive, Tokyo, Japan 150-0002",
  "135 Walnut Lane, Paris, France 75001",
  "876 Willow Street, Madrid, Spain 28001",
  "543 Cherry Avenue, Rome, Italy 00184",
] as const;

export default function Search({
  mapOnly,
  className,
}: {
  mapOnly: boolean;
  className: string;
}) {
  const [results, setResults] = useState<City[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    searchCity(newQuery, (foundResults: City[]) => {
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
      style={
        !mapOnly
          ? {
              borderColor: "rgb(55 55 55)",
              backgroundColor: "rgb(58 56 56)",
            }
          : { borderColor: "rgb(255 255 255)" }
      }
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
          className="absolute rounded-lg border w-[18rem] bg-neutral-400 bg-opacity-20 p-1 top-12 space-y-1 backdrop-blur-lg"
          style={
            !mapOnly
              ? {
                  borderColor: "rgb(55 55 55)",
                  backgroundColor: "rgb(58 56 56)",
                }
              : {
                  borderColor: "rgb(255 255 255)",
                  color: "rgb(255 255 255 / 0.9)",
                }
          }
        >
          {results.map((location) => (
            <p
              key={location.id}
              className="truncate text-xs p-2 rounded-md hover:bg-neutral-800"
            >
              {location.city}, {location.state_name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
