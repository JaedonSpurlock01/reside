import React from "react";
import Search from "../Search";

const Hero = () => {
  return (
    <>
      <h1 className="text-neutral-100 text-5xl mt-48 font-bold">
        Solve your student housing{" "}
        <span className="font-bold text-cyan-500">problems</span>
      </h1>
      <p className="text-neutral-400 text-2xl mt-6 mb-16">
        Take control of affordable college housing
      </p>

      <Search
        className="w-[30rem] text-white rounded-lg py-3 !bg-neutral-800 mb-32 relative z-[999]"
        resultsClassName="!top-20 !w-[30rem] text-left !bg-neutral-800"
      />
    </>
  );
};

export default Hero;
