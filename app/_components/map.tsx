"use client";

import React, { useRef, useState, useEffect } from "react";
import Map, { Marker, Layer, Source, MapMouseEvent, Popup } from "react-map-gl";
import { stateCenter, stateCodes } from "@/public/stateConversion";
import "mapbox-gl/dist/mapbox-gl.css"; // For some reason mapbox doesn't handle attribution/children attributes
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

// Define your mapbox access token
const MAPBOX_TOKEN =
  "APIO";

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
          <div className="p-5 w-[40%] overflow-y-scroll bg-neutral-800 no-scrollbar mt-20">
            <div>
              <h1 className="relative font-bold overflow-hidden text-lg text-[#f7f7f7]">
                {selectedCity} {selectedStateCode?.toUpperCase()} Rental
                Listings
              </h1>

              <div className="w-full h-20 flex flex-row flex-wrap text-white space-x-2 items-center text-center">
                <div className="rounded-lg bg-[#3a3838] w-24 h-12 relative">
                  <h1 className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    Price
                  </h1>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <IoIosArrowDown />
                  </span>
                </div>
                <div className="rounded-lg bg-[#3a3838] w-36 h-12 pl-2 relative">
                  <h1 className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    Beds/baths
                  </h1>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <IoIosArrowDown />
                  </span>
                </div>
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
                <ul className="mt-4 grid gap-[12px] grid-cols-auto-fill min-w-[286px] grid-flow-row">
                  {[
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                    "House",
                  ].map((house, index) => (
                    <motion.li
                      className="relative min-h-[265px] list-item shadow-lg rounded-xl hover:border hover:border-white"
                      key={index}
                      variants={fadeInAnimationVariants}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      custom={index}
                    >
                      <Link href="/listing">
                        <div className="h-full bg-[#3a3838] rounded-xl p-2 hover:cursor-pointer">
                          <div>
                            <Image
                              src="/example_apartment.jpg"
                              alt="HOUSE"
                              className="object-cover w-full min-h-full rounded-xl"
                              width={1024}
                              height={576}
                            ></Image>
                          </div>
                          <div className="p-2 pb-4 ">
                            <div>
                              <span className="font-bold text-xl text-neutral-300">
                                $2,729/mo
                              </span>
                            </div>
                            <div className="text-neutral-400">
                              3 bds | 2 ba | 1,344 sqft
                            </div>
                            <div className="text-neutral-400">
                              3340 Random Blvd, San Marcos, CA 92024
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
