"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import Heading from "../Heading";
import { testRentCastListings } from "@/test/listings/data";
import Grid from "../listings/Grid";

export default function ExampleListings() {
  const { ref } = useInView({
    threshold: 0.5,
  });

  return (
    <section
      ref={ref}
      className="mb-40 flex flex-col items-center w-full px-4 sm:px-0 sm:w-3/4 xl:w-1/2"
    >
      <Heading title="Sample Listings" className="text-neutral-300 mb-8" />
      <div className="w-full text-left">
        <Grid
          listings={testRentCastListings}
          showFullscren={false}
          showNav={false}
        />
      </div>
    </section>
  );
}
