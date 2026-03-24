import { ChevronDown } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react";
import { ActiveOption } from "./ActiveOption";
import { InactiveOption } from "./InactiveOption";
import { TStatus } from "@/app/(dashboard)/templates/types";


interface MultiFilterButtonProps {
  buttonText: string;
  dropdownText: string;
  activeFilters: string[];
  setActiveFilters:  Dispatch<SetStateAction<string[]>>;
  filters: string[];
}

export const MultiFilterButton = ({
  buttonText,
  dropdownText,
  filters,
  activeFilters,
  setActiveFilters,
}: MultiFilterButtonProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (label: string) => {
    setActiveFilters((prev: string[]) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full whitespace-nowrap">
      {/* Trigger Button */}
      <button
        className="relative flex items-center justify-center px-3 py-2 border rounded-3xl hover:bg-gray-100 momants-light-small-darkgray gap-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        {buttonText}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />

        {/* Number of selected filters */}
        {activeFilters.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-white text-[10px]">
            {activeFilters.length}
          </span>
        )}
      </button>

      {/* Dropdown / Popup */}
      {open && (
        <div className="absolute right-0 mt-2 w-[300px] bg-white border rounded shadow-md z-50 p-2">
          <h4 className="mb-3 momants-semibold-small-black">{dropdownText}</h4>
          <div className="flex flex-row flex-wrap gap-3">
            {filters.map((option) => {
              const isActive = activeFilters.includes(option);
              return isActive ? (
                <ActiveOption
                  key={option}
                  option={option}
                  toggleFilter={toggleFilter}
                />
              ) : (
                <InactiveOption
                  key={option}
                  option={option}
                  toggleFilter={toggleFilter}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
