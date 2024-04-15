"use client";

import EmptyState from "@/components/EmptyState";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchCity } from "@/lib/geosearch/citySearch";
import { stateCodes } from "@/lib/stateConversion";
import ListContainer from "@/components/listings/ListContainer";
import ResideMap from "@/components/Map";
import qs from "query-string";
import { RentCastListing } from "@/types/RentCastListing";

export default function ListingPage() {
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

  const gatherListings = async (
    cityQuery: any,
    stateQuery: any,
    roomCount?: any,
    bathroomCount?: any,
    propertyType?: any
  ) => {
    if (!cityQuery || !stateQuery) return;
    try {
      setLoadingRentals(true);
      setInvalid(false);
      const response = await fetch(
        `/api/fetchListings/?city=${cityQuery}&state=${
          stateCodes[stateQuery.toLowerCase()]
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

      console.log("STATE: ", stateQuery, "CITY: ", cityQuery);
      console.log("GOT LISTINGS: ", listings);

      if (!listings) {
        setListings([]);
        setInvalid(true);
        return;
      }

      let filteredListings = [];
      for (let listing of listings) {
        let passFilter = true;
        if (roomCount && roomCount !== listing.body.bedrooms) {
          passFilter = false;
        }
        if (bathroomCount && bathroomCount !== listing.body.bathrooms) {
          passFilter = false;
        }
        if (propertyType && propertyType !== listing.body.propertyType) {
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
  };

  const setEmptyState = () => {
    setListings([]);
    setInvalid(true);
  };

  useEffect(() => {
    let currentQuery: any = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const cityQuery: any = currentQuery.city;
    const stateQuery: any = currentQuery.state;
    const roomCount: any = currentQuery.roomCount;
    const bathroomCount: any = currentQuery.bathroomCount;
    const propertyType: any = currentQuery.propertyType;

    console.log("ON MOUNT OR WHEN SELECTED: ", cityQuery, stateQuery);

    if (cityQuery && stateQuery) {
      searchCity(cityQuery, stateQuery, (cityFound) => {
        if (!cityFound) {
          setEmptyState();
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

          setSelectedCity(cityQuery);
          setSelectedStateCode(stateCodes[stateQuery.toLowerCase()]);

          gatherListings(cityQuery, stateQuery);
        }
      });
    } else {
      setEmptyState();
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
              setLoadingRentals={setLoadingRentals}
              setListings={setListings}
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
    </Suspense>
  );
}
