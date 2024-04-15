import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons/lib";

interface AmenityItemProps {
  icon: IconType;
  label: string;
  className?: string;
  large?: boolean;
}

const AmenityItem: React.FC<AmenityItemProps> = ({
  icon: Icon,
  label,
  className,
  large,
}) => {
  return (
    <div className="flex flex-col">
      <div className={cn("flex flex-row items-center gap-4 ", className)}>
        <Icon size={large ? 60 : 20} className="text-neutral-300" />
        <div className="flex flex-col items-center justify-center">
          <div className="text-sm font-light text-neutral-200">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default AmenityItem;
