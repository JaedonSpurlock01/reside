import React, { Dispatch, SetStateAction } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ShowPriceButton({
  setShowChangeBB,
  setShowChangePrice,
  showChangePrice,
  className,
}: {
  showChangePrice: boolean;
  setShowChangeBB: Dispatch<SetStateAction<boolean>>;
  setShowChangePrice: Dispatch<SetStateAction<boolean>>;
  className: string;
}) {
  return (
    <button
      className={className}
      onClick={() => {
        setShowChangePrice(!showChangePrice);
        setShowChangeBB(false);
      }}
    >
      <h1 className="absolute left-2 top-1/2 transform -translate-y-1/2">
        Price
      </h1>

      <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
        {!showChangePrice ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </span>
    </button>
  );
}
