import React from "react";

interface BackButtonProps {
  handleBackRef?: () => void;
  label: string;
  center?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({
  handleBackRef,
  label,
  center = true,
}) => {
  return (
    <div className={`w-full text-neutral-300 ${center && "text-center"}`}>
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
