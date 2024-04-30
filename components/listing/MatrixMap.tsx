"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Layer,
  Map,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getNearbyFacilities from "@/actions/getNearbyFacilities";
import axios from "axios";

const profile = "mapbox/driving";
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
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [popupInfo, setPopupInfo] = useState<any>(null);

  const mapRef = useRef<any>();

  useEffect(() => {
    if (!mapLoaded) return;
    mapRef.current?.resize();

    const getFacilities = async () => {
      const nearbyFacilities: any = await getNearbyFacilities({ lat, lon });

      let destinationParameters = "";
      for (let facility of nearbyFacilities.features) {
        destinationParameters +=
          facility.center[0] + "," + facility.center[1] + ";";
      }

      destinationParameters = destinationParameters.slice(
        0,
        destinationParameters.length - 2
      ); // Remove the last semicolon

      console.log("PARAMETERS: ", destinationParameters);

      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/${profile}/${lon},${lat};${destinationParameters}?geometries=geojson&access_token=${accessToken}`
        );
        console.log(response.data);
        setMatrixData(response.data);
        setGeoJsonData({
          type: "Feature",
          properties: {},
          geometry: response.data.routes[0].geometry,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFacilities();
  }, [mapLoaded, lat, lon]);

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

      {matrixData?.waypoints?.map((data: any, index: number) => (
        <Marker
          key={index}
          latitude={data.location[1]}
          longitude={data.location[0]}
          color={index === 0 ? "#4db86a" : "red"}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo({
              text: index === 0 ? "Listing Location" : "School",
              lat: data.location[1],
              lon: data.location[0],
            });
          }}
        />
      ))}

      {matrixData && (
        <>
          <Source id="route" type="geojson" data={geoJsonData} />
          <Layer
            id="route"
            type="line"
            source="route"
            layout={{
              "line-cap": "round",
              "line-join": "round",
            }}
            paint={{ "line-color": "#50a8fa", "line-width": 3 }}
          />
        </>
      )}

      {popupInfo && (
        <Popup
          anchor="bottom"
          longitude={Number(popupInfo.lon)}
          latitude={Number(popupInfo.lat)}
          onClose={() => setPopupInfo(null)}
        >
          <div className="text-bold text-base">{popupInfo.text}</div>
        </Popup>
      )}
    </Map>
  );
};

export default MatrixMap;
