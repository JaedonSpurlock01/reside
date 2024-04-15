import React, { useState } from "react";
import { BsDatabase } from "react-icons/bs";
import { CiDollar, CiFilter, CiMap } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import Heading from "../Heading";
import { FaCheck } from "react-icons/fa6";
import { SiMapbox, SiNextdotjs } from "react-icons/si";
import BenefitSection, { BenefitSectionProps } from "./BenefitSection";
import AmenityItem from "./AmenityItem";
import { IconType } from "react-icons/lib";
import MongoDB from "../svg/MongoDB";
import Filter from "../svg/Filter";

type AmenityType = {
  id: string;
  icon: IconType;
};

const typesOfAmenities: AmenityType[] = [
  {
    id: "Matrix",
    icon: GiPathDistance,
  },
  {
    id: "Map",
    icon: CiMap,
  },
  {
    id: "Filter",
    icon: CiFilter,
  },
  {
    id: "Database",
    icon: BsDatabase,
  },
  {
    id: "Login",
    icon: IoPersonCircleOutline,
  },
  {
    id: "Roommate",
    icon: HiMiniMagnifyingGlass,
  },
];

const typesOfBenefits: BenefitSectionProps[] = [
  {
    title: "Distance Matrix",
    selectedId: "Matrix",
    greyBenefits: [
      "Find travel times from your rental to your school",
      "Avoid unnecessary traffic jams",
      "Make commuting a breeze",
    ],
    greenBenefits: [
      "Save hours of stress",
      "Avoid higher chances of car accidents",
    ],
    icon: SiMapbox,
    technology: "Mapbox Matrix API",
  },
  {
    title: "Mapbox",
    selectedId: "Map",
    greyBenefits: [
      "Enjoy seamless, beautiful maps of the rentals",
      "Smooth and user-friendly user experience",
      "Visualize your homestead without actually being there",
    ],
    greenBenefits: ["Find nearby facilities", "Make rental searching easy"],
    icon: SiMapbox,
    technology: "MapBox",
  },
  {
    title: "Filter",
    selectedId: "Filter",
    greyBenefits: [
      "Make finding your listing easy",
      "Search by city, state, zip, or address",
    ],
    greenBenefits: [
      "Sort listings by your preferences",
      "Order by different criterias",
    ],
    icon: SiMapbox,
    technology: "Reside",
  },
  {
    title: "Database",
    selectedId: "Database",
    greyBenefits: [
      "Thousands of listings saved",
      "Pulls from the MLS",
      "Highly accurate listing information",
    ],
    greenBenefits: ["Makes your life easier when searching listings"],
    icon: MongoDB,
    technology: "MongoDB",
  },
  {
    title: "Login",
    selectedId: "Login",
    greyBenefits: [
      "Store your favorite listings",
      "Easy to use settings page",
      "No signup fee",
    ],
    greenBenefits: ["Google authentication", "GitHub authentication"],
    icon: SiNextdotjs,
    technology: "NextAuth",
  },
  {
    title: "Roommate",
    selectedId: "Roommate",
    greyBenefits: ["Live with others to split the cost"],
    greenBenefits: [
      "Find people with the same living interests",
      "Up to date notifications on rental views",
    ],
    icon: MongoDB,
    technology: "MongoDB",
  },
];

const Benefits = () => {
  const [selectedBenefit, setSelectedBenefit] = useState<string>("Matrix");

  return (
    <>
      <div className="w-full px-10 md:px-0 md:w-[45%] md:max-w-[48rem]">
        <h1 className="text-4xl font-semibold text-neutral-300 text-left mb-6">
          Make housing affordable and sustainable,
          <br />
          save <span className="text-cyan-500">hundreds</span> of $
        </h1>
        <p className="text-start text-neutral-400 mb-6">
          Search your area, and find cheap listings at lightspeed. Spend your
          time building on what truly matters for you. Reside provides you with
          a smooth experience for finding a new homestead.
        </p>

        <div className="flex flex-row justify-between mb-10 font-semibold">
          {typesOfAmenities.map((amenity: AmenityType) => (
            <AmenityItem
              title={amenity.id}
              key={amenity.id}
              icon={amenity.icon}
              setSelectedBenefit={setSelectedBenefit}
              toggled={selectedBenefit === amenity.id}
            />
          ))}
        </div>
      </div>
      <div className="bg-neutral-900 w-full h-[20rem] mb-40 flex flex-col items-center py-8">
        {typesOfBenefits.map((benefit) => (
          <BenefitSection
            title={benefit.title}
            greyBenefits={benefit.greyBenefits}
            greenBenefits={benefit.greenBenefits}
            visible={selectedBenefit === benefit.selectedId}
            icon={benefit.icon}
            technology={benefit.technology}
            key={benefit.title}
          />
        ))}
      </div>
    </>
  );
};

export default Benefits;
