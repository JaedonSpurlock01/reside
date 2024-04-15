"use client";

import EmptyState from "@/components/EmptyState";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchCity } from "@/lib/geosearch/citySearch";
import { stateCodes } from "@/lib/stateConversion";
import ListContainer from "@/components/listings/ListContainer";
import ResideMap from "@/components/Map";
import qs from "query-string";
import { RentCastListing } from "@/types/RentCastListing";

export default function ListingPage() {
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [hoveredCity, setHoveredCity] = useState<any>(null);
  const [loadingRentals, setLoadingRentals] = useState<boolean>(false);
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );
  const [viewport, setViewport] = useState<any>({
    width: "100%",
    height: "100%",
    latitude: 38.8058, // USA Lat Center
    longitude: -97.6114, // USA Lon Center
    zoom: 4,
    pitch: 0,
    bearing: 0,
  });
  const [listings, setListings] = useState<RentCastListing[]>([]);
  const [invalid, setInvalid] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const gatherListings = useCallback(async () => {
    if (!city || !state) return;
    try {
      setLoadingRentals(true);
      setInvalid(false);
      const response = await fetch(
        `/api/fetchListings/?city=${city}&state=${
          state.length === 2
            ? state.toUpperCase()
            : stateCodes[state.toLowerCase()]
        }`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const listings: RentCastListing[] = await response.json();

      setLoadingRentals(false);

      console.log("STATE: ", state, "CITY: ", city);
      console.log("GOT LISTINGS: ", listings);

      if (!listings) {
        setListings([]);
        setInvalid(true);
        return;
      }

      let filteredListings = [];
      let currentQuery: any = {};

      if (searchParams) {
        currentQuery = qs.parse(searchParams.toString());
      }

      for (let listing of listings) {
        let passFilter = true;

        if (
          currentQuery.roomCount &&
          currentQuery.roomCount !== listing.body.bedrooms
        ) {
          passFilter = false;
        }
        if (
          currentQuery.bathroomCount &&
          currentQuery.bathroomCount !== listing.body.bathrooms
        ) {
          passFilter = false;
        }
        if (
          currentQuery.propertyType &&
          currentQuery.propertyType !== listing.body.propertyType
        ) {
          passFilter = false;
        }

        if (passFilter) {
          filteredListings.push(listing);
        }
      }

      setListings(filteredListings);
    } catch (error) {
      console.log("Error in gathering listings: ", error);
    }
  }, [city, state, searchParams]);

  useEffect(() => {
    let currentQuery: any = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }
    setSelectedCity(currentQuery.city);
    setSelectedStateCode(stateCodes[currentQuery.state.toLowerCase()]);
    setCity(currentQuery.city);
    setState(currentQuery.state);

    if (currentQuery.city && currentQuery.state) {
      gatherListings();
    }
  }, [searchParams, selectedCity, selectedStateCode, gatherListings]);

  useEffect(() => {
    if (city && state && state.toLowerCase() in stateCodes) {
      searchCity(city, state, (cityFound) => {
        if (!cityFound) {
          setInvalid(true);
          setListings([]);
        } else {
          setViewport({
            width: "100%",
            height: "100%",
            latitude: cityFound.lat,
            longitude: cityFound.lng,
            zoom: 11,
            pitch: 0,
            bearing: 0,
          });
        }
      });
    } else {
      setListings([]);
      setCity("");
      setState("");
      setInvalid(true);
    }
  }, [city, state, searchParams]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-800">
      <ResizablePanelGroup direction="horizontal" style={{ height: "100%" }}>
        <ResizablePanel className="z-0" defaultSize={100}>
          <ResideMap
            viewport={viewport}
            setViewport={setViewport}
            setShowPopup={setShowPopup}
            setSelectedCity={setSelectedCity}
            setHoveredCity={setHoveredCity}
            selectedStateCode={selectedStateCode}
            setSelectedStateCode={setSelectedStateCode}
          />
        </ResizablePanel>

        <ResizableHandle
          className="bg-transparent w-[0.2rem] hover:bg-gray-400"
          withHandle
        />
        <ResizablePanel
          minSize={28}
          maxSize={95}
          defaultSize={35}
          style={{ overflow: "auto" }}
        >
          {!invalid ? (
            <ListContainer
              selectedCity={selectedCity}
              selectedStateCode={selectedStateCode}
              loadingRentals={loadingRentals}
              className="p-5 bg-neutral-800"
              listings={listings}
            />
          ) : (
            <EmptyState />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>

      {showPopup && (
        <div className="absolute bottom-[6rem] left-2 w-72 p-3 bg-neutral-800 font-light rounded-lg">
          <h1 className=" text-neutral-100 truncate">{hoveredCity?.name}</h1>
        </div>
      )}
    </div>
  );
}
