"use client";

import EmptyState from "@/components/EmptyState";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Suspense,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useSearchParams } from "next/navigation";
import { searchCity } from "@/lib/geosearch/citySearch";
import { stateCodes } from "@/lib/stateConversion";
import ListContainer from "@/components/listings/ListContainer";
import ResideMap from "@/components/Map";
import qs from "query-string";
import { RentCastListing } from "@/types/RentCastListing";
import getListings from "@/actions/getListings";

export default function ListingPage() {
  const [selectedCity, setSelectedCity] = useState<string>("");
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
  const [isPending, startTransition] = useTransition();
  const [listings, setListings] = useState<RentCastListing[]>([]);
  const [invalid, setInvalid] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const setEmptyState = () => {
    setListings([]);
    setInvalid(true);
  };

  const gatherListings = (city: string, state: string) => {
    if (!city || !state) return;

    const currentQuery: any = qs.parse(searchParams?.toString()) || {};
    const { roomCount, bathroomCount, propertyType } = currentQuery;

    startTransition(() => {
      getListings({
        city,
        state: stateCodes[state].toUpperCase() || "CA",
      })
        .then((data: RentCastListing[]) => {
          setInvalid(false);

          if (!data) {
            setListings([]);
            setInvalid(true);
            return;
          }

          console.log(
            "SUCCESSFULLY FETCHED",
            data.length,
            "LISTINGS FROM ",
            city.toUpperCase(),
            state.toUpperCase()
          );

          let filteredListings = [];

          for (let listing of data) {
            let passFilter = true;
            if (
              Number(roomCount) &&
              Number(roomCount) !== listing.body.bedrooms
            ) {
              passFilter = false;
            }
            if (
              Number(bathroomCount) &&
              Number(bathroomCount) !== listing.body.bathrooms
            ) {
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
        })
        .catch((error) => {
          console.log("Error in gathering listings: ", error);
        });
    });
  };

  const updateListingGrid = (city: string, state: string) => {
    if (city && state) {
      searchCity(city, state, (cityFound) => {
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

          setSelectedCity(city);
          setSelectedStateCode(stateCodes[state.toLowerCase()]);

          gatherListings(city, state.toLowerCase());
        }
      });
    } else {
      setEmptyState();
    }
  };

  useEffect(() => {
    const currentQuery: any = qs.parse(searchParams?.toString()) || {};
    updateListingGrid(currentQuery.city, currentQuery.state);
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative w-full h-full overflow-hidden bg-neutral-800">
        <ResizablePanelGroup direction="horizontal" style={{ height: "100%" }}>
          <ResizablePanel className="z-0" defaultSize={100}>
            <ResideMap
              viewport={viewport}
              setViewport={setViewport}
              setSelectedCity={setSelectedCity}
              selectedStateCode={selectedStateCode}
              setSelectedStateCode={setSelectedStateCode}
              listings={listings}
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
                loadingRentals={isPending}
                className="p-5 bg-neutral-800"
                listings={listings}
                setListings={setListings}
              />
            ) : (
              <EmptyState />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Suspense>
  );
}
