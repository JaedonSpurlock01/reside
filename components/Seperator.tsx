import React from "react";

const Seperator = ({ className }: { className?: string }) => {
  return <div className={`${className} w-full h-[1px] bg-[#3b3b3b]`} />;
};

export default Seperator;
