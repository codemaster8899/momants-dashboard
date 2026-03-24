import type {
  ITemplateBody,
  TemplateResponse,
} from "@/app/(dashboard)/templates/types";
import { API } from "@/lib/api";
import { useMeStore } from "@/stores/data/useMeStore";
import createQueryParams from "@/utils/createParams";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import useTemplateFilters from "./useTemplateFilters";

const templateFetcher = async (
  endpoint: string,
  params: string,
  method: string = "GET",
  data?: ITemplateBody,
) => {
  const res = await API(`/dashboard${endpoint}${params}`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((res) => res.json())
    .catch(() => null);

  return res;
};

const getTemplate = async (params: string) => {
  const res: TemplateResponse | null = await templateFetcher(
    "/templates/",
    params,
  );
  return res;
};

const createTemplate = async (params: string, data: ITemplateBody) => {
  const res = await templateFetcher("/template/create", params, "POST", data);
  return res;
};

const updateTemplate = async (
  params: string,
  id: string,
  data: ITemplateBody,
) => {
  const res = await templateFetcher(`/template/${id}`, params, "PUT", data);
  return res;
};

const deleteTemplate = async (params: string, id: string) => {
  const res = await templateFetcher(`/template/${id}`, params, "DELETE");
  return res;
};

const useGetTemplate = () => {
  const { currentAgent } = useMeStore();
  const { page, search, selectedCategory } = useTemplateFilters();
  const hasLoadedFiltersRef = useRef(false);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [
      "Template",
      "templates",
      currentAgent?.id,
      page,
      search,
      selectedCategory,
    ],
    queryFn: async () => {
      const params = createQueryParams({
        agent_id: currentAgent?.id,
        search,
        status: selectedCategory,
        page,
        send_filters: !hasLoadedFiltersRef.current,
      });

      const res = await getTemplate(params);
      if (!res) return res;

      const queryKey = ["Template", "templates"] as const;

      if (!hasLoadedFiltersRef.current) {
        hasLoadedFiltersRef.current = true;
        queryClient.setQueryData<TemplateResponse | null>(queryKey, res);
        return res;
      }

      const prev =
        queryClient.getQueryData<TemplateResponse | null>(queryKey) ?? null;

      const merged: TemplateResponse = {
        templates: res.templates,
        total_pages: res.total_pages,
        statuses: res.statuses ?? prev?.statuses,
        categories: res.categories ?? prev?.categories,
        languages: res.languages ?? prev?.languages,
        message_platforms: res.message_platforms ?? prev?.message_platforms,
      };

      queryClient.setQueryData(queryKey, merged);
      return merged;
    },
    enabled: !!currentAgent?.id,
  });
};

const useCreateTemplate = () => {
  const { currentAgent } = useMeStore();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
  });

  return useMutation({
    mutationKey: ["Template", "create_template", params],
    mutationFn: (data: ITemplateBody) => {
      if (!params) throw new Error("Agent id is missing");
      return createTemplate(params, data);
    },
  });
};

const useUpdateTemplate = () => {
  const { currentAgent } = useMeStore();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
  });

  return useMutation({
    mutationKey: ["Template", "update_template", params],
    mutationFn: ({ id, data }: { id: string; data: ITemplateBody }) => {
      if (!params) throw new Error("Agent id is missing");
      return updateTemplate(params, id, data);
    },
  });
};

const useDeleteTemplate = () => {
  const { currentAgent } = useMeStore();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
  });

  return useMutation({
    mutationKey: ["Template", "delete_template", params],
    mutationFn: (id: string) => {
      if (!params) throw new Error("Agent id is missing");
      return deleteTemplate(params, id);
    },
  });
};

export {
  useCreateTemplate,
  useDeleteTemplate,
  useGetTemplate,
  useUpdateTemplate,
};
