import React from "react";

import { Calendar, Range } from "react-date-range";
import Seperator from "../Seperator";
import Button from "../modals/Button";
import TextRow from "./TextRow";

interface ListingPriceProps {
  price: number;
  totalPrice: number;
  onSubmit: () => void;
}

const ListingPrice: React.FC<ListingPriceProps> = ({
  price,
  totalPrice,
  onSubmit,
}) => {
  return (
    <div className="bg-neutral-700 rounded-xl overflow-hidden shadow-2xl sticky top-4">
      <div className="flex flex-row items-end gap-1 p-4">
        <div className="text-2xl font-semibold text-neutral-300">
          $ {price.toLocaleString()}
        </div>
        <div className="font-light text-neutral-300 mb-[1px]">month</div>
      </div>

      <div className="p-4 flex flex-row items-center text-neutral-300 font-light text-lg -my-6 mt-1">
        Estimate your cost at this rental
      </div>

      <div className="!bg-neutral-700 mt-[1px] mb-[1px]">
        <Calendar />
      </div>

      <Seperator className="bg-neutral-600" />

      <TextRow
        leftText={`${price.toLocaleString()} x 12 months`}
        rightText={`$ ${totalPrice.toLocaleString()}`}
        leftClassName="underline text-neutral-400"
        rightClassName="text-neutral-300"
      />

      <TextRow
        leftText={`Utilites Cost`}
        rightText={`$ ${(90).toLocaleString()}`}
        leftClassName="underline text-neutral-400"
        rightClassName="text-neutral-300"
      />

      <TextRow
        leftText={`Amneities Cost`}
        rightText={`$ ${(205).toLocaleString()}`}
        leftClassName="underline text-neutral-400"
        rightClassName="text-neutral-300"
      />

      <Seperator className="bg-neutral-600" />

      <div className="p-4">
        <Button label="Contact For Sales" onClick={() => {}} />
        <div className="text-center w-full text-neutral-500 mt-1">
          You won&apos;t be charged yet
        </div>
      </div>

      <TextRow
        leftText={`Total before taxes`}
        rightText={`$ ${(totalPrice + 90 + 205).toLocaleString()}`}
        className="text-neutral-300 font-semibold"
      />
    </div>
  );
};

export default ListingPrice;
