import React from "react";
import { IconType } from "react-icons/lib";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-400" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-neutral-300">{label}</div>
          <div className="text-lg font-light text-neutral-500">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
