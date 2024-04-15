import React, { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons/lib";

interface AmenityItemProps {
  title: string;
  icon: IconType;
  setSelectedBenefit: Dispatch<SetStateAction<string>>;
  toggled?: boolean;
}

const AmenityItem: React.FC<AmenityItemProps> = ({
  title,
  icon: Icon,
  setSelectedBenefit,
  toggled = false,
}) => {
  return (
    <div
      onClick={() => setSelectedBenefit(title)}
      className={`flex flex-col items-center hover:cursor-pointer transition ${
        toggled ? "text-cyan-500" : "text-neutral-200"
      }`}
    >
      <Icon size={40} />
      {title}
    </div>
  );
};

export default AmenityItem;
