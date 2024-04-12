import React from "react";
import { FaCheck } from "react-icons/fa6";
import Heading from "../Heading";
import { IconType } from "react-icons/lib";

export interface BenefitSectionProps {
  title: string;
  selectedId?: string;
  greyBenefits: string[];
  greenBenefits: string[];
  icon: any;
  technology: string;
  visible?: boolean;
}

const BenefitSection: React.FC<BenefitSectionProps> = ({
  title,
  greenBenefits,
  greyBenefits,
  icon: Icon,
  technology,
  visible,
}) => {
  return (
    <div
      className={` w-full px-10 md:px-0 md:w-[36%] h-full text-neutral-300 justify-between flex flex-col text-left ${
        visible ? "block" : "hidden"
      }`}
    >
      <Heading title={title} />
      <div>
        {greyBenefits.map((benefit) => (
          <div key="benefit" className="flex flex-row items-center gap-2">
            <FaCheck /> {benefit}
          </div>
        ))}

        {greenBenefits.map((benefit) => (
          <div
            key={benefit}
            className="flex flex-row items-center gap-2 text-green-500"
          >
            <FaCheck /> {benefit}
          </div>
        ))}
      </div>
      <h1 className="text-left flex flex-row items-center gap-2">
        <Icon size={25} /> with <span className="underline">{technology}</span>
      </h1>
    </div>
  );
};

export default BenefitSection;
