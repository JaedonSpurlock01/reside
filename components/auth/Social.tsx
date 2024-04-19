import React from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full bg-neutral-600 hover:bg-neutral-500"
        size="lg"
        variant="ghost"
        onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        className="w-full bg-neutral-600 group hover:bg-neutral-500"
        size="lg"
        variant="ghost"
        onClick={() => {}}
      >
        <FaGithub className="h-5 w-5 fill-neutral-300 group-hover:fill-neutral-100" />
      </Button>
    </div>
  );
};

export default Social;
