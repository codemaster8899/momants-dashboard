"use client";

import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import { emptyDataPointsValue } from "@/constants";
import useGetStats from "@/hooks/fetch/dashboard/useDashboard";
import { useSelectedDashboardDatesStore } from "@/stores/data/useSelectedDashboardDatesStore";
import { MessagesSquare } from "lucide-react";
import { miniBoxList } from "../constants";
import { DatePickerButton } from "./DatePickerButton";
import DotChart from "./DotChart";
import { KpiCard } from "./KpiCard";
import { LineChartCard } from "./LineChartCard";
import PieCharts from "./PieCharts";
import QuestionsList from "./QuestionsList";

export const Overview = () => {
  const { selectedDates, timeUnit } = useSelectedDashboardDatesStore();
  const { data, isLoading } = useGetStats({
    time_unit: timeUnit,
    start_date: selectedDates.start,
    end_date: selectedDates.end,
  });

  return !data && !isLoading ? (
    <ErrorState />
  ) : data ? (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="momants-bold-huge-black">Overview</h1>
        <DatePickerButton />
      </div>
      <LineChartCard
        icon={MessagesSquare}
        title="Total conversations"
        tooltipLabel="Conversations"
        totalAmount={data.conversations?.summary.total ?? "-"}
        data={data.conversations?.data ?? emptyDataPointsValue}
        isLoading={isLoading}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
        {miniBoxList.map(({ keyName, ...props }, i) => (
          <KpiCard
            key={i}
            {...props}
            data={data[keyName]}
            isLoading={isLoading}
            currency={data.currency}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        <PieCharts data={data} />
        <DotChart data={data.conversation_heatmap?.data} />
      </div>
      <QuestionsList data={data} />
    </div>
  ) : (
    <LoadingState />
  );
};
