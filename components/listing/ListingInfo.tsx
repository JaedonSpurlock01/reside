import React from "react";
import { IconType } from "react-icons/lib";
import Avatar from "../navbar/Avatar";
import Seperator from "../Seperator";
import ListingCategory from "./ListingCategory";
import Image from "next/image";
import { amenities, facilities, propertyTypes } from "@/lib/categories";
import AmenityItem from "./AmenityItem";
import Button from "../modals/Button";
import TextRow from "./TextRow";

interface ListingInfoProps {
  description?: string;
  listing: any;
}

const ListingInfo: React.FC<ListingInfoProps> = ({ description, listing }) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div className="text-neutral-300 font-light">
            Hosted by <span className="font-semibold">RentCast & Redfin</span>
          </div>
          <Avatar />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{listing.bathrooms} baths</div>
          <div>{listing.bedrooms} beds</div>
          <div>{listing.squareFootage?.toLocaleString()} Sq Ft</div>
        </div>
      </div>

      <Seperator />

      {propertyTypes[0] && (
        <ListingCategory
          icon={propertyTypes[0].icon}
          label={propertyTypes[0].label}
          description={propertyTypes[0].description}
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
          rightText={listing.yearBuilt}
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Status"
          rightText={listing.status}
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Listed on"
          rightText={listing.listedDate}
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Created on"
          rightText={listing.createdDate}
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Days on market"
          rightText={listing.daysOnMarket}
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Latitude"
          rightText={`${listing.latitude}°`}
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Longitude"
          rightText={`${listing.longitude}°`}
          leftClassName="font-semibold"
        />
      </div>
    </div>
  );
};

export default ListingInfo;
