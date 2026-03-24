import { ArrowDownLeft, ArrowUpRight, LucideIcon } from "lucide-react";
import formatMoney from "@/utils/formatMoney";
import type { TMetric } from "../type";
import SparkLine from "./SparkLine";
import { twMerge } from "tailwind-merge";
import { formatDatePicker } from "@/utils/formatDatetime";
import { useSelectedDashboardDatesStore } from "@/stores/data/useSelectedDashboardDatesStore";
import Tooltip from "@/components/shared/Tooltip";

interface KpiCardProps {
  icon: LucideIcon;
  title: string;
  data: TMetric;
  type: "money" | "number";
  currency: string;
  isLoading?: boolean;
}

export const KpiCard = ({
  icon: Icon,
  title,
  data,
  type,
  currency,
  isLoading = false,
}: KpiCardProps) => {
  const { selectedDates } = useSelectedDashboardDatesStore();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col h-full animate-pulse">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-16 bg-gray-200 rounded mt-1" />
        <div className="flex-1 mt-4 min-h-[50px]">
          <div className="h-full w-full bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

  const {
    total_current_period,
    tooltip_title,
    data: dataPoints,
    relative_change,
  } = data;

  const showDashUI = dataPoints.length === 0 || total_current_period === null;
  const relativeChangeHasValue = relative_change !== null;
  const isIncreased = relative_change && relative_change > 0;
  const ArrowIcon = isIncreased ? ArrowUpRight : ArrowDownLeft;

  const value = !showDashUI
    ? type === "money"
      ? formatMoney(Number(total_current_period), currency)
      : total_current_period
    : "-";

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 gap-2 p-6">
      <div className="flex items-center gap-2 momants-light-small-gray">
        <Icon size={16} />
        {title}
      </div>
      <div className="grid grid-cols-2 gap-2 min-h-20 items-center">
        <div className="flex flex-col gap-2 group/tooltip">
          <div className="mt-1 flex items-center gap-1">
            <span className="momants-semibold-huge-black">{value}</span>
            {relativeChangeHasValue && (
              <>
                <ArrowIcon
                  className={twMerge(
                    "rounded-sm text-white",
                    isIncreased ? "bg-green-700" : "bg-red-700",
                  )}
                  size={16}
                />
                <span
                  className={twMerge(
                    "momants-light-small-gray",
                    isIncreased ? "!text-green-700" : "!text-red-700",
                  )}
                >
                  {relative_change}%
                </span>
              </>
            )}
          </div>
          {relativeChangeHasValue && (
            <span className="momants-light-small-gray lowercase">
              vs {formatDatePicker(selectedDates.start, selectedDates.end)}
            </span>
          )}
          <Tooltip>{tooltip_title}</Tooltip>
        </div>

        {!showDashUI && (
          <div className="w-full h-full">
            <SparkLine
              data={dataPoints}
              color={isIncreased ? "#15803D" : "#991B1B"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
