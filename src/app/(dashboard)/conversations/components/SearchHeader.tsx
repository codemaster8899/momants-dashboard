"use client";

import { InboxSearch } from "./InboxSearch";
import { DatePickerButton } from "./DatePickerButton";
import { FilterButton } from "./FilterButton";

export const SearchHeader = () => {
  return (
    <div className="flex items-center space-x-2 gap-12">
      {/* Input search */}
      <div className="relative flex-1">
        <InboxSearch />
      </div>
      <div className="flex gap-2">
        {/* Agenda button */}
        <DatePickerButton />
        {/* Filter button */}
        <FilterButton />
      </div>
    </div>
  );
};
