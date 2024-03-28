"use client";

import { useState } from "react";
import Header from "../_components/header";
import ResideMap from "../_components/map";

export default function ResideHome() {
  const [mapOnly, setMapOnly] = useState<boolean>(true);

  return (
    <main className="relative w-screen h-screen bg-neutral-800">
      <Header mapOnly={mapOnly} />
      <ResideMap setMapOnly={setMapOnly} />
    </main>
  );
}
