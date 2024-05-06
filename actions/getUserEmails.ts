"use server";

import { RentCastListing } from "@/types/RentCastListing";
import getListingById from "./getListingById";
import { getUserById } from "@/data/user";

export const getUserEmails = async (listingId: string) => {
  const listing: RentCastListing = await getListingById({ listingId });

  let userEmails: string[] = [];

  for (const userId of listing.viewedBy) {
    const currentUser = await getUserById(userId);
    if (currentUser) {
      userEmails.push(currentUser.email as string);
    }
  }

  return userEmails;
};
