"use client";

import { useState } from "react";
import Header from "./_components/Header";
import ResideMap from "./_components/Map";

export default function ResideHome() {
  const [mapOnly, setMapOnly] = useState<boolean>(true);

  return (
    <main className="relative w-screen h-screen bg-neutral-800 overflow-hidden">
      <Header mapOnly={mapOnly} />
      <ResideMap setMapOnly={setMapOnly} />
    </main>
  );
}
