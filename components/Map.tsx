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

// Define your mapbox access token
const MAPBOX_TOKEN = "";

type ResideMapProps = {
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  setSelectedCity: Dispatch<SetStateAction<any>>;
  setHoveredCity: Dispatch<SetStateAction<any>>;
  loadingRentals: boolean;
  setLoadingRentals: Dispatch<SetStateAction<boolean>>;
  mapDraggable: boolean;
  setMapDraggable: Dispatch<SetStateAction<boolean>>;
  selectedStateCode: string | null;
  setSelectedStateCode: Dispatch<SetStateAction<string | null>>;
  viewport: any;
  setViewport: Dispatch<SetStateAction<any>>;
};

export default function ResideMap({
  viewport,
  setViewport,
  loadingRentals,
  setLoadingRentals,
  setShowPopup,
  setSelectedCity,
  setHoveredCity,
  mapDraggable,
  setMapDraggable,
  selectedStateCode,
  setSelectedStateCode,
}: ResideMapProps) {
  const mapRef = useRef<any>();
  const [hoveredPolygonId, setHoveredPolygonId] = useState<
    string | number | null
  >(null);
  const [mapReady, setMapReady] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      if (name === "state") {
        params.delete("city");
      }

      return params.toString();
    },
    [searchParams]
  );

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
    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ["state-fills"],
    });
    if (features <= 0) {
      router.push(pathname);
      setSelectedStateCode(null);
      setSelectedCity(null);
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

    router.push(
      pathname + "?" + createQueryString("state", stateName[stateCode])
    );

    const cityFeatures = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["city-fills"],
    });

    if (cityFeatures && cityFeatures.length > 0) {
      setSelectedCity(cityFeatures[0].properties.NAMELSAD);
      setLoadingRentals(true);
      mapRef.current?.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        duration: 3000,
        zoom: 11,
      });
      router.push(
        pathname +
          "?" +
          createQueryString("city", cityFeatures[0].properties.NAMELSAD)
      );
    } else {
      setMapDraggable(true);
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
