import React from "react";

interface BackButtonProps {
  handleBackRef?: () => void;
  label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ handleBackRef, label }) => {
  return (
    <div className="text-center w-full text-neutral-300">
      <span
        onClick={handleBackRef}
        className="hover:cursor-pointer hover:underline text-sm"
      >
        {label}
      </span>
    </div>
  );
};

export default BackButton;
