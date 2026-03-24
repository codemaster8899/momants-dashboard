"use client";

import { MultiFilterButton } from "@/components/ui/MultiFilterButton";
import useCampaignFilters from "@/hooks/fetch/campaigns/useCampaignsFilters";
import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toDisplayLabel } from "../utils";

interface FiltersProps {
  statusOptions?: string[];
  sendStatusOptions?: string[];
  campaignTypeOptions?: string[];
}

export const Filters = ({
  statusOptions = [],
  sendStatusOptions = [],
  campaignTypeOptions = [],
}: FiltersProps) => {
  const { search, page, status, send_status, campaign_type, setQueryParam } =
    useCampaignFilters();

  const [searchInput, setSearchInput] = useState(search ?? "");
  const debouncedSearch = useDebounce(searchInput, 400) as string;

  useEffect(() => {
    setQueryParam({ search: debouncedSearch });
  }, [debouncedSearch]);

  const activeFiltersOptions = statusOptions.map(toDisplayLabel);
  const sendedFiltersOptions = sendStatusOptions.map(toDisplayLabel);
  const campaignFiltersOptions = campaignTypeOptions.map(toDisplayLabel);

  const statusFilters = status ? [toDisplayLabel(status)] : [];
  const campaignFilters = campaign_type ? [toDisplayLabel(campaign_type)] : [];
  const sendedFilters = send_status ? [toDisplayLabel(send_status)] : [];

  const handleFilterChange = (
    keyName: "status" | "send_status" | "campaign_type",
    next: string[] | ((prev: string[]) => string[]),
  ) => {
    const current = {
      status: statusFilters,
      send_status: sendedFilters,
      campaign_type: campaignFilters,
    } as const;

    const nextArray =
      typeof next === "function" ? next(current[keyName]) : next;
    const label = nextArray[nextArray.length - 1];
    const value = label ? label.replace(/ /g, "_").toLowerCase() : null;
    setQueryParam({ [keyName]: value, page: "1" });
  };

  return (
    <div className="flex w-full justify-between gap-4">
      <div className="relative w-fit">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 momants-light-extrasmall-gray w-3 h-3 focus:outline-none" />
        <input
          type="text"
          placeholder="Search for campaigns"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            if (Number(page) > 1) setQueryParam({ page: "1" });
          }}
          className="w-full text-sm pl-8 pr-8 py-2 border rounded-3xl placeholder-gray-500 placeholder:text-sm"
        />
        {searchInput && (
          <button
            onClick={() => setSearchInput("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 momants-light-extrasmall-gray hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex w-fit gap-2">
        <MultiFilterButton
          buttonText="Select send status"
          dropdownText="Select by send status"
          activeFilters={sendedFilters}
          setActiveFilters={(v) => handleFilterChange("send_status", v)}
          filters={sendedFiltersOptions}
        />
        <MultiFilterButton
          buttonText="Select status"
          dropdownText="Select by status"
          activeFilters={statusFilters}
          setActiveFilters={(v) => handleFilterChange("status", v)}
          filters={activeFiltersOptions}
        />
        <MultiFilterButton
          buttonText="Select Campaign type"
          dropdownText="Select by campaign type"
          activeFilters={campaignFilters}
          setActiveFilters={(v) => handleFilterChange("campaign_type", v)}
          filters={campaignFiltersOptions}
        />
      </div>
    </div>
  );
};
