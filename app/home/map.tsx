"use client";

import React, { useRef, useState, useEffect } from "react";
import Map, { Marker, Layer, Source, MapMouseEvent, Popup } from "react-map-gl";
import { stateCenter, stateCodes } from "@/public/stateConversion";
import "mapbox-gl/dist/mapbox-gl.css"; // For some reason mapbox doesn't handle attribution/children attributes
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

// Define your mapbox access token
const MAPBOX_TOKEN = "API KEY";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * index },
  }),
};

export default function ResideMap() {
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
      mapRef.current?.flyTo({
        // Move the camera to the left when clicked so it stays center
        center: [e.lngLat.lng, e.lngLat.lat],
        duration: 800,
        zoom: 12,
      });
    } else {
      setLoadingRentals(false);
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
      {selectedCity && (
        <>
          <div className="w-screen h-[2.5rem] transition-all duration-1000" />
          <div className="w-screen flex flex-row space-x-3 text-center border-y border-black transition-all duration-1000 pl-3">
            <div className="border border-black w-60 p-2 h-3/4 rounded-md my-1 text-left overflow-hidden">
              <input
                type="text"
                placeholder={selectedCity}
                className="bg-transparent"
              />
            </div>
            <div className="border border-black w-20 p-2 h-3/4 rounded-md  my-1">
              Price
            </div>
            <div className="border border-black w-40 p-2 h-3/4 rounded-md  my-1">
              Beds & Baths
            </div>
            <div className="bg-green-600 p-2 w-36 h-3/4 rounded-md text-white  my-1">
              Apply Filter
            </div>
          </div>
        </>
      )}
      <div className="relative w-full h-full flex flex-row">
        <div
          className="transition-all duration-1000 h-full"
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
            mapStyle="mapbox://styles/mapbox/dark-v10"
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
                    "fill-color": "#ffffff",
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
                    "line-color": "#b5b5b5",
                    "line-width": 1,
                  }}
                />
              </Source>
            )}
          </Map>
        </div>
        {showPopup && (
          <div className="absolute top-10 left-2 w-72 p-3 bg-neutral-800 rounded-lg text-xs">
            <h1 className=" text-neutral-100">CITY: {hoveredCity.name}</h1>
          </div>
        )}
        {selectedCity && (
          <>
            <div className="w-[40%] h-full p-5 overflow-y-scroll">
              <div className="h-full">
                <h1 className="relative font-bold overflow-hidden text-lg text-[#2a2a33]">
                  {selectedCity} {selectedStateCode?.toUpperCase()} Rental
                  Listings
                </h1>
                <div className="flex flex-row">
                  <p className="font-medium text-[#2f2f34]">100 results</p>
                  <button className="ml-auto text-blue-400">
                    Sort: Recommended
                  </button>
                </div>
                {loadingRentals && (
                  <div className="flex flex-col items-center justify-center mt-10">
                    <CircularProgress
                      size={20}
                      thickness={5}
                      color={"inherit"}
                    />
                  </div>
                )}
                {!loadingRentals && (
                  <ul className="mt-4 grid gap-[8px] grid-cols-auto-fill min-w-[286px] grid-flow-row">
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
                        className="relative borderBlack min-h-[265px] list-item border border-[#d1d1d5] shadow-lg rounded-md"
                        key={index}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        custom={index}
                      >
                        <div className="h-full">
                          <div>
                            <picture>
                              <source
                                srcSet="/example_apartment.jpg"
                                type="image/jpg"
                              ></source>
                              <img
                                src="/example_apartment.jpg"
                                alt="HOUSE"
                                className="object-cover w-full min-h-full rounded-t-md"
                              ></img>
                            </picture>
                          </div>
                          <div className="bg-neutral-100 rounded-b-md p-2 pb-4">
                            <div>
                              <span className="font-bold text-xl text-[#2a2a33]">
                                $2,729/mo
                              </span>
                            </div>
                            <div>3 bds | 2 ba | 1,344 sqft - Home for sale</div>
                            <div>
                              3340 This Random Blvd, San Marcos, CA 92024
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
