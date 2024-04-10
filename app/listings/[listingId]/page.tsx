"use server";

import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/listing/ListingClient";
import getListingById from "@/actions/getListingById";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing.body} images={listing.images} />;
}
