"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./modals/Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
  className,
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "h-[60vh] !text-neutral-300 bg-neutral-800 flex flex-col gap-2 justify-center items-center",
        className
      )}
    >
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
