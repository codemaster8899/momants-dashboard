import type {
  CampaignsResponse,
  CreateCampaignResponse,
  DeleteCampaignResponse,
  TCreateCampaign,
} from "@/app/(dashboard)/campaigns/types";
import { API } from "@/lib/api";
import { useMeStore } from "@/stores/data/useMeStore";
import createQueryParams from "@/utils/createParams";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import useCampaignFilters from "./useCampaignsFilters";

const campaignFetcher = async (
  endpoint: string,
  params: string,
  method: string = "GET",
  data?: TCreateCampaign,
) => {
  const res = await API(`/dashboard${endpoint}${params}`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((res) => res.json())
    .catch(() => null);

  return res;
};

const getCampaigns = async (
  params: string,
): Promise<CampaignsResponse | null> => {
  const res = await campaignFetcher("/campaigns", params);
  return res;
};

const createCampaign = async (params: string, data: TCreateCampaign) => {
  const res: CreateCampaignResponse | null = await campaignFetcher(
    "/campaign/create",
    params,
    "POST",
    data,
  );
  return res;
};

const deleteCampaign = async (
  params: string,
  campaign_id: string,
): Promise<DeleteCampaignResponse | null> => {
  const res = await campaignFetcher(
    `/campaign/${campaign_id}`,
    params,
    "DELETE",
  );
  return res;
};

const useGetCampaigns = () => {
  const { currentAgent } = useMeStore();
  const { page, search, status, send_status, campaign_type } =
    useCampaignFilters();
  const hasLoadedFiltersRef = useRef(false);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [
      "Campaign",
      "campaigns",
      currentAgent?.id,
      page,
      search,
      status,
      send_status,
      campaign_type,
    ],
    queryFn: async () => {
      const params = createQueryParams({
        agent_id: currentAgent?.id,
        send_status,
        status,
        campaign_type,
        search,
        page,
        send_filters: !hasLoadedFiltersRef.current,
      });

      const res = await getCampaigns(params);
      if (!res) return res;

      const queryKey = ["Campaign", "campaigns"] as const;

      if (!hasLoadedFiltersRef.current) {
        hasLoadedFiltersRef.current = true;
        queryClient.setQueryData<CampaignsResponse | null>(queryKey, res);
        return res;
      }

      const prev =
        queryClient.getQueryData<CampaignsResponse | null>(queryKey) ?? null;

      const merged: CampaignsResponse = {
        campaigns: res.campaigns,
        total_pages: res.total_pages,
        approved_templates: res.approved_templates ?? prev?.approved_templates,
        message_platforms: res.message_platforms ?? prev?.message_platforms,
        trigger_actions: res.trigger_actions ?? prev?.trigger_actions,
        delays: res.delays ?? prev?.delays,
        send_statuses: res.send_statuses ?? prev?.send_statuses,
        statuses: res.statuses ?? prev?.statuses,
        campaign_types: res.campaign_types ?? prev?.campaign_types,
      };

      queryClient.setQueryData(queryKey, merged);
      return merged;
    },
    enabled: !!currentAgent?.id,
  });
};

const useCreateCampaign = () => {
  const { currentAgent } = useMeStore();
  const queryClient = useQueryClient();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
  });

  return useMutation({
    mutationKey: ["Campaign", "create_campaign", params],
    mutationFn: (data: TCreateCampaign) => {
      if (!params) throw new Error("Agent id is missing");
      return createCampaign(params, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Campaign", "campaigns"] });
    },
  });
};

const useDeleteCampaign = () => {
  const { currentAgent } = useMeStore();
  const queryClient = useQueryClient();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
  });

  return useMutation({
    mutationKey: ["Campaign", "delete_campaign", params],
    mutationFn: (campaign_id: string) => {
      if (!params) throw new Error("Agent id is missing");
      return deleteCampaign(params, campaign_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Campaign", "campaigns"] });
    },
  });
};

export { useCreateCampaign, useDeleteCampaign, useGetCampaigns };
