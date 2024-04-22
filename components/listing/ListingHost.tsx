import React from "react";
import Avatar from "../navbar/Avatar";
import Seperator from "../Seperator";
import Heading from "../Heading";
import Button from "../modals/Button";
import { TiGlobeOutline } from "react-icons/ti";
import { GiStaticGuard } from "react-icons/gi";
import { MdLanguage } from "react-icons/md";
import { TbStarFilled } from "react-icons/tb";
import { HoverBorderGradient } from "../HoverBorderGradient";

interface ListingHostProps {
  imageSrc?: string;
  hostName: string;
  reviews: number;
  rating: number;
  hostSpan: number;
  location: string;
  description: string;
  heading?: boolean;
}

const ListingHost: React.FC<ListingHostProps> = ({
  imageSrc,
  hostName,
  reviews,
  rating,
  hostSpan,
  location,
  description,
  heading = true,
}) => {
  return (
    <div className="text-lg text-neutral-300 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {heading && (
        <span className="col-span-1 sm:col-span-2">
          <Heading title="Meet your hosts" />
        </span>
      )}

      <div className="-mt-8 col-span-1 flex flex-col justify-center">
        <HoverBorderGradient
          containerClassName="rounded-xl w-full"
          className="bg-neutral-700 shadow-2xl w-full"
        >
          <div className="py-2 sm:py-4 justify-between flex flex-row items-center flex-wrap">
            <div className="text-center font-bold text-2xl mx-auto md:ml-auto">
              <Avatar size={100} imageSrc={imageSrc} />
              <span>{hostName}</span>
            </div>
            <div className="md:mx-auto hidden md:block !text-left">
              <div className="flex flex-col gap-2">
                <span className="font-bold">{reviews}</span>
                <span className="font-light text-neutral-400">Reviews</span>
                <Seperator className="bg-neutral-500" />
                <span className="font-bold flex flex-row items-center gap-1">
                  {rating} <TbStarFilled />
                </span>
                <span className="font-light text-neutral-400">Rating</span>
                <Seperator className="bg-neutral-500" />
                <span className="font-bold">{hostSpan}</span>
                <span className="font-light text-neutral-400">
                  Years hosting
                </span>
              </div>
            </div>
          </div>
        </HoverBorderGradient>

        <div className="flex flex-row items-center text-xl font-light gap-2 py-2 mt-8">
          <MdLanguage /> Speaks English
        </div>
        <div className="flex flex-row items-center text-xl font-light gap-2 py-2">
          <TiGlobeOutline /> Located in {location}
        </div>
      </div>

      <div className="col-span-1 space-y-8 -mt-8">
        <Heading title="Host details" className="hidden sm:block" />
        <p className="font-semibold text-neutral-400 hidden sm:block">
          {description}
        </p>

        <Button label="Message Host" onClick={() => {}} />

        <Seperator />

        <div className="sm:flex sm:flex-row items-center justify-between gap-2 text-neutral-400 hidden">
          <GiStaticGuard size={100} />
          <p>
            To protect your payment, never transfer money or communicate outside
            of the Reside website or app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingHost;
