import React, { useState } from "react";
import ShowPriceButton from "./ShowPriceButton";
import ShowBBButton from "./ShowBBButton";
import BBFilter from "./PriceFilter";
import { IoIosArrowDown } from "react-icons/io";
import PriceFilter from "./BBFilter";

export default function FilterHeader() {
  const [showChangePrice, setShowChangePrice] = useState<boolean>(false);
  const [showChangeBB, setShowChangeBB] = useState<boolean>(false);
  return (
    <div>
      <div className="relative w-full h-20 flex flex-row flex-wrap text-white space-x-2 items-center text-center">
        <ShowPriceButton
          showChangePrice={showChangePrice}
          setShowChangeBB={setShowChangeBB}
          setShowChangePrice={setShowChangePrice}
          className="rounded-lg bg-[#3a3838] w-24 h-12 relative"
        />

        {showChangePrice && (
          <PriceFilter className="-left-2 absolute z-50 top-20 w-[400px] bg-[#3a3838] text-white" />
        )}

        <ShowBBButton
          showChangeBB={showChangeBB}
          setShowChangeBB={setShowChangeBB}
          setShowChangePrice={setShowChangePrice}
          className="rounded-lg bg-[#3a3838] w-36 h-12 pl-2 relative"
        />

        {showChangeBB && (
          <BBFilter className="absolute w-[440px] z-50 top-20 left-24 bg-[#3a3838] text-white" />
        )}
      </div>

      <div className="flex flex-row">
        <p className="font-medium text-[#c8c8c8]">100 results</p>
        <button className="ml-auto text-blue-400 flex flex-row items-center">
          Sort: Recommended <IoIosArrowDown />
        </button>
      </div>
    </div>
  );
}
