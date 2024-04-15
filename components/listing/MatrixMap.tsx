"use client";

import React, { useEffect, useRef, useState } from "react";
import { Layer, Map, Marker, NavigationControl, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getNearbyFacilities from "@/actions/getNearbyFacilities";
import axios from "axios";

const profile = "mapbox/driving-traffic";
const accessToken =
  "pk.eyJ1IjoiamFlZG9uMDEiLCJhIjoiY2x0eXlodHVjMGlhejJrczNpaHBxNXJhMiJ9.RNn_iXR_1qqPXVoU6FYDEw";

interface MatrixMapProps {
  lat?: number;
  lon?: number;
}

const MatrixMap: React.FC<MatrixMapProps> = ({ lat = 45, lon = 100 }) => {
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
  const [matrixData, setMatrixData] = useState<any>(null);
  const mapRef = useRef<any>();

  useEffect(() => {
    if (!mapLoaded) return;
    mapRef.current?.resize();

    const getFacilities = async () => {
      const nearbyFacilities: any = await getNearbyFacilities({ lat, lon });

      console.log("DATA: ", nearbyFacilities);

      setMatrixData(nearbyFacilities);
      return;
      let destinationParameters = "";

      console.log("Found POIs, gathering traffic data...", nearbyFacilities);

      for (let facility of nearbyFacilities) {
        destinationParameters +=
          facility.center[0] + "," + facility.center[1] + ";";
      }

      destinationParameters = destinationParameters.slice(
        0,
        destinationParameters.length - 2
      ); // Remove the last semicolon

      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions-matrix/v1/${profile}/${lon},${lat};${destinationParameters}?sources=1&annotations=distance,duration&access_token=${accessToken}`
        );
        console.log(response);
        console.log(response.data);
        setMatrixData(response.data.destinations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFacilities();
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
      mapboxAccessToken={accessToken}
      mapStyle="mapbox://styles/mapbox/navigation-night-v1"
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
      {matrixData?.features?.map((data: any) => (
        <Marker latitude={data.center[1]} longitude={data.center[0]} />
      ))}
    </Map>
  );
};

export default MatrixMap;
