"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Button } from "../ui/button";
import { IoMdPerson } from "react-icons/io";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import Seperator from "../Seperator";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * index },
  }),
};

interface ListingInterestProps {
  images?: string[];
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  address: string;
  listingId: string;
}

const emails = Array.from({ length: 50 }).map((_) => "test@gmail.com");

const ListingInterest: React.FC<ListingInterestProps> = ({
  images = [],
  price = 0,
  bedrooms = 1,
  bathrooms = 1,
  squareFootage = 0,
  address = "No Address",
  listingId,
}) => {
  return (
    <motion.li
      className="relative list-item shadow-lg rounded-xl w-full"
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="h-full bg-[#3a3838] rounded-lg p-2 flex flex-row items-center gap-3">
        <div className="min-h-full hidden lg:block">
          <a href={`/listings/${listingId}`} target="_blank">
            <Image
              src={images[0]}
              alt="Roommate Listing"
              width={200}
              height={100}
              className="rounded-lg"
            />
          </a>
        </div>
        <div className="p-2 pb-4 truncate">
          <div>
            <span className="font-bold text-2xl text-neutral-300">
              ${price.toLocaleString()}/mo
            </span>
          </div>
          <div className="text-neutral-400 text-xl">
            {bedrooms} bds | {bathrooms} ba | {squareFootage.toLocaleString()}{" "}
            sqft
          </div>
          <div className="text-neutral-400 truncate text-xl">{address}</div>
        </div>
        <div className="ml-auto relative mr-2">
          <div className="flex flex-col gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex flex-row gap-2 items-center justify-center text-white font-bold text-2xl bg-neutral-800 rounded-lg p-1 py-6">
                  <IoMdPerson size={30} /> 20
                </Button>
              </PopoverTrigger>
              <PopoverContent className="gap-4 bg-neutral-700 border-0 overflow-y-scroll h-[300px]">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none text-neutral-100">
                    Potential Roommates
                  </h4>
                  <p className="text-sm text-neutral-400">
                    Other students currently interested for roommates at this
                    listing.
                  </p>
                </div>
                <ScrollArea>
                  <div className="py-4">
                    <h4 className="mb-4 text-sm font-medium leading-none text-neutral-100">
                      Emails
                    </h4>
                    {emails.map((email) => (
                      <>
                        <div key={email} className="text-sm text-neutral-400">
                          {email}
                        </div>
                        <Seperator className="my-2 bg-transparent" />
                      </>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto bg-destructive hover:bg-destructive/80">
                  Unsubscribe
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-neutral-700 border-0">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-neutral-100">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-neutral-400">
                    This action cannot be undone. This will remove the listing
                    from your roommate searches.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-[#4189e8] hover:bg-[#4189e8]/70 text-white border-0 hover:text-neutral-300">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive hover:bg-destructive/80 hover:text-neutral-300">
                    Unsubscribe
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default ListingInterest;
