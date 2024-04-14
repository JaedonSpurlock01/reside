"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import ExampleListing from "./ExampleListing";
import Heading from "../Heading";

export const listingsData = [
  {
    title: "601 S Twin Oaks Valley Rd, San Marcos, CA",
    description:
      "In North County, Prominence Apartments is situated to cater to your lifestyle needs.",
    tags: ["Balcony", "Cable", "Microwave", "Ceiling Fans"],
    imageUrl:
      "https://ssl.cdn-redfin.com/photo/rent/a76af1a3-36bf-4540-a195-8306b5165785/islphoto/genIsl.0_2.jpg",
    link: "",
  },
  {
    title: "426 Penelope Dr, San Marcos, CA",
    description:
      "This home is light and bright totally upgraded model-like townhome in the highly desirable area of San Marcos known as Mission Grove.",
    tags: ["AC", "Microwave", "Washer", "Dryer", "Patio", "Dishwasher"],
    imageUrl:
      "https://ssl.cdn-redfin.com/photo/rent/f4ca0b3e-54be-44f8-8e4e-23c057af719d/islphoto/genIsl.0_1.jpg",
    link: "",
  },
  {
    title: "219 Woodland Pkwy #153, San Marcos, CA",
    description:
      "This fully remodeled 2 bedroom first floor condo features laminate flooring in the kitchen, dining and living area.",
    tags: ["Dishwasher", "Refridgerator", "Washer", "Dryer"],
    imageUrl:
      "https://ssl.cdn-redfin.com/photo/rent/900b6700-7bc9-4f0d-ac5d-f9ad1caf6980/islphoto/genIsl.0_1.jpg",
    link: "",
  },
  {
    title: "601 S Twin Oaks Valley Rd, San Marcos, CA",
    description:
      "In North County, Prominence Apartments is situated to cater to your lifestyle needs.",
    tags: ["Balcony", "Cable", "Microwave", "Ceiling Fans"],
    imageUrl:
      "https://ssl.cdn-redfin.com/photo/rent/a76af1a3-36bf-4540-a195-8306b5165785/islphoto/genIsl.0_2.jpg",
    link: "",
  },
  {
    title: "426 Penelope Dr, San Marcos, CA",
    description:
      "This home is light and bright totally upgraded model-like townhome in the highly desirable area of San Marcos known as Mission Grove.",
    tags: ["AC", "Microwave", "Washer", "Dryer", "Patio", "Dishwasher"],
    imageUrl:
      "https://ssl.cdn-redfin.com/photo/rent/f4ca0b3e-54be-44f8-8e4e-23c057af719d/islphoto/genIsl.0_1.jpg",
    link: "",
  },
  {
    title: "219 Woodland Pkwy #153, San Marcos, CA",
    description:
      "This fully remodeled 2 bedroom first floor condo features laminate flooring in the kitchen, dining and living area.",
    tags: ["Dishwasher", "Refridgerator", "Washer", "Dryer"],
    imageUrl:
      "https://ssl.cdn-redfin.com/photo/rent/900b6700-7bc9-4f0d-ac5d-f9ad1caf6980/islphoto/genIsl.0_1.jpg",
    link: "",
  },
] as const;

export default function ExampleListings() {
  const { ref } = useInView({
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="mb-40 flex flex-col items-center">
      <Heading title="Sample Listings" className="text-neutral-300 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {listingsData.map((project, index) => (
          <React.Fragment key={index}>
            <ExampleListing {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
