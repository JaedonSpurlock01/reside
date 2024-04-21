"use client";
import React from "react";

interface MenuItemProps {
  onClick?: () => void;
  label: string;
  borderTop?: boolean;
  borderBottom?: boolean;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  borderBottom,
  borderTop,
  disabled,
}) => {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 truncate
      ${borderBottom ? "border-b-[1px] border-[#505050]" : ""}
      ${borderTop ? "border-t-[1px] border-[#505050]" : ""}
      ${
        disabled
          ? "font-semibold"
          : "font-light cursor-pointer hover:bg-neutral-600 transition"
      }`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
