import React from "react";

interface TextRowProps {
  leftText: string;
  rightText: string;
  leftClassName?: string;
  rightClassName?: string;
  className?: string;
}

const TextRow: React.FC<TextRowProps> = ({
  leftText,
  rightText,
  leftClassName,
  rightClassName,
  className,
}) => {
  return (
    <div
      className={`p-4 flex flex-row items-center justify-between font-light text-lg ${className}`}
    >
      <div className={leftClassName}>{leftText}</div>
      <div className={rightClassName}>{rightText}</div>
    </div>
  );
};

export default TextRow;
