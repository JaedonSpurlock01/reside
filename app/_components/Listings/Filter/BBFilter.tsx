import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

type Props = {
  className?: string;
};

const BBFilter: React.FC<Props> = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent>
        <div className="w-full h-16 px-2 mb-14">
          <h1 className="text-left mb-2 font-semibold text-neutral-400">
            Bedrooms
          </h1>
          <div className="w-full flex flex-row h-4/5 mb-4">
            <button className="w-full h-full border border-[#5a5a5a] rounded-l-lg hover:bg-neutral-800">
              Any
            </button>
            <button className="w-full h-full border-y border-[#5a5a5a] hover:bg-neutral-800">
              1+
            </button>
            <button className="w-full h-full border-y border-l border-[#5a5a5a] hover:bg-neutral-800">
              2+
            </button>
            <button className="w-full h-full border border-[#5a5a5a] hover:bg-neutral-800">
              3+
            </button>
            <button className="w-full h-full border-y border-[#5a5a5a] hover:bg-neutral-800">
              4+
            </button>
            <button className="w-full h-full border border-[#5a5a5a] rounded-r-lg hover:bg-neutral-800">
              5+
            </button>
          </div>
          <div className="w-full text-neutral-200 text-left flex flex-row items-center space-x-2">
            <Checkbox id="exact-match" className="w-6 h-6 border-[#5a5a5a]" />
            <label
              htmlFor="exact-match"
              className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use exact match
            </label>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="w-full h-16 px-2 mb-4">
          <h1 className="text-left mb-2 font-semibold text-neutral-400">
            Bathrooms
          </h1>
          <div className="w-full flex flex-row h-4/5">
            <button className="w-full h-full border border-[#5a5a5a] rounded-l-lg hover:bg-neutral-800">
              Any
            </button>
            <button className="w-full h-full border-y border-[#5a5a5a] hover:bg-neutral-800">
              1
            </button>
            <button className="w-full h-full border-y border-l border-[#5a5a5a] hover:bg-neutral-800">
              2
            </button>
            <button className="w-full h-full border border-[#5a5a5a] hover:bg-neutral-800">
              3
            </button>
            <button className="w-full h-full border-y border-[#5a5a5a] hover:bg-neutral-800">
              4
            </button>
            <button className="w-full h-full border border-[#5a5a5a] rounded-r-lg hover:bg-neutral-800">
              5
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-neutral-800">Apply</Button>
      </CardFooter>
    </Card>
  );
};

export default BBFilter;
