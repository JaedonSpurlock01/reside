"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import getListingById from "./getListingById";
import { RentCastListing } from "@/types/RentCastListing";

export const getFavorites = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) return null;

  const data = await db.user.findFirst({
    where: { id: user.id },
    select: {
      favListingIds: true,
    },
  });

  let favListings: RentCastListing[] = [];

  for (const listingId of data?.favListingIds || []) {
    const newListing: RentCastListing = await getListingById({ listingId });
    favListings.push(newListing);
  }

  return favListings;
};

export const getFavorite = async (listingId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) return null;

  const listingFound = db.user.findFirst({
    where: { id: user.id, favListingIds: { hasEvery: [listingId] } },
  });

  console.log("LISTING FOUND?", listingFound);

  return listingFound;
};

export const addFavorite = async (listingId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) return;

  console.log("ADDING FAVORITE FOR USER ", user.id, " ON LISTING ", listingId);

  let favoriteIds = [...(user.favListingIds || [])];
  favoriteIds.push(listingId);
  await db.user.update({
    where: { id: user.id },
    data: { favListingIds: favoriteIds },
  });

  return {
    success:
      "Listing favorited! You are now listening for potential roommates!",
  };
};

export const removeFavorite = async (listingId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !session) return;

  console.log("REMOVING FAV FOR USER ", user.id, " ON LISTING ", listingId);

  let favoriteIds = [...(user.favListingIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);
  await db.user.update({
    where: { id: user.id },
    data: { favListingIds: favoriteIds },
  });

  return { success: "Removed from favorites!" };
};
