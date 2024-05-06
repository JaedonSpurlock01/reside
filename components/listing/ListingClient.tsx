"use client";

import React from "react";
import Container from "../Container";
import ListingHead from "./ListingHead";
import Footer from "../Footer";
import ListingInfo from "./ListingInfo";
import ListingPrice from "./ListingPrice";
import Seperator from "../Seperator";
import Image from "next/image";
import ListingHost from "./ListingHost";
import LocationMap from "./LocationMap";
import MatrixMap from "./MatrixMap";

interface ListingClientProps {
  listing: any;
  images?: string[];
  listingId: string;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  images = [],
  listingId,
}) => {
  return (
    <Container>
      <div className="w-[90%] xl:w-[85%] 2xl:w-[50%] mx-auto mb-10">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.formattedAddress}
            images={images}
            city={listing.city}
            state={listing.state}
            zipCode={listing.zipCode}
            listingId={listingId}
          />

          <span className="flex flex-row items-center space-x-2">
            <div className="bg-red-400 rounded-full w-3 h-3" />
            <p className="font-semibold text-neutral-300">For Rent</p>
          </span>

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              listing={listing}
              description="Step into a beautifully maintained rental property located in the heart of the city, perfect for those seeking a blend of comfort and convenience. This apartment offers a functional layout that maximizes space without sacrificing style."
              propertyType={listing.propertyType}
            />

            <div className="relative order-first md:order-last md:col-span-3">
              <ListingPrice
                price={listing.price}
                onSubmitLink={listing.formattedAddress}
                listingId={listingId}
              />
            </div>
          </div>

          <Seperator />

          <div className="text-lg font-semibold text-neutral-300">
            <div className="relative rounded-xl h-[30rem] w-full mt-1 overflow-hidden border-neutral-600 border-2">
              <MatrixMap lat={listing.latitude} lon={listing.longitude} />
            </div>
          </div>

          <Seperator />

          <ListingHost
            hostName="RentCast"
            reviews={365}
            rating={4.93}
            hostSpan={9}
            location="San Diego, California"
            description="Helps real estate investors and property managers grow, track and
            optimize their rental property portfolios."
            imageSrc="/images/RentCast.png"
            link="https://www.rentcast.io"
          />

          <Seperator className="bg-transparent my-8" />

          <ListingHost
            hostName="Redfin"
            reviews={243}
            rating={4.32}
            hostSpan={17}
            location="Seattle, Washington"
            description="Provides residential real estate brokerage and mortgage origination services."
            imageSrc="/images/Redfin.png"
            heading={false}
            link="https://www.redfin.com/"
          />

          <Seperator className="bg-transparent my-10" />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
