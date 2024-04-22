import {
  MdEmojiTransportation,
  MdHeatPump,
  MdLocalGroceryStore,
  MdOutlineHolidayVillage,
  MdOutlineVilla,
  MdSchool,
} from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbAirConditioning, TbBoxSeam, TbToolsKitchen } from "react-icons/tb";
import { FaWifi } from "react-icons/fa6";
import { IoCarOutline } from "react-icons/io5";
import { IoIosFitness, IoMdRestaurant } from "react-icons/io";
import { BiSolidDryer, BiSolidWasher } from "react-icons/bi";
import { GiFamilyHouse, GiHomeGarage } from "react-icons/gi";

export const propertyTypes = [
  {
    label: "Single Family",
    icon: MdOutlineVilla,
    description: "Detached, regular single-family home",
  },
  {
    label: "Condo",
    icon: HiOutlineOfficeBuilding,
    description:
      "Single unit in a condominium development or building, which is part of a (HOA) community",
  },
  {
    label: "Townhouse",
    icon: MdOutlineHolidayVillage,
    description:
      "Single-family property that shares walls with other adjacent homes, and is typically part of a (HOA) community",
  },
  {
    label: "Multi-Family",
    icon: GiFamilyHouse,
    description:
      "Single unit/apartment within a residential multi-family building (2-4 units)",
  },
  {
    label: "Apartment",
    icon: HiOutlineBuildingOffice2,
    description:
      "Single unit/apartment within a commercial multi-family building or apartment complex (5+ units)",
  },
];

export const amenities = [
  {
    label: "Kitchen",
    icon: TbToolsKitchen,
  },
  {
    label: "Wifi",
    icon: FaWifi,
  },
  {
    label: "Parking",
    icon: IoCarOutline,
  },
  {
    label: "Gym",
    icon: IoIosFitness,
  },
  {
    label: "Free washer - In unit",
    icon: BiSolidWasher,
  },
  {
    label: "Free dryer - In unit",
    icon: BiSolidDryer,
  },
  {
    label: "Air Conditioning",
    icon: TbAirConditioning,
  },
  {
    label: "Heating",
    icon: MdHeatPump,
  },
  {
    label: "Storage Space",
    icon: TbBoxSeam,
  },
  {
    label: "Garage",
    icon: GiHomeGarage,
  },
];

export const facilities = [
  {
    label: "Public Transportation",
    icon: MdEmojiTransportation,
  },
  {
    label: "Grocery Store",
    icon: MdLocalGroceryStore,
  },
  {
    label: "Schools/Universities",
    icon: MdSchool,
  },
  {
    label: "Restaurants",
    icon: IoMdRestaurant,
  },
  {
    label: "Fitness Centers",
    icon: IoIosFitness,
  },
];
