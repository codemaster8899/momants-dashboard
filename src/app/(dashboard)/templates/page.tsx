"use client";

import { PageHeader } from "@/components/Layout/PageHeader";
import PageWrapper from "@/components/Layout/PageWrapper";
import { Pagination } from "@/components/Layout/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import {
  useCreateTemplate,
  useDeleteTemplate,
  useGetTemplate,
} from "@/hooks/fetch/template/useTemplate";
import useTemplateFilters from "@/hooks/fetch/template/useTemplateFilters";
import { Zap } from "lucide-react";
import { Suspense, useState } from "react";
import { CreateTemplatePopup } from "./components/CreateTemplatePopup";
import { Filters } from "./components/Filters";
import { TemplateCard } from "./components/TemplateCard";
import { ITemplateBody } from "./types";
import useTemplateWebSocket from "@/hooks/ws/useTemplateWebSocket";

function TemplatesPageContent() {
  useTemplateWebSocket();

  const [openNewPopup, setOpenNewPopup] = useState(false);

  const { data, isLoading, isError, refetch } = useGetTemplate();
  const { page, setQueryParam } = useTemplateFilters();
  const { mutateAsync: createTemplate } = useCreateTemplate();
  const { mutateAsync: deleteTemplate } = useDeleteTemplate();

  const handleNewItem = () => {
    setOpenNewPopup(true);
  };

  const handleCreateTemplate = async (body: ITemplateBody) => {
    await createTemplate(body);
    refetch();
    setOpenNewPopup(false);
  };

  const deleteItem = async (id: string) => {
    await deleteTemplate(id);
    refetch();
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = data?.total_pages ?? 1;
    if (newPage < 1 || newPage > totalPages) return;
    setQueryParam({ page: String(newPage) });
  };

  return (
    <PageWrapper className="p-6" title="Templates" scrollable>
      <PageHeader
        title="Templates"
        description="Create templates for your agent"
        buttonText="New template"
        onNew={handleNewItem}
      />

      {openNewPopup && (
        <CreateTemplatePopup
          data={data}
          onConfirm={handleCreateTemplate}
          onCancel={() => setOpenNewPopup(false)}
        />
      )}

      {/* filter options for the items */}
      <div className="w-full my-4 pb-4 border-b">
        <Suspense fallback={<LoadingState />}>
          <Filters filters={data?.statuses ?? []} />
        </Suspense>
      </div>

      <div className="flex flex-col h-full">
        {isError ? (
          <ErrorState />
        ) : isLoading ? (
          <LoadingState />
        ) : data?.templates.length ? (
          <div className="grid grid-cols-2 gap-4 flex-grow">
            {data.templates.map((item) => (
              <TemplateCard
                key={item.template_id}
                item={item}
                onDelete={() => deleteItem(item.template_id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            Icon={Zap}
            text="Create your first template."
            onOpen={handleNewItem}
          />
        )}

        {data?.templates.length ? (
          <div className="mt-auto py-6">
            <Pagination
              pageIndex={Number(page) || 1}
              totalPages={data?.total_pages ?? 1}
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
      <TemplatesPageContent />
    </Suspense>
  );
}
