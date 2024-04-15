"use client";

import React, { useEffect, useRef, useState } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface LocationMapProps {
  lat?: number;
  lon?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ lat = 45, lon = 100 }) => {
  const [viewport, setViewport] = useState<any>({
    width: "100%",
    height: "100%",
    latitude: lat,
    longitude: lon,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const mapRef = useRef<any>();

  useEffect(() => {
    if (!mapLoaded) return;
    mapRef.current?.resize();
  }, [mapLoaded]);

  const handleInteraction = () => {
    setViewport((prevViewport: any) => ({
      ...prevViewport,
      bearing: 0,
    }));
  };

  return (
    <Map
      {...viewport}
      mapboxAccessToken="pk.eyJ1IjoiamFlZG9uMDEiLCJhIjoiY2x0eXlodHVjMGlhejJrczNpaHBxNXJhMiJ9.RNn_iXR_1qqPXVoU6FYDEw"
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onMove={(evt) => setViewport(evt.viewState)}
      onMouseDown={handleInteraction}
      onDragStart={handleInteraction}
      attributionControl={false}
      dragRotate={false}
      ref={mapRef}
      onLoad={() => setMapLoaded(true)}
    >
      <div style={{ position: "absolute", right: 10, top: 10 }}>
        <NavigationControl />
      </div>
      <Marker latitude={lat} longitude={lon} />
    </Map>
  );
};

export default LocationMap;
