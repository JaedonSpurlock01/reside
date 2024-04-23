import useLoginModal from "./useLoginModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import toast from "react-hot-toast";
import { addFavorite, removeFavorite } from "@/actions/favorite";

interface IUseFavorite {
  listingId: string;
}

const useFavorite = ({ listingId }: IUseFavorite) => {
  const loginModal = useLoginModal();
  const user = useCurrentUser();

  const [hasFavorited, setHasFavorited] = useState<boolean>(
    useMemo(() => {
      const list = user?.favListingIds || [];
      return list.includes(listingId);
    }, [user, listingId])
  );

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!user) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorited) {
          toast.promise(
            removeFavorite(listingId),
            {
              loading: "Removing...",
              success: "Removed favorited listing!",
              error: "Could not remove.",
            },
            {
              style: {
                minWidth: "200px",
                background: "#404040",
                color: "#fff",
              },
              position: "bottom-right",
            }
          );
        } else {
          toast.promise(
            addFavorite(listingId),
            {
              loading: "Saving...",
              success: "Listing favorited!",
              error: "Could not add favorite.",
            },
            {
              style: {
                minWidth: "200px",
                background: "#404040",
                color: "#fff",
              },
              position: "bottom-right",
            }
          );
        }
        // Toggle the hasFavorited state after successfully adding/removing the favorite
        setHasFavorited((prev) => !prev);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [user, hasFavorited, listingId, loginModal]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
