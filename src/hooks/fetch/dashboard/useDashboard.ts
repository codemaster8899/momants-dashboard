"use client";

import { TStatsResponse } from "@/app/(dashboard)/dashboard/type";
import { TimeUnit } from "@/constants";
import { API } from "@/lib/api";
import { useMeStore } from "@/stores/data/useMeStore";
import createQueryParams from "@/utils/createParams";
import { useQuery } from "@tanstack/react-query";

type FetchDataParams = {
  time_unit: TimeUnit;
  start_date: Date | null;
  end_date: Date | null;
};

const getStats = async (params?: string) => {
  const result: TStatsResponse | null = await API(
    `/dashboard/stats${params}`,
  )
    .then((res) => res.json())
    .catch(() => null);
  return result;
};

const useGetStats = ({ time_unit, start_date, end_date }: FetchDataParams) => {
  const { currentAgent } = useMeStore();

  const params = createQueryParams({
    time_unit,
    start_date: start_date?.toISOString(),
    end_date: end_date?.toISOString(),
    agent_id: currentAgent?.id,
  });

  return useQuery({
    queryKey: ["stats", time_unit, start_date, end_date, currentAgent],
    queryFn: () => getStats(params),
    enabled: !!currentAgent,
  });
};

export default useGetStats;
