"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import SettingsForm from "./SettingsForm";

const SettingsCard = () => {
  const router = useRouter();

  return (
    <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-40 mx-auto max-w-[50rem] h-auto lg:h-auto md:h-auto md:max-w-[600px]">
      <div
        className="transition h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative
              flex flex-col w-full bg-neutral-700 outline-none focus:outline-none "
      >
        {/* HEADER */}
        <div className="flex items-center p-6 rounded-t justify-center border-[#525252] relative border-b-[1px]">
          <div className="text-lg font-semibold text-neutral-200 flex flex-row items-center gap-2">
            <IoMdSettings size={20} /> Settings
          </div>
        </div>

        {/* BODY */}
        <div className="relative p-6 flex-auto">
          <SettingsForm />
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;
