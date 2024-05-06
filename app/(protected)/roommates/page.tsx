"use server";

import React from "react";
import EmptyState from "@/components/EmptyState";
import RoommateListContainer from "@/components/roommates/RoommateListContainer";
import { getWatchlist } from "@/actions/watchlist";

const RoomatesPage = async () => {
  const listings = await getWatchlist();

  return (
    <div className="w-full py-12 px-10 md:px-48">
      {listings && listings.length > 0 ? (
        <RoommateListContainer listings={listings} title="Roommate Watchlist" />
      ) : (
        <EmptyState
          title="You have no listings to look for roommates!"
          subtitle="Click on the hearts on the listings to add favorites"
          className="!bg-transparent"
        />
      )}
    </div>
  );
};

export default RoomatesPage;
