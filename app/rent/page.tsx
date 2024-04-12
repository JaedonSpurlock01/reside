"use client";

import EmptyState from "@/components/EmptyState";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchCity } from "@/lib/geosearch/citySearch";
import { stateCenter, stateCodes } from "@/lib/stateConversion";
import ListContainer from "@/components/listings/ListContainer";
import ResideMap from "@/components/Map";

interface IParams {
  city?: string;
  state?: string;
}

export default function ListingPage({ city, state }: IParams) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [hoveredCity, setHoveredCity] = useState<any>(null);
  const [loadingRentals, setLoadingRentals] = useState<boolean>(false);
  const [mapDraggable, setMapDraggable] = useState<boolean>(true);
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
  const [listings, setListings] = useState<any>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialState: string | null = searchParams.get("state");
  const initialCity: string | null = searchParams.get("city");

  const gatherListings = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/fetchListings/?city=${selectedCity}&state=${selectedStateCode}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const listings = await response.json();

      setListings(listings);
    } catch (error) {
      console.log("Could not send request: ", error);
    }
  }, [selectedCity, selectedStateCode]);

  useEffect(() => {
    if (!selectedCity || !selectedStateCode) return;
    gatherListings();
  }, [selectedCity, selectedStateCode, gatherListings]);

  useEffect(() => {
    if (initialState && !initialCity) {
      // Only state
      if (initialState.toLowerCase() in stateCodes) {
        const stateCode: string = stateCodes[initialState.toLowerCase()];
        if (stateCode in stateCenter) {
          setViewport({
            width: "100%",
            height: "100%",
            latitude: stateCenter[stateCode.toLowerCase()][0],
            longitude: stateCenter[stateCode.toLowerCase()][1],
            zoom: 6,
            pitch: 0,
            bearing: 0,
          });
          setSelectedStateCode(stateCode);
        }
      } else {
        //router.push(pathname);
      }
    } else if (initialState && initialCity) {
      // state, city
      searchCity(initialCity, initialState, (cityFound) => {
        if (!cityFound) {
          //router.push(pathname);
        } else {
          setSelectedCity(initialCity);
          setSelectedStateCode(stateCodes[initialState.toLowerCase()]);
          setLoadingRentals(true);
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
    }
  }, [initialState, initialCity]); // Add dependencies here

  //   if (!city || !state) {
  //     return <EmptyState />;
  //   }

  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-800">
      <ResizablePanelGroup direction="horizontal" style={{ height: "100%" }}>
        <ResizablePanel className="z-0" defaultSize={100}>
          <ResideMap
            viewport={viewport}
            setViewport={setViewport}
            loadingRentals={loadingRentals}
            setLoadingRentals={setLoadingRentals}
            setShowPopup={setShowPopup}
            setSelectedCity={setSelectedCity}
            setHoveredCity={setHoveredCity}
            mapDraggable={mapDraggable}
            setMapDraggable={setMapDraggable}
            selectedStateCode={selectedStateCode}
            setSelectedStateCode={setSelectedStateCode}
          />
        </ResizablePanel>

        <ResizableHandle
          className="bg-transparent w-[0.2rem] hover:bg-gray-400"
          onChange={() => {
            setMapDraggable(false);
          }}
          onDragEnd={() => setMapDraggable(true)}
          withHandle
        />
        <ResizablePanel
          minSize={28}
          maxSize={95}
          defaultSize={35}
          style={{ overflow: "auto" }}
        >
          <ListContainer
            selectedCity={selectedCity}
            selectedStateCode={selectedStateCode}
            loadingRentals={loadingRentals}
            className="p-5 bg-neutral-800"
            listings={listings}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      {!selectedCity && showPopup && (
        <div className="absolute bottom-[6rem] left-2 w-72 p-3 bg-neutral-800 font-light rounded-lg">
          <h1 className=" text-neutral-100 truncate">{hoveredCity?.name}</h1>
        </div>
      )}
    </div>
  );
}
