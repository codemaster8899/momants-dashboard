"use client";

import useTrainingFilters from "@/hooks/fetch/training/useTrainingFilters";
import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export const InformationSearch = () => {
  const { search, setQueryParam } = useTrainingFilters();
  const [query, setQuery] = useState(search || "");
  const searchValue = useDebounce(query, 500);

  useEffect(() => {
    setQueryParam({ search: String(searchValue) || "" });
  }, [searchValue]);

  return (
    <div className="flex items-center justify-center relative w-full h-[69px] box-border p-4">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 momants-light-small-darkgray w-3 h-3 focus:outline-none" />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-6 py-2 box-border border rounded-3xl placeholder-gray-500 placeholder:text-sm"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-6 top-1/2 -translate-y-1/2 momants-light-small-gray hover:text-gray-600"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
