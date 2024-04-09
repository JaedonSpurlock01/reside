import React from "react";
import { IconType } from "react-icons/lib";

interface AmenityItemProps {
  icon: IconType;
  label: string;
}

const AmenityItem: React.FC<AmenityItemProps> = ({ icon: Icon, label }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-4">
        <Icon size={20} className="text-neutral-400" />
        <div className="flex flex-col items-center justify-center">
          <div className="text-sm font-light text-neutral-300">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default AmenityItem;
