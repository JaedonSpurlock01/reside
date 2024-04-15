"use client";

import Benefits from "@/components/landing/Benefits";
import ExampleListings from "@/components/landing/ExampleListings";
import Technologies from "@/components/landing/Technologies";
import Conflicts from "@/components/landing/Conflicts";
import ResideTeam from "@/components/landing/ResideTeam";
import ScrollingCards from "@/components/landing/ScrollingCards";
import Hero from "@/components/landing/Hero";
import { Suspense } from "react";

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full bg-neutral-800 flex flex-col items-center text-center bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(23,144,209,0.3),rgba(255,255,255,0))]">
        <Hero />

        <div className="w-full bg-neutral-800 border-t border-[#373737] flex flex-col items-center py-20">
          <ScrollingCards />
          <Conflicts />
          <Benefits />
          <ExampleListings />
          <ResideTeam />
          <Technologies />
        </div>
      </div>
    </Suspense>
  );
}
