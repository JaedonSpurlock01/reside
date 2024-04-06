"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ResideMap from "./_components/Map";
import ListContainer from "./_components/Listings/ListContainer";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchCity } from "@/lib/geosearch/citySearch";
import { stateCenter, stateCodes } from "@/lib/stateConversion";

export default function ResideHome() {
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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialState: string | null = searchParams.get("state");
  const initialCity: string | null = searchParams.get("city");

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

  return (
    <div className="w-full h-[86vh] bg-neutral-800 overflow-hidden">
      <div className="relative w-full h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
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
          {selectedCity && (
            <>
              <ResizableHandle
                className="bg-transparent w-[0.2rem] hover:bg-gray-400 transition"
                onChange={() => {
                  setMapDraggable(false);
                }}
                onDragEnd={() => setMapDraggable(true)}
                withHandle
              />
              <ResizablePanel
                minSize={32}
                maxSize={95}
                defaultSize={35}
                style={{ overflow: "auto" }}
              >
                <ListContainer
                  selectedCity={selectedCity}
                  selectedStateCode={selectedStateCode}
                  loadingRentals={loadingRentals}
                  className="p-5 bg-neutral-800"
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>

        {!selectedCity && showPopup && (
          <div className="absolute bottom-[6rem] left-2 w-72 p-3 bg-neutral-800 font-light rounded-lg">
            <h1 className=" text-neutral-100 truncate">{hoveredCity?.name}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
