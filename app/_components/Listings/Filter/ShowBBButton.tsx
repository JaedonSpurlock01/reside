import React, { Dispatch, SetStateAction } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ShowBBButton({
  showChangeBB,
  setShowChangeBB,
  setShowChangePrice,
  className,
}: {
  showChangeBB: boolean;
  setShowChangeBB: Dispatch<SetStateAction<boolean>>;
  setShowChangePrice: Dispatch<SetStateAction<boolean>>;
  className: string;
}) {
  return (
    <button
      onClick={() => {
        setShowChangeBB(!showChangeBB);
        setShowChangePrice(false);
      }}
      className={className}
    >
      <h1 className="absolute left-2 top-1/2 transform -translate-y-1/2">
        Beds/baths
      </h1>
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {!showChangeBB ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </span>
    </button>
  );
}
