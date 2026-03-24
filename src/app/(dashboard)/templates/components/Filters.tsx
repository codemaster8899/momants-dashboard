"use client";

import { MultiFilterButton } from "@/components/ui/MultiFilterButton";
import useTemplateFilters from "@/hooks/fetch/template/useTemplateFilters";
import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { TStatus } from "../types";

export const Filters = ({ filters }: { filters: TStatus[] }) => {
  const { search, page, selectedCategory, setQueryParam } =
    useTemplateFilters();
  const [query, setQuery] = useState(search ?? "");
  const searchValue = useDebounce(query, 500);

  useEffect(() => {
    setQueryParam({ search: searchValue as string });
  }, [searchValue]);

  const handleFilterChange = (
    next: string[] | ((prev: string[]) => string[]),
  ) => {
    const nextArray =
      typeof next === "function" ? next([selectedCategory ?? ""]) : next;
    const label = nextArray[nextArray.length - 1];
    const value = label ? label.replace(/ /g, "_").toLowerCase() : null;
    setQueryParam({ category: value, page: "1" });
  };

  return (
    <div className="flex w-full justify-between gap-4">
      {/* search bar */}
      <div className="relative w-fit">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 momants-light-extrasmall-gray w-3 h-3 focus:outline-none" />
        <input
          type="text"
          placeholder="Search for templates"
          value={query}
          onChange={(e) => {
            if (Number(page) > 1) setQueryParam({ page: "1" });
            setQuery(e.target.value);
          }}
          className="w-full text-sm pl-8 pr-8 py-2 border rounded-3xl placeholder-gray-500 placeholder:text-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 momants-light-extrasmall-gray hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* sended filters */}
      <div className="flex w-fit gap-2">
        {/* status filters */}
        <MultiFilterButton
          buttonText="Select status"
          dropdownText="Select by status"
          activeFilters={selectedCategory ? [selectedCategory] : []}
          setActiveFilters={handleFilterChange}
          filters={filters}
        />
      </div>
    </div>
  );
};
