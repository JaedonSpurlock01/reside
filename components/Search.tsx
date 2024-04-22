import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import MenuItem from "./navbar/MenuItem";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { City, searchCities } from "@/lib/geosearch/citySearch";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setResults([]);
        setShowSearchResults(false);
      }
    },
    [dropdownRef]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        console.log(results);

        if (results.length > 1) {
          router.push(
            `/rent/?city=${results[0].city}&state=${results[0].state_name}`
          );
          router.refresh();
        }

        setResults([]);
        setShowSearchResults(false);
      }
    },
    [results, router]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

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
          disableRing
        />
        <button type="submit">
          <IoIosSearch />
        </button>
      </form>

      {showSearchResults && (
        <div
          ref={dropdownRef}
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
                    setShowSearchResults(false);
                    setResults([]);
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
