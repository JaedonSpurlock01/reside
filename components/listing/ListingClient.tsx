import React, { useEffect, useState } from "react";
import Container from "../Container";
import ListingHead from "./ListingHead";
import Footer from "../listings/Footer";
import ListingInfo from "./ListingInfo";
import { propertyTypes } from "@/lib/categories";
import ListingPrice from "./ListingPrice";
import Seperator from "../Seperator";
import Image from "next/image";

interface ListingClientProps {
  listing: any;
}

// formattedAddress: "123 Main St",
// addressLine1: "123 Main St",
// addressLine2: "Apt 101",
// city: "Anytown",
// state: "CA",
// zipCode: "12345",
// county: "Any County",
// latitude: 37.7749,
// longitude: -122.4194,
// propertyType: "Single Family Home",
// bedrooms: 3,
// bathrooms: 2,
// squareFootage: 1800,
// lotSize: 0.25,
// yearBuilt: 2005,
// status: "Active",
// price: 5000,
// listedDate: "2024-03-29",
// removedDate: null,
// createdDate: "2024-03-29",
// lastSeenDate: "2024-03-29",
// daysOnMarket: 0,

const ListingClient: React.FC<ListingClientProps> = ({ listing }) => {
  return (
    <Container>
      <div className="w-[90%] lg:w-3/4 xl:w-[65%] 2xl:w-1/2 mx-auto mb-10">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.formattedAddress}
            imageSrc={"/example_house.jpeg"}
            city={listing.city}
            state={listing.state}
            zipCode={listing.zipCode}
          />

          <span className="flex flex-row items-center space-x-2">
            <div className="bg-red-400 rounded-full w-3 h-3" />
            <p className="font-semibold text-neutral-300">For Rent</p>
          </span>

          <div className=" grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              listing={listing}
              description="Built in the 19th century, with a 360 degrees view over the sea and surroundings on the top floor.
              It features a Bedroom with a king size bed, a very well-decorated living room with kitchenette, and a WC.
              Free WiFi, air conditioning, Led TV and DVD player.
              Private parking inside the premises, providing extra security.
              Perfect for an unforgettable honeymoon experience."
            />

            <div className="relative order-first mb-10 md:order-last md:col-span-3">
              <ListingPrice
                price={listing.price}
                totalPrice={listing.price * 12}
                onSubmit={() => {}}
              />
            </div>
          </div>

          <Seperator />

          <div className="text-lg font-semibold text-neutral-300">
            <Image
              src="/temp_map.png"
              alt=""
              width={1024}
              height={576}
              className="object-cover rounded-xl w-full mt-1"
            />
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
};

export default ListingClient;
