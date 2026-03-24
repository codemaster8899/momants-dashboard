"use client";

import { Pagination } from "@/components/Layout/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import {
  useCreateCampaign,
  useDeleteCampaign,
  useGetCampaigns,
} from "@/hooks/fetch/campaigns/useCampaigns";
import useCampaignFilters from "@/hooks/fetch/campaigns/useCampaignsFilters";
import { Megaphone } from "lucide-react";
import { Suspense, useState } from "react";
import { PageHeader } from "../../../components/Layout/PageHeader";
import PageWrapper from "../../../components/Layout/PageWrapper";
import { CampaignCard } from "./components/CampaignCard";
import { CreateCampaignPopup } from "./components/CreateCampaignPopup";
import { Filters } from "./components/Filters";
import type { Campaign, CampaignsResponse } from "./types";

function mapCampaignToCardProps(
  campaign: Campaign,
  response: CampaignsResponse | null | undefined,
) {
  const templateName = response?.approved_templates?.[0]?.template_name ?? "—";
  const title = `Campaign ${campaign.campaign_id.slice(0, 8)}`;
  const tags = response?.message_platforms?.map((p) => p.display_name) ?? [];

  return {
    id: campaign.campaign_id,
    title,
    templateName,
    tags,
    active: true,
    send: undefined as boolean | undefined,
  };
}

function CampaignsPageContent() {
  const [openNewBroadcastPopup, setOpenNewBroadcastPopup] = useState(false);

  const { page, setQueryParam } = useCampaignFilters();
  const { data, isLoading, isError } = useGetCampaigns();
  const { mutateAsync: createCampaign, isPending: isCreating } =
    useCreateCampaign();
  const { mutateAsync: deleteCampaign } = useDeleteCampaign();

  const campaigns = data?.campaigns ?? [];
  const pageIndex = Number(page) || 1;
  const totalPages = data?.total_pages ?? 1;

  const handleNewBroadcast = () => {
    setOpenNewBroadcastPopup(true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setQueryParam({ page: String(newPage) });
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    await deleteCampaign(campaignId);
  };

  const updateStatus = (_id: string, _value: boolean) => {
    // Optional: future PATCH if API supports toggling status
  };

  return (
    <PageWrapper className="p-6" title="Campaigns">
      <PageHeader
        title="Campaigns"
        description="Automate all your agent responses"
        buttonText="New campaign"
        onNew={handleNewBroadcast}
      />

      {openNewBroadcastPopup && (
        <CreateCampaignPopup
          data={data}
          isLoading={isCreating}
          onConfirm={async (body) => {
            await createCampaign(body);
            setOpenNewBroadcastPopup(false);
          }}
          onCancel={() => {
            setOpenNewBroadcastPopup(false);
          }}
        />
      )}

      <div className="flex flex-col h-full">
        <div className="w-full my-4 pb-4 border-b">
          <Filters
            statusOptions={data?.statuses}
            sendStatusOptions={data?.send_statuses}
            campaignTypeOptions={data?.campaign_types}
          />
        </div>

        <div className="space-y-4 h-full">
          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState text="Failed to load campaigns." />
          ) : campaigns.length ? (
            campaigns.map((campaign, idx) => {
              const { tags, ...props } = mapCampaignToCardProps(campaign, data);
              return (
                <CampaignCard
                  key={`${campaign.campaign_id}-${idx}`}
                  {...props}
                  tags={tags.length ? tags : ["—"]}
                  popupTitle="campaign"
                  onDelete={() => handleDeleteCampaign(campaign.campaign_id)}
                  onToggle={(value) => {
                    updateStatus(campaign.campaign_id, value);
                  }}
                />
              );
            })
          ) : (
            <EmptyState
              Icon={Megaphone}
              text="Create your first campaign."
              onOpen={handleNewBroadcast}
            />
          )}
        </div>

        {campaigns.length ? (
          <div className="mt-auto py-6">
            <Pagination
              pageIndex={pageIndex}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>
    </PageWrapper>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CampaignsPageContent />
    </Suspense>
  );
}
