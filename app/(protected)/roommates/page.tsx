"use server";

import React from "react";
import { getFavorites } from "@/actions/favorite";
import EmptyState from "@/components/EmptyState";
import RoommateListContainer from "@/components/roommates/RoommateListContainer";

const RoomatesPage = async () => {
  const listings = await getFavorites();

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
