import React from "react";
import { TiGlobeOutline } from "react-icons/ti";
import { MdLanguage } from "react-icons/md";
import { BsSuitcaseLg } from "react-icons/bs";
import { HoverBorderGradient } from "./HoverBorderGradient";
import Avatar from "./navbar/Avatar";

interface AvatarCardProps {
  imageSrc?: string;
  hostName: string;
  location: string;
  language: string;
  role: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  imageSrc,
  hostName,
  location,
  language,
  role,
}) => {
  return (
    <div className="text-lg text-neutral-300 flex flex-col items-center">
      <div className="-mt-8 col-span-1 flex flex-col justify-center">
        <HoverBorderGradient
          containerClassName="rounded-xl w-[20rem]"
          className="bg-neutral-700 shadow-2xl w-[20rem]"
        >
          <div className="py-2 sm:py-4 justify-between flex flex-col gap-2 items-center">
            <Avatar size={100} imageSrc={imageSrc} />
            <span className="text-center font-bold text-2xl">{hostName}</span>
          </div>
        </HoverBorderGradient>

        <div className="flex flex-row items-center text-xl font-light gap-2 py-2 mt-5">
          <MdLanguage /> Speaks {language}
        </div>
        <div className="flex flex-row items-center text-xl font-light gap-2 py-2">
          <TiGlobeOutline /> Located in {location}
        </div>
        <div className="flex flex-row items-center text-xl font-light gap-2 py-2">
          <BsSuitcaseLg /> {role}
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
