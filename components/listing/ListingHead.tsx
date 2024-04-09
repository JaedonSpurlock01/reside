import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../listings/HeartButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  city: string;
  state: string;
  zipCode?: number;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  city,
  state,
  zipCode,
}) => {
  return (
    <>
      <Heading
        title={title}
        subtitle={`${city}, ${state}${zipCode ? `, ${zipCode}` : ""}`}
        className="text-neutral-300"
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
