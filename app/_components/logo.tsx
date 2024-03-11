import React from "react";

import { BsHouseDoorFill } from "react-icons/bs";

export default function ResideLogo() {
  return (
    <h1 className="text-5xl md:text-6xl font-bold flex flex-row mb-8">
      RESI
      <span className="mt-[0.3rem] text-[3.1rem]">
        <BsHouseDoorFill />
      </span>
      E
    </h1>
  );
}
