"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MapMouseEvent } from "mapbox-gl";

let hoveredPolygonId: Number | null = null;

mapboxgl.accessToken =
  "pk.eyJ1IjoiamFlZG9uMDEiLCJhIjoiY2x0eXlodHVjMGlhejJrczNpaHBxNXJhMiJ9.RNn_iXR_1qqPXVoU6FYDEw";

export default function ResideMap() {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [zoom, setZoom] = useState(1);
  const [cursorStatus, setCursorStatus] = useState<boolean>(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [-97.6114, 38.8058],
      maxBounds: [
        [-133.736342, 20.521208], // Southwest coordinates of the US
        [-63.945392, 55.382808], // Northeast coordinates of the US
      ],
      zoom: zoom,
      attributionControl: false,
    });

    map.current.on("move", () => {
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      map.current.addSource("states", {
        type: "geojson",
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson",
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      map.current.addLayer({
        id: "state-fills",
        type: "fill",
        source: "states",
        layout: {},
        paint: {
          "fill-color": "#627BC1",
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            1,
            0.15,
          ],
        },
      });

      map.current.addLayer({
        id: "state-borders",
        type: "line",
        source: "states",
        layout: {},
        paint: {
          "line-color": "#627BC1",
          "line-width": 2,
        },
      });

      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      map.current.on("mousemove", "state-fills", (e: MapMouseEvent) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["state-fills"],
        });

        if (hoveredPolygonId !== null) {
          map.current.setFeatureState(
            { source: "states", id: hoveredPolygonId },
            { hover: false }
          );
        }

        if (features.length > 0) {
          hoveredPolygonId = features[0].id;
          setCursorStatus(true);
          map.current.setFeatureState(
            { source: "states", id: features[0].id },
            { hover: true }
          );
        } else {
          setCursorStatus(false);
        }
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.current.on("mouseleave", "state-fills", () => {
        if (hoveredPolygonId !== null) {
          map.current.setFeatureState(
            { source: "states", id: hoveredPolygonId },
            { hover: false }
          );
        }
        hoveredPolygonId = null;
        setCursorStatus(false);
      });
    });
  }, []);

  return (
    <div className="h-screen">
      <div
        ref={mapContainer}
        className="h-full"
        style={{ cursor: cursorStatus ? "pointer" : "" }}
      />
    </div>
  );
}
