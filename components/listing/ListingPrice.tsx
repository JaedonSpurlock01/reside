"use client";

import React, { useEffect, useState } from "react";

import Seperator from "../Seperator";
import Button from "../modals/Button";
import TextRow from "./TextRow";
import { HoverBorderGradient } from "../HoverBorderGradient";
import { CalendarForm } from "../inputs/CalendarForm";

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
import { BsExclamationTriangle } from "react-icons/bs";
import useWatchlist from "@/hooks/useWatchlist";

interface ListingPriceProps {
  price: number;
  onSubmitLink: string;
  listingId: string;
}

const ListingPrice: React.FC<ListingPriceProps> = ({
  price,
  onSubmitLink,
  listingId,
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [monthRange, setMonthRange] = useState<number>(12);

  const { inWatchlist, toggleWatchlist } = useWatchlist({ listingId });

  useEffect(() => {
    if (!startDate || !endDate) {
      return;
    }

    const monthRange =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    setMonthRange(monthRange);
  }, [startDate, endDate]);

  return (
    <HoverBorderGradient
      containerClassName="rounded-xl p-1 sticky top-8 w-full mb-10 md:mb-0"
      className="bg-neutral-700 shadow-2xl overflow-hidden w-full"
      as="div"
    >
      <div className="flex flex-row items-end gap-1 p-4">
        <div className="text-2xl font-semibold text-neutral-100">
          $ {price?.toLocaleString()}
        </div>
        <div className="font-light text-neutral-300 mb-[1px]">month</div>
      </div>

      <div className="p-4 flex flex-row items-center text-neutral-300 font-light text-lg -my-6 mt-1">
        Estimate your cost at this rental
      </div>

      <div className="my-10 flex flex-row justify-between gap-1 px-4">
        <CalendarForm
          title="Starting month"
          label="Choose"
          date={startDate}
          onSelect={setStartDate}
        />
        <CalendarForm
          title="Ending month"
          label="Choose"
          date={endDate}
          onSelect={setEndDate}
        />
      </div>

      <Seperator className="bg-neutral-600" />

      <TextRow
        leftText={`${price?.toLocaleString()} x ${monthRange} months`}
        rightText={`$ ${(price * monthRange).toLocaleString()}`}
        leftClassName="underline text-neutral-400"
        rightClassName="text-neutral-100"
      />

      {/* <TextRow
        leftText={`Additional Fees`}
        rightText={`$ ${(205).toLocaleString()}`}
        leftClassName="underline text-neutral-400"
        rightClassName="text-neutral-100"
      /> */}

      {/* <Seperator className="bg-neutral-600" /> */}

      <div className="p-4 space-y-4">
        <a
          href={`https://www.google.com/search?q=${onSubmitLink}`}
          target="_blank"
        >
          <Button label="Visit rental" onClick={() => {}} />
        </a>

        {!inWatchlist ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button label="Add to roommate search" onClick={() => {}} />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-neutral-700 border-0">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-neutral-100">
                  Add to roommate watchlist?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-neutral-400">
                  <p>
                    Adding this to your watchlist means that you will be on a
                    emailing list with other students who are interested in the
                    same listing.
                  </p>
                  <br />
                  <p className="text-destructive flex flex-row gap-2 items-center justify-center">
                    <BsExclamationTriangle size={30} /> If you do not wish to
                    recieve emails, please cancel this action or go to your
                    settings and disable emails
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-neutral-500 hover:bg-neutral-600 text-white border-0 hover:text-neutral-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  asChild
                  className="bg-[#4189e8] hover:bg-[#4189e8]/70 hover:text-neutral-300"
                >
                  <Button
                    label="Subscribe"
                    className="!w-32"
                    onClick={(e) => toggleWatchlist(e)}
                  />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                label="Remove from watchlist?"
                onClick={() => {}}
                className="bg-destructive !border-0"
              />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-neutral-700 border-0">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-neutral-100">
                  Remove from watchlist?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-neutral-400">
                  <p>
                    Removing this will remove you from the emailing list
                    involving other students interested in this listing.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-neutral-500 hover:bg-neutral-600 text-white border-0 hover:text-neutral-300">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  asChild
                  className="bg-destructive hover:bg-destructive/70 hover:text-neutral-300 !border-transparent"
                >
                  <Button
                    label="Unsubscribe"
                    className="!w-32"
                    onClick={(e) => toggleWatchlist(e)}
                  />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <div className="text-center w-full text-neutral-500 mt-1">
          You won&apos;t be charged yet
        </div>
      </div>

      {/* <TextRow
        leftText="Estimated total"
        rightText={`$ ${(price * monthRange).toLocaleString()}`}
        className="text-neutral-100 font-semibold"
      /> */}
    </HoverBorderGradient>
  );
};

export default ListingPrice;
