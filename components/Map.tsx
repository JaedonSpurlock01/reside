"use client";

import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Map, { Marker, Layer, Source, MapMouseEvent, Popup } from "react-map-gl";
import { stateCenter, stateCodes, stateName } from "@/lib/stateConversion";
import "mapbox-gl/dist/mapbox-gl.css"; // For some reason mapbox doesn't handle attribution/children attributes
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { RentCastListing } from "@/types/RentCastListing";

// Define your mapbox access token
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiamFlZG9uMDEiLCJhIjoiY2x0eXlodHVjMGlhejJrczNpaHBxNXJhMiJ9.RNn_iXR_1qqPXVoU6FYDEw";

type ResideMapProps = {
  setSelectedCity: Dispatch<SetStateAction<any>>;
  selectedStateCode: string | null;
  setSelectedStateCode: Dispatch<SetStateAction<string | null>>;
  viewport: any;
  setViewport: Dispatch<SetStateAction<any>>;
  listings?: RentCastListing[];
};

export default function ResideMap({
  viewport,
  setViewport,
  setSelectedCity,
  selectedStateCode,
  setSelectedStateCode,
  listings,
}: ResideMapProps) {
  const mapRef = useRef<any>();
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [hoveredPolygonId, setHoveredPolygonId] = useState<string | null>(null);

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
  };

  const handleMouseClick = (e: MapMouseEvent) => {
    if (!mapReady) return;

    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ["state-fills"],
    });

    if (features <= 0) {
      return;
    }

    const stateCode: string =
      stateCodes[features[0].properties.STATE_NAME.toLowerCase()];

    // TO-DO FOR SOME REASON, ROUTER.PUSH IS BEING BLOCKED UNTIL ANIMATION FINISHES
    // mapRef.current?.flyTo({
    //   center: [stateCenter[stateCode][1], stateCenter[stateCode][0]],
    //   duration: 2000,
    //   zoom: 6,
    // });

    setSelectedStateCode(stateCode);

    const cityFeatures = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["city-fills"],
    });

    let newCity = null;

    if (cityFeatures && cityFeatures.length > 0) {
      newCity = cityFeatures[0].properties.NAMELSAD.replace(" city", "");
      setSelectedCity(newCity);
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

    // TO-DO FOR SOME REASON, ROUTER.PUSH IS BEING BLOCKED UNTIL ANIMATION FINISHES
    // if (cityFeatures && cityFeatures.length > 0) {
    //   mapRef.current?.flyTo({
    //     center: [e.lngLat.lng, e.lngLat.lat],
    //     duration: 3000,
    //     zoom: 11,
    //   });
    // }
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

      {listings?.map((listing) => (
        <Marker
          key={listing.id}
          latitude={listing.body.latitude}
          longitude={listing.body.longitude}
        />
      ))}
    </Map>
  );
}
