import React, { useEffect, useState } from "react";

import Seperator from "../Seperator";
import Button from "../modals/Button";
import TextRow from "./TextRow";
import { HoverBorderGradient } from "../HoverBorderGradient";
import { CalendarForm } from "../inputs/CalendarForm";

interface ListingPriceProps {
  price: number;
  onSubmit: () => void;
}

const ListingPrice: React.FC<ListingPriceProps> = ({ price, onSubmit }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [monthRange, setMonthRange] = useState<number>(12);

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

      <div className="p-4">
        <Button label="Visit rental" onClick={() => {}} />
        <div className="text-center w-full text-neutral-500 mt-1">
          You won&apos;t be charged yet
        </div>
      </div>

      <TextRow
        leftText="Estimated total"
        rightText={`$ ${(price * monthRange).toLocaleString()}`}
        className="text-neutral-100 font-semibold"
      />
    </HoverBorderGradient>
  );
};

export default ListingPrice;
