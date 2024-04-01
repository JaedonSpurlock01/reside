import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  className?: string;
};

const PriceFilter: React.FC<Props> = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent>
        <div className="flex flex-row">
          <div className="w-1/2 flex flex-col h-full p-2">
            <h1 className="text-left font-semibold">Minimum</h1>
            <Input
              type="text"
              placeholder="No Min"
              className="bg-neutral-800"
            />
          </div>
          <div className="mt-[3.2rem] w-3 h-[0.1rem] bg-[#acacac]" />
          <div className="w-1/2 flex flex-col h-full p-2">
            <h1 className="text-left font-semibold">Maximum</h1>
            <Input
              type="text"
              placeholder="No Max"
              className=" bg-neutral-800"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-neutral-800">Apply</Button>
      </CardFooter>
    </Card>
  );
};

export default PriceFilter;
