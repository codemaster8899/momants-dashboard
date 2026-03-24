"use client";

import { twMerge } from "tailwind-merge";
import { useTrainingContext } from "./TrainingContext";
import useTrainingFilters from "@/hooks/fetch/training/useTrainingFilters";

const navigationItems = [
  { name: "Open questions", queryKey: "open" as const },
  { name: "Trained questions", queryKey: "trained" as const },
];

export const TrainingNavBar = () => {
  const { counts, setQueryParam } = useTrainingContext();
  const { filter } = useTrainingFilters();

  const handleNavigationClick = (queryKey: "open" | "trained") => {
    setQueryParam({ file_type: queryKey });
  };

  return (
    <div className="flex items-center justify-between px-6 pt-4 border-b border-gray-200">
      <nav className="flex gap-6">
        {navigationItems.map(({ name, queryKey }, idx) => (
          <button
            onClick={() => handleNavigationClick(queryKey)}
            key={idx}
            className={twMerge(
              "pb-2",
              filter === queryKey
                ? "border-b-[2.5px] border-black -mb-[1.5px]"
                : "",
            )}
          >
            {name} {counts[queryKey] ? `(${counts[queryKey]})` : ""}
          </button>
        ))}
      </nav>
    </div>
  );
};
