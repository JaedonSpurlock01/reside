import React from "react";
import Heading from "../Heading";
import HeartButton from "../listings/HeartButton";
import { LayoutGrid } from "../LayoutGrid";
import { PiDotsNineBold } from "react-icons/pi";
import { Button } from "../ui/button";

const createImageCards = (images: string[]) => {
  let imageCards = [];
  for (let i = 0; i < images.length; i++) {
    imageCards.push({
      id: i + 1,
      content: null,
      className: "",
      thumbnail: images[i],
    });
  }

  if (imageCards.length > 0) {
    imageCards[0].className = "md:col-span-3 md:row-span-2";
  }

  if (imageCards.length > 1) {
    imageCards[1].className = "hidden md:block md:col-span-1";
  } else {
    imageCards[0].className = "col-span-4 row-span-2";
  }

  if (imageCards.length > 2) {
    imageCards[2].className = "hidden md:block col-span-1";
  }

  return imageCards;
};

interface ListingHeadProps {
  title: string;
  images: string[];
  city: string;
  state: string;
  zipCode?: number;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  images,
  city,
  state,
  zipCode,
}) => {
  const listingImages = createImageCards(images);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${city}, ${state}${zipCode ? `, ${zipCode}` : ""}`}
        className="text-neutral-300"
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <LayoutGrid cards={listingImages} />

        <div className="absolute top-5 right-5">
          <HeartButton />
        </div>

        <div className="absolute bottom-5 bg-neutral-700 text-white rounded-xl right-5 z-[999] flex flex-row items-center">
          <Button variant={"group"}>
            <PiDotsNineBold size={25} /> Show all {images.length} photos
          </Button>
        </div>
      </div>
    </>
  );
};

export default ListingHead;
