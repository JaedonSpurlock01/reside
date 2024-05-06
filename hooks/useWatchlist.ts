"use client";

import useLoginModal from "./useLoginModal";
import { useCallback, useMemo, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import toast from "react-hot-toast";
import { addToWatchlist, removeFromWatchlist } from "@/actions/watchlist";

interface IUseWatchlist {
  listingId: string;
}

const useWatchlist = ({ listingId }: IUseWatchlist) => {
  const loginModal = useLoginModal();
  const user = useCurrentUser();

  const [inWatchlist, setInWatchlist] = useState<boolean>(
    useMemo(() => {
      const list = user?.watchlist || [];
      return list.includes(listingId);
    }, [user, listingId])
  );

  const toggleWatchlist = useCallback(
    async (
      e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
    ) => {
      e.stopPropagation();

      if (!user) {
        return loginModal.onOpen();
      }

      try {
        if (inWatchlist) {
          toast.promise(
            removeFromWatchlist(listingId),
            {
              loading: "Removing...",
              success: "Removed from watchlist!",
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
            addToWatchlist(listingId),
            {
              loading: "Saving...",
              success: "Listing added to watchlist!",
              error: "Could not add to watchlist.",
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
        // Toggle the inWatchlist state after successfully adding/removing listing to watchlist
        setInWatchlist((prev) => !prev);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [user, inWatchlist, listingId, loginModal]
  );

  return { inWatchlist, toggleWatchlist };
};

export default useWatchlist;
