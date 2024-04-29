import React from "react";
import Avatar from "../navbar/Avatar";
import Seperator from "../Seperator";
import ListingCategory from "./ListingCategory";
import { amenities, facilities, propertyTypes } from "@/lib/categories";
import AmenityItem from "./AmenityItem";
import Button from "../modals/Button";
import TextRow from "./TextRow";
import LocationMap from "./LocationMap";
import Heading from "../Heading";

interface ListingInfoProps {
  description?: string;
  listing: any;
  propertyType?: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  description,
  listing,
  propertyType = "Multi-Family",
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div className="text-neutral-300 font-light">
            Hosted by <span className="font-semibold">RentCast & Redfin</span>
          </div>
          <Avatar imageSrc="/images/RentCast.png" />
          <Avatar imageSrc="/images/Redfin.png" />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{listing.bathrooms} baths</div>
          <div>{listing.bedrooms} beds</div>
          <div>{listing.squareFootage?.toLocaleString()} Sq Ft</div>
        </div>
      </div>

      <Seperator />

      {propertyTypes.map(
        (type, index) =>
          type.label === propertyType && (
            <ListingCategory
              key={index}
              icon={type.icon}
              label={type.label}
              description={type.description}
            />
          )
      )}

      <Seperator />

      <div className="text-lg font-light text-neutral-400 flex flex-col">
        <Heading title="Description" className="text-neutral-300" />
        {description}
      </div>

      <Seperator />

      <div className="text-lg font-semibold text-neutral-300">
        <Heading title="Location" />
        <div className="relative rounded-xl h-[20rem] w-full mt-1 overflow-hidden border-neutral-600 border-2">
          <LocationMap lat={listing.latitude} lon={listing.longitude} />
        </div>
      </div>

      <Seperator />

      {/* <div className="text-2xl font-bold text-neutral-300 flex flex-col gap-4">
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

      <Seperator /> */}

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
          rightText={new Date(listing.listedDate).toDateString()}
          leftClassName="font-semibold"
        />
        <TextRow
          leftText="Created on"
          rightText={new Date(listing.createdDate).toDateString()}
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
