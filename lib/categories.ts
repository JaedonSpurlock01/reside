import {
  MdFireplace,
  MdHeatPump,
  MdOutlineBalcony,
  MdOutlineDeck,
  MdOutlineHolidayVillage,
  MdOutlinePets,
  MdOutlinePool,
  MdOutlineSportsBasketball,
  MdOutlineSportsTennis,
  MdOutlineVilla,
} from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbAirConditioning, TbBoxSeam, TbToolsKitchen } from "react-icons/tb";
import { FaWheelchair, FaWifi } from "react-icons/fa6";
import { IoCarOutline } from "react-icons/io5";
import { IoIosFitness } from "react-icons/io";
import { BiCctv, BiSolidDryer, BiSolidWasher } from "react-icons/bi";
import { GrElevator, GrHostMaintenance } from "react-icons/gr";
import { CgCommunity } from "react-icons/cg";
import { GiFamilyHouse, GiHomeGarage, GiStaticGuard } from "react-icons/gi";

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
    label: "Swimming Pool",
    icon: MdOutlinePool,
  },
  {
    label: "Gym/Fitness Center",
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
    label: "Elevator",
    icon: GrElevator,
  },
  {
    label: "Balcony/Patio",
    icon: MdOutlineBalcony,
  },
  {
    label: "Security System",
    icon: BiCctv,
  },
  {
    label: "Pet Friendly",
    icon: MdOutlinePets,
  },
  {
    label: "Wheelchair Accessible",
    icon: FaWheelchair,
  },
  {
    label: "Fireplace",
    icon: MdFireplace,
  },
  {
    label: "Community Room",
    icon: CgCommunity,
  },
  {
    label: "On-site Maintenance",
    icon: GrHostMaintenance,
  },
  {
    label: "Storage Space",
    icon: TbBoxSeam,
  },
  {
    label: "Roof Deck",
    icon: MdOutlineDeck,
  },
  {
    label: "Tennis Court",
    icon: MdOutlineSportsTennis,
  },
  {
    label: "Basketball Court",
    icon: MdOutlineSportsBasketball,
  },
  {
    label: "Garage",
    icon: GiHomeGarage,
  },
  {
    label: "Security Guard",
    icon: GiStaticGuard,
  },
];

export const facilities = [
  {
    label: "Public Transportation",
    icon: MdOutlinePets,
  },
  {
    label: "Grocery Store",
    icon: MdOutlinePets,
  },
  {
    label: "Schools",
    icon: MdOutlinePets,
  },
  {
    label: "Hospitals/Clinics",
    icon: MdOutlinePets,
  },
  {
    label: "Pharmacy",
    icon: MdOutlinePets,
  },
  {
    label: "Restaurants/Cafes",
    icon: MdOutlinePets,
  },
  {
    label: "Parks/Recreational Areas",
    icon: MdOutlinePets,
  },
  {
    label: "Shopping Centers/Malls",
    icon: MdOutlinePets,
  },
  {
    label: "Gyms/Fitness Centers",
    icon: MdOutlinePets,
  },
  {
    label: "Banks/ATMs",
    icon: MdOutlinePets,
  },
  {
    label: "Post Office",
    icon: MdOutlinePets,
  },
  {
    label: "Entertainment",
    icon: MdOutlinePets,
  },
  {
    label: "Libraries",
    icon: MdOutlinePets,
  },
  {
    label: "Police Station",
    icon: MdOutlinePets,
  },
  {
    label: "Fire Station",
    icon: MdOutlinePets,
  },
  {
    label: "Gas Station",
    icon: MdOutlinePets,
  },
  {
    label: "Car Wash",
    icon: MdOutlinePets,
  },
  {
    label: "Car Rental",
    icon: MdOutlinePets,
  },
  {
    label: "Veterinary Clinic",
    icon: MdOutlinePets,
  },
  {
    label: "Daycare",
    icon: MdOutlinePets,
  },
  {
    label: "Laundromat",
    icon: MdOutlinePets,
  },
  {
    label: "Barber/Beauty Salon",
    icon: MdOutlinePets,
  },
  {
    label: "Hardware Store",
    icon: MdOutlinePets,
  },
  {
    label: "ATM",
    icon: MdOutlinePets,
  },
  {
    label: "Public Library",
    icon: MdOutlinePets,
  },
  {
    label: "Dog Park",
    icon: MdOutlinePets,
  },
  {
    label: "Golf Course",
    icon: MdOutlinePets,
  },
  {
    label: "Tennis Court",
    icon: MdOutlinePets,
  },
  {
    label: "Public Pool",
    icon: MdOutlinePets,
  },
  {
    label: "Public Beach",
    icon: MdOutlinePets,
  },
];
