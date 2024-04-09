"use client";

import Image from "next/image";
import Footer from "../../../components/listings/Footer";

import { rentcastTestData } from "@/lib/data";
import { usePathname } from "next/navigation";
import Seperator from "@/components/Seperator";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";

export default function ResideHome() {
  const pathname = decodeURIComponent(usePathname());
  const queries: Array<string> = pathname.split("/");
  const address = queries[2];
  let selectedListing = null;

  for (const listing of rentcastTestData) {
    if (listing.formattedAddress == address) {
      selectedListing = listing;
    }
  }

  if (!selectedListing) {
    return <EmptyState />;
  }

  return <ListingClient listing={selectedListing} />;
}
