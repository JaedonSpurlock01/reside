"use client";

import React, { useRef, useState, useEffect } from "react";
import Map, { Marker, Layer, Source, MapMouseEvent, Popup } from "react-map-gl";
import { stateCenter, stateCodes } from "@/public/stateConversion";
import "mapbox-gl/dist/mapbox-gl.css"; // For some reason mapbox doesn't handle attribution/children attributes
import ListContainer from "./Listings/ListContainer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// Define your mapbox access token
const MAPBOX_TOKEN = "";

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
  const [mapDraggable, setMapDraggable] = useState<boolean>(true);

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
      setMapDraggable(true);
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
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
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
              dragPan={mapDraggable}
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
          </ResizablePanel>
          {selectedCity && (
            <>
              <ResizableHandle
                className="bg-transparent"
                onChange={() => {
                  setMapDraggable(false);
                }}
                onDragEnd={() => setMapDraggable(true)}
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
                  className="p-5 bg-neutral-800 mt-20"
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>

        {!selectedCity && showPopup && (
          <div className="absolute top-[6rem] left-2 w-72 p-3 backdrop-filter backdrop-blur-[1rem] font-light rounded-lg text-lg">
            <h1 className=" text-neutral-100">CITY: {hoveredCity?.name}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
