"use client";

import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import Map, { Marker, Layer, Source, MapMouseEvent, Popup } from "react-map-gl";
import { stateCenter, stateCodes, stateName } from "@/lib/stateConversion";
import "mapbox-gl/dist/mapbox-gl.css"; // For some reason mapbox doesn't handle attribution/children attributes
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

// Define your mapbox access token
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiamFlZG9uMDEiLCJhIjoiY2x0eXlodHVjMGlhejJrczNpaHBxNXJhMiJ9.RNn_iXR_1qqPXVoU6FYDEw";

type ResideMapProps = {
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  setSelectedCity: Dispatch<SetStateAction<any>>;
  setHoveredCity: Dispatch<SetStateAction<any>>;
  selectedStateCode: string | null;
  setSelectedStateCode: Dispatch<SetStateAction<string | null>>;
  viewport: any;
  setViewport: Dispatch<SetStateAction<any>>;
  setLoadingRentals: Dispatch<SetStateAction<any>>;
  setListings: Dispatch<SetStateAction<any>>;
};

export default function ResideMap({
  viewport,
  setViewport,
  setShowPopup,
  setSelectedCity,
  setHoveredCity,
  selectedStateCode,
  setSelectedStateCode,
  setLoadingRentals,
  setListings,
}: ResideMapProps) {
  const mapRef = useRef<any>();
  const [hoveredPolygonId, setHoveredPolygonId] = useState<
    string | number | null
  >(null);
  const [mapReady, setMapReady] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleMouseLeave = (e: MapMouseEvent) => {
    if (!mapReady) return;
    if (hoveredPolygonId !== null) {
      mapRef.current?.setFeatureState(
        { source: "states", id: hoveredPolygonId },
        { hover: false }
      );
    }
    setHoveredPolygonId(null);
  };

  const handleMouseMove = (e: MapMouseEvent) => {
    if (!mapReady) return;
    const features = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["state-fills"],
    });

    if (hoveredPolygonId !== null) {
      mapRef.current?.setFeatureState(
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
    if (!mapReady) return;

    setLoadingRentals(true);
    setListings([]);

    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ["state-fills"],
    });
    if (features <= 0) {
      return;
    }
    const stateCode: string =
      stateCodes[features[0].properties.STATE_NAME.toLowerCase()];
    mapRef.current?.flyTo({
      center: [stateCenter[stateCode][1], stateCenter[stateCode][0]],
      duration: 2000,
      zoom: 6,
    });
    setSelectedStateCode(stateCode);

    const cityFeatures = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["city-fills"],
    });

    let newCity = null;

    if (cityFeatures && cityFeatures.length > 0) {
      newCity = cityFeatures[0].properties.NAMELSAD.replace(" city", "");
      setSelectedCity(newCity);
      mapRef.current?.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        duration: 3000,
        zoom: 11,
      });
    }

    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      city: newCity,
      state: stateName[stateCode],
    };

    const url = qs.stringifyUrl(
      { url: "rent/", query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  };

  useEffect(() => {
    if (mapReady) {
      mapRef.current?.resize();
    }
  }, [mapReady]);

  return (
    <Map
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      mapboxAccessToken={MAPBOX_TOKEN}
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      attributionControl={false}
      onMouseMove={handleMouseMove}
      onClick={handleMouseClick}
      onMouseLeave={handleMouseLeave}
      cursor={hoveredPolygonId ? "pointer" : "default"}
      onLoad={() => setMapReady(true)}
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
  );
}
