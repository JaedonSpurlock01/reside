"use client";

import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useFilterModal from "@/hooks/useFilterModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import Heading from "../Heading";
import { propertyTypes } from "@/lib/categories";
import { Button } from "../ui/button";
import AmenityItem from "../listing/AmenityItem";
import Seperator from "../Seperator";

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useFilterModal();
  const params = useSearchParams();

  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [propertyType, setPropertyType] = useState("");

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      roomCount,
      bathroomCount,
      propertyType,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    searchModal.onClose();
    router.push(url);
  }, [searchModal, router, roomCount, bathroomCount, params, propertyType]);

  const actionLabel = useMemo(() => {
    return "Show places";
  }, []);

  const secondaryActionLabel = useMemo(() => {
    return "Clear all";
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Type of place"
        subtitle="Search homes, apartments, or any type of place"
        className="text-neutral-300"
      />
      <div className="flex flex-row items-center justify-center flex-wrap gap-2">
        {propertyTypes.map((type) => (
          <Button
            key={type.label}
            variant="ghost"
            className={`py-2 px-4 ${
              propertyType === type.label ? "bg-neutral-700" : ""
            }`}
            onClick={() => setPropertyType(type.label)}
          >
            <AmenityItem
              icon={type.icon}
              label={type.label}
              className="!text-neutral-100 !text-6xl"
            />
          </Button>
        ))}
      </div>
      <Counter
        onChange={(value) => setRoomCount(value)}
        value={roomCount}
        title="Rooms"
        subtitle="How many rooms do you need?"
      />
      <Seperator />
      <Counter
        onChange={(value) => {
          setBathroomCount(value);
        }}
        value={bathroomCount}
        title="Bathrooms"
        subtitle="How many bahtrooms do you need?"
      />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={searchModal.onClose}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
