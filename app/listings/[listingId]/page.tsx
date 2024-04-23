"use server";

import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";
import getListingById from "@/actions/getListingById";
import { Suspense } from "react";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListingClient
        listing={listing.body}
        images={listing.images}
        listingId={listing.id}
      />
    </Suspense>
  );
}
