"use client";

import React, { useRef, useState, useEffect } from "react";
import Map, { Marker, Layer, Source, MapMouseEvent, Popup } from "react-map-gl";
import { stateCenter, stateCodes } from "@/public/stateConversion";
import "mapbox-gl/dist/mapbox-gl.css"; // For some reason mapbox doesn't handle attribution/children attributes
import { motion } from "framer-motion";
import { CardContent, CircularProgress } from "@mui/material";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

import { rentcastTestData } from "@/lib/data";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ListingPagination } from "./ListingPagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Define your mapbox access token
const MAPBOX_TOKEN = "";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * index },
  }),
};

export default function ResideMap({ setMapOnly }: { setMapOnly: any }) {
  const mapRef = useRef<any>();
  const [hoveredPolygonId, setHoveredPolygonId] = useState<
    string | number | null
  >(null);
  const [selectedStateCode, setSelectedStateCode] = useState<string | null>(
    null
  );
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [hoveredCity, setHoveredCity] = useState<any>(null);
  const [showChangePrice, setShowChangePrice] = useState<boolean>(false);
  const [showChangeBB, setShowChangeBB] = useState<boolean>(false);

  const [loadingRentals, setLoadingRentals] = useState<boolean>(false);

  const [viewport, setViewport] = React.useState<any>({
    width: "100%",
    height: "100%",
    latitude: 38.8058,
    longitude: -97.6114,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  });

  const handleMouseLeave = (e: MapMouseEvent) => {
    if (hoveredPolygonId !== null) {
      mapRef.current.setFeatureState(
        { source: "states", id: hoveredPolygonId },
        { hover: false }
      );
    }
    setHoveredPolygonId(null);
  };

  const handleMouseMove = (e: MapMouseEvent) => {
    const features = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["state-fills"],
    });

    if (hoveredPolygonId !== null) {
      mapRef.current.setFeatureState(
        { source: "states", id: hoveredPolygonId },
        { hover: false }
      );
    }

    if (features && features.length > 0) {
      setHoveredPolygonId(features[0].id);
      mapRef.current.setFeatureState(
        { source: "states", id: features[0].id },
        { hover: true }
      );
    } else {
      setHoveredPolygonId(null);
    }

    if (selectedStateCode) {
      const cityFeatures = mapRef.current?.queryRenderedFeatures(e.point, {
        layers: ["city-fills"],
      });

      if (cityFeatures && cityFeatures.length > 0) {
        setHoveredCity({
          name: cityFeatures[0].properties.NAMELSAD,
          lat: e.lngLat.lat,
          lon: e.lngLat.lng,
        });
        setShowPopup(true);
      } else {
        setHoveredCity(null);
        setShowPopup(false);
      }
    }
  };

  const handleMouseClick = (e: MapMouseEvent) => {
    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ["state-fills"],
    });
    if (features <= 0) return;
    const state: string = stateCodes[features[0].properties.STATE_NAME];
    mapRef.current?.flyTo({
      center: [stateCenter[state][1], stateCenter[state][0]],
      duration: 2000,
      zoom: 6,
    });
    setSelectedStateCode(state);

    const cityFeatures = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["city-fills"],
    });

    if (cityFeatures && cityFeatures.length > 0) {
      setSelectedCity(cityFeatures[0].properties.NAMELSAD);
      setLoadingRentals(true);
      setMapOnly(false);
      mapRef.current?.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        duration: 3000,
        zoom: 11,
      });
    } else {
      setLoadingRentals(false);
      setMapOnly(true);
      setSelectedCity(null);
    }
  };

  useEffect(() => {
    if (loadingRentals) {
      const timeoutId = setTimeout(() => {
        setLoadingRentals(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [loadingRentals, setLoadingRentals]);

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full flex flex-row">
        <div
          className="transition-all duration-1000"
          style={selectedCity ? { width: "60%" } : { width: "100%" }}
        >
          <Map
            {...viewport}
            maxBounds={[
              [-136.736342, 17.521208], //Southwest
              [-60.945392, 58.382808], //Northeast
            ]}
            onMove={(evt) => setViewport(evt.viewState)}
            mapboxAccessToken={MAPBOX_TOKEN}
            ref={mapRef}
            mapStyle="mapbox://styles/mapbox/navigation-night-v1"
            attributionControl={false}
            onMouseMove={handleMouseMove}
            onClick={handleMouseClick}
            onMouseLeave={handleMouseLeave}
            cursor={hoveredPolygonId ? "pointer" : "default"}
          >
            <Source
              id="states"
              type="geojson"
              data="https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson"
            >
              <Layer
                id="state-fills"
                type="fill"
                paint={{
                  "fill-color": "#627BC1",
                  "fill-opacity": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    0.5,
                    0.15,
                  ],
                }}
              />
              <Layer
                id="state-borders"
                type="line"
                paint={{
                  "line-color": "#627BC1",
                  "line-width": 2,
                }}
              />
            </Source>

            {selectedStateCode && (
              <Source
                id="cities"
                type="geojson"
                data={`/states/${selectedStateCode}.json`}
              >
                <Layer
                  id="city-fills"
                  type="fill"
                  paint={{
                    "fill-color": "#bbbbbb",
                    "fill-opacity": [
                      "case",
                      ["boolean", ["feature-state", "hover"], false],
                      0.5,
                      0.15,
                    ],
                  }}
                />
                <Layer
                  id="city-borders"
                  type="line"
                  paint={{
                    "line-color": "#bbbbbb",
                    "line-width": 1,
                  }}
                />
              </Source>
            )}
          </Map>
        </div>
        {showPopup && (
          <div className="absolute top-36 left-2 w-72 p-3  rounded-lg text-xs backdrop-blur-lg">
            <h1 className=" text-neutral-100">CITY: {hoveredCity.name}</h1>
          </div>
        )}
        {selectedCity && (
          <div className="p-5 w-[40%] overflow-y-scroll bg-neutral-800 mt-20">
            <div>
              <h1 className="relative font-bold overflow-hidden text-lg text-[#f7f7f7]">
                {selectedCity} {selectedStateCode?.toUpperCase()} Rental
                Listings
              </h1>

              <div className="relative w-full h-20 flex flex-row flex-wrap text-white space-x-2 items-center text-center">
                <button
                  className="rounded-lg bg-[#3a3838] w-24 h-12 relative"
                  onClick={() => {
                    setShowChangePrice(!showChangePrice);
                    setShowChangeBB(false);
                  }}
                >
                  <h1 className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    Price
                  </h1>

                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {!showChangePrice ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </span>
                </button>

                {showChangePrice && (
                  <Card className="-left-2 absolute z-50 top-20 w-[400px] bg-[#3a3838] text-white">
                    <CardContent>
                      <div className="flex flex-row">
                        <div className="w-1/2 flex flex-col h-full p-2">
                          <h1 className="text-left font-semibold">Minimum</h1>
                          <Input
                            type="text"
                            placeholder="No Min"
                            className="bg-neutral-800"
                          />
                        </div>
                        <div className="mt-[3.2rem] w-3 h-[0.1rem] bg-[#acacac]" />
                        <div className="w-1/2 flex flex-col h-full p-2">
                          <h1 className="text-left font-semibold">Maximum</h1>
                          <Input
                            type="text"
                            placeholder="No Max"
                            className=" bg-neutral-800"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-neutral-800">Apply</Button>
                    </CardFooter>
                  </Card>
                )}

                <button
                  onClick={() => {
                    setShowChangeBB(!showChangeBB);
                    setShowChangePrice(false);
                  }}
                  className="rounded-lg bg-[#3a3838] w-36 h-12 pl-2 relative"
                >
                  <h1 className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    Beds/baths
                  </h1>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {!showChangeBB ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </span>
                </button>

                {showChangeBB && (
                  <Card className="absolute w-[440px] z-50 top-20 left-24 bg-[#3a3838] text-white">
                    <CardContent>
                      <div className="w-full h-16 px-2 mb-14">
                        <h1 className="text-left mb-2 font-semibold text-neutral-400">
                          Bedrooms
                        </h1>
                        <div className="w-full flex flex-row h-4/5 mb-4">
                          <button className="w-full h-full border border-[#5a5a5a] rounded-l-lg hover:bg-neutral-800">
                            Any
                          </button>
                          <button className="w-full h-full border-y border-[#5a5a5a] hover:bg-neutral-800">
                            1+
                          </button>
                          <button className="w-full h-full border-y border-l border-[#5a5a5a] hover:bg-neutral-800">
                            2+
                          </button>
                          <button className="w-full h-full border border-[#5a5a5a] hover:bg-neutral-800">
                            3+
                          </button>
                          <button className="w-full h-full border-y border-[#5a5a5a] hover:bg-neutral-800">
                            4+
                          </button>
                          <button className="w-full h-full border border-[#5a5a5a] rounded-r-lg hover:bg-neutral-800">
                            5+
                          </button>
                        </div>
                        <div className="w-full text-neutral-200 text-left flex flex-row items-center space-x-2">
                          <Checkbox
                            id="exact-match"
                            className="w-6 h-6 border-[#5a5a5a]"
                          />
                          <label
                            htmlFor="exact-match"
                            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Use exact match
                          </label>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent>
                      <div className="w-full h-16 px-2 mb-4">
                        <h1 className="text-left mb-2 font-semibold text-neutral-400">
                          Bathrooms
                        </h1>
                        <div className="w-full flex flex-row h-4/5">
                          <button className="w-full h-full border border-[#5a5a5a] rounded-l-lg hover:bg-neutral-800">
                            Any
                          </button>
                          <button className="w-full h-full border-y border-[#5a5a5a] hover:bg-neutral-800">
                            1
                          </button>
                          <button className="w-full h-full border-y border-l border-[#5a5a5a] hover:bg-neutral-800">
                            2
                          </button>
                          <button className="w-full h-full border border-[#5a5a5a] hover:bg-neutral-800">
                            3
                          </button>
                          <button className="w-full h-full border-y border-[#5a5a5a] hover:bg-neutral-800">
                            4
                          </button>
                          <button className="w-full h-full border border-[#5a5a5a] rounded-r-lg hover:bg-neutral-800">
                            5
                          </button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-neutral-800">Apply</Button>
                    </CardFooter>
                  </Card>
                )}
              </div>

              <div className="flex flex-row">
                <p className="font-medium text-[#c8c8c8]">100 results</p>
                <button className="ml-auto text-blue-400 flex flex-row items-center">
                  Sort: Recommended <IoIosArrowDown />
                </button>
              </div>
              {loadingRentals && (
                <div className="flex flex-col items-center justify-center mt-10">
                  <CircularProgress size={20} thickness={5} />
                </div>
              )}
              {!loadingRentals && (
                <div className="overflow-hidden">
                  <ul className="mt-4 grid gap-[12px] grid-cols-auto-fill min-w-[286px] grid-flow-row mb-16">
                    {rentcastTestData.map((listing, index) => (
                      <motion.li
                        className="relative min-h-[265px] list-item shadow-lg rounded-xl hover:border hover:border-white"
                        key={index}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={index}
                      >
                        <Link
                          href={{
                            pathname: `/${encodeURIComponent(
                              listing.formattedAddress
                            )}`,
                          }}
                        >
                          <div className="h-full bg-[#3a3838] rounded-xl p-2 hover:cursor-pointer">
                            <div>
                              <Image
                                src="/example_apartment.jpg"
                                alt={listing.formattedAddress}
                                className="object-cover w-full min-h-full rounded-xl"
                                width={1024}
                                height={576}
                              ></Image>
                            </div>
                            <div className="p-2 pb-4 ">
                              <div>
                                <span className="font-bold text-xl text-neutral-300">
                                  ${listing.price.toLocaleString()}/mo
                                </span>
                              </div>
                              <div className="text-neutral-400">
                                {listing.bedrooms} bds | {listing.bathrooms} ba
                                | {listing.squareFootage.toLocaleString()} sqft
                              </div>
                              <div className="text-neutral-400">
                                {listing.formattedAddress}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <ListingPagination />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
