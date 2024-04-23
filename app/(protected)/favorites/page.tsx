"use server";

import React from "react";
import { getFavorites } from "@/actions/favorite";
import ListContainer from "@/components/listings/ListContainer";
import EmptyState from "@/components/EmptyState";

const FavoritesPage = async () => {
  const listings = await getFavorites();

  return (
    <div className="w-full py-12 px-10 md:px-48">
      {listings && listings.length > 0 ? (
        <ListContainer
          listings={listings}
          selectedCity="Your Favorited"
          showFilter={false}
        />
      ) : (
        <EmptyState
          title="You have no favorites!"
          subtitle="Click on the hearts on the listings to add favorites"
          className="!bg-transparent"
        />
      )}
    </div>
  );
};

export default FavoritesPage;
