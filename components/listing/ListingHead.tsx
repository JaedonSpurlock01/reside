import React from "react";
import Heading from "../Heading";
import HeartButton from "../listings/HeartButton";
import { LayoutGrid } from "../LayoutGrid";
import { PiDotsNineBold } from "react-icons/pi";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

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
  listingId?: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  images,
  city,
  state,
  zipCode,
  listingId,
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
          <HeartButton listingId={listingId as string} />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"group"}
              className="absolute bottom-5 bg-neutral-700 text-white rounded-xl right-5 z-[999] flex flex-row items-center"
            >
              <PiDotsNineBold size={25} /> Show all {images.length} photos
            </Button>
          </DialogTrigger>

          <DialogContent className="overflow-y-auto h-3/4 bg-neutral-700 border-[#202020] text-neutral-300">
            <DialogTitle className="font-bold text-2xl">All photos</DialogTitle>
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Listing image"
                width={1920}
                height={1080}
                className="w-full rounded-lg"
              />
            ))}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ListingHead;
