"use client";

import useSetQueryParams from "@/hooks/useSetQueryParam";
import { useSearchParams } from "next/navigation";

const useCampaignFilters = () => {
  const searchParams = useSearchParams();
  const setQueryParam = useSetQueryParams();

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") as string | null;
  const status = searchParams.get("status") as string | null;
  const send_status = searchParams.get("send_status") as string | null;
  const campaign_type = searchParams.get("campaign_type") as string | null;

  return {
    page,
    search,
    status,
    send_status,
    campaign_type,
    setQueryParam,
  };
};

export default useCampaignFilters;
