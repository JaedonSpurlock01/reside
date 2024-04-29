"use client";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const monthMap: Map<number, string> = new Map([
  [0, "January"],
  [1, "February"],
  [2, "March"],
  [3, "April"],
  [4, "May"],
  [5, "June"],
  [6, "July"],
  [7, "August"],
  [8, "September"],
  [9, "October"],
  [10, "November"],
  [11, "December"],
]);

interface CalendarFormProps {
  title?: string;
  label?: string;
  date?: Date | null;
  onSelect?: any;
}

export function CalendarForm({
  title,
  label,
  date = null,
  onSelect,
}: CalendarFormProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "gap-2 px-4 pl-3 text-left text-base font-normal !bg-neutral-600 !border-none !text-neutral-200",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            <span>
              {monthMap.get(date.getMonth())} {date.getDate()},{" "}
              {date.getFullYear()}
            </span>
          ) : (
            <span>{label}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 !bg-neutral-600 text-neutral-300"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
