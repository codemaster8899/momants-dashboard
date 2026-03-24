"use client";

import { useState } from "react";
import { InformationItemDisplay } from "./InformationItemDisplay";
import { InformationSearch } from "./InformationSearch";
import { ProgressTracker } from "./ProgressTracker";
import { useTrainingContext } from "./TrainingContext";
import useTrainingFilters from "@/hooks/fetch/training/useTrainingFilters";

export const InformationSection = () => {
  const { categories } = useTrainingContext();
  const { selectedCategory, setQueryParam } = useTrainingFilters();

  const onSelect = (selectedId: string | null) => {
    setQueryParam({ category: selectedId });
  };

  return (
    <div className="w-full mx-auto border-b border-r border-gray-200 flex flex-col h-full">
      {/* search and progress tracker */}
      <div className="flex items-center justify-center border-b border-gray-200">
        <InformationSearch />
      </div>
      <div className="p-4 border-b border-gray-200">
        <ProgressTracker />
      </div>

      {/* information items list */}
      <section className="px-2 py-1 flex-1 overflow-y-auto min-h-0">
        {categories.map((item) => (
          <InformationItemDisplay
            item={item}
            key={item.category_name}
            onClick={() =>
              onSelect(
                selectedCategory === item.category_name
                  ? null
                  : item.category_name,
              )
            }
            isSelected={selectedCategory === item.category_name}
          />
        ))}
      </section>
    </div>
  );
};
