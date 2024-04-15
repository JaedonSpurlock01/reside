import React from "react";
import { BiDownArrow } from "react-icons/bi";

const Conflicts = () => {
  return (
    <>
      <h1 className="text-2xl text-neutral-300 font-semibold w-full mb-10">
        Tired of not being able to{" "}
        <span className="text-cyan-500">find rentals</span>?
      </h1>
      <div className="flex flex-col">
        <div className="bg-neutral-900/50 p-4 w-[22rem] rounded-lg flex flex-col text-neutral-500 font-semibold text-lg mb-6">
          <div>
            <span className="text-rose-500">Limited</span> availability
          </div>
          <div>
            + <span className="text-rose-500">High</span> cost
          </div>
          <div>
            + <span className="text-rose-500">Low quality</span> rentals
          </div>
          <div>
            + <span className="text-rose-500">Poor</span> location
          </div>
          <div>
            + <span className="text-rose-500">No </span> roommates
          </div>
          <div>
            + <span className="text-rose-500">Lack</span> of safety
          </div>
          <div>
            + <span className="text-rose-500">∞</span> hrs of stress
          </div>
        </div>
      </div>
      <div className="flex flex-row text-neutral-400 font-semibold items-center gap-2 mb-40">
        <BiDownArrow /> There&apos;s an easier way
      </div>
    </>
  );
};

export default Conflicts;
