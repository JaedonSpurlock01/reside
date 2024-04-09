import React from "react";
import { IconType } from "react-icons/lib";
import Avatar from "../navbar/Avatar";
import Seperator from "../Seperator";
import ListingCategory from "./ListingCategory";
import Image from "next/image";
import { amenities, facilities } from "@/lib/categories";
import AmenityItem from "./AmenityItem";
import Button from "../modals/Button";
import TextRow from "./TextRow";

interface ListingInfoProps {
  propertyType?:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description?: string;
  bathroomCount?: number;
  bedroomCount?: number;
  squareFootage?: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  propertyType,
  description,
  bathroomCount,
  bedroomCount,
  squareFootage,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div className="text-neutral-300">Hosted by RentCast</div>
          <Avatar />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{bathroomCount} baths</div>
          <div>{bedroomCount} beds</div>
          <div>{squareFootage?.toLocaleString()} Sq Ft</div>
        </div>
      </div>

      <Seperator />

      {propertyType && (
        <ListingCategory
          icon={propertyType.icon}
          label={propertyType.label}
          description={propertyType.description}
        />
      )}

      <Seperator />

      <div className="text-lg font-light text-neutral-400">{description}</div>

      <Seperator />

      <div className="text-lg font-semibold text-neutral-300">
        Location
        <Image
          src="/temp_map.png"
          alt=""
          width={1024}
          height={576}
          className="object-cover rounded-xl w-full mt-1"
        />
      </div>

      <Seperator />

      <div className="text-2xl font-bold text-neutral-300 flex flex-col gap-4">
        What this place offers
        <div className="grid grid-cols-2 gap-1">
          {amenities.map((amenity) => (
            <AmenityItem
              key={amenity.label}
              label={amenity.label}
              icon={amenity.icon}
            />
          ))}
        </div>
        <Button
          label="Show all amenities"
          onClick={() => {}}
          className="!w-1/3"
          outline
        />
      </div>

      <Seperator />

      <div className="text-2xl font-bold text-neutral-300 flex flex-col gap-4">
        Nearby facilities
        <div className="grid grid-cols-2 gap-1">
          {facilities.map((facility) => (
            <AmenityItem
              key={facility.label}
              label={facility.label}
              icon={facility.icon}
            />
          ))}
        </div>
        <Button
          label="Show all facilities"
          onClick={() => {}}
          className="!w-1/3"
          outline
        />
      </div>

      <Seperator />

      <div className="text-lg text-neutral-300 flex flex-col -space-y-4">
        <span className="text-2xl font-bold mb-4">Rental History</span>
        <TextRow
          leftText="Year Built"
          rightText="2005"
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Status"
          rightText="Active"
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Listed on"
          rightText="2024-03-29"
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Created on"
          rightText="2024-03-29"
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Days on market"
          rightText="12"
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Latitude"
          rightText="37.7749"
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Longitude"
          rightText="-122.4194"
          leftClassName="font-semibold"
        />
      </div>
    </div>
  );
};

export default ListingInfo;
