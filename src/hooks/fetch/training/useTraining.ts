import { useMeStore } from "@/stores/data/useMeStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import useTrainingFilters from "./useTrainingFilters";
import { API } from "@/lib/api";
import type { ITrainingResponse } from "@/app/(dashboard)/training/types";
import createQueryParams from "@/utils/createParams";

interface ITrainingBody {
  category: string;
  question: string;
  answer: string;
}

const trainingFetcher = async (
  endpoint: string,
  params: string,
  method: string = "GET",
  data?: ITrainingBody,
) => {
  try {
    const res = await API(`/dashboard${endpoint}${params}`, {
      method,
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!res.ok) throw new Error(`Failed to ${method} training data`);
    return res.json();
  } catch (error) {
    throw new Error(
      `Error during ${method} training data: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

const getTraining = async (params: string) => {
  const res: ITrainingResponse = await trainingFetcher("/qa_files/", params);
  return res;
};

const createTraining = async (params: string, data: ITrainingBody) => {
  const res = await trainingFetcher("/qa_file/create", params, "POST", data);
  return res;
};

const updateTraining = async (
  params: string,
  id: string,
  data: ITrainingBody,
) => {
  const res = await trainingFetcher(`/qa_file/${id}`, params, "PUT", data);
  return res;
};

const deleteTraining = async (params: string, id: string) => {
  const res = await trainingFetcher(`/qa_file/${id}`, params, "DELETE");
  return res;
};

const useGetTraining = () => {
  const { currentAgent } = useMeStore();
  const { filter, search, selectedCategory } = useTrainingFilters();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
    file_type: filter,
    search,
    category: selectedCategory,
  });

  return useQuery({
    queryKey: [
      "training",
      "qa_files",
      currentAgent?.id,
      filter,
      search,
      selectedCategory,
    ],
    queryFn: () => {
      if (!currentAgent?.id) throw new Error("Agent id is missing");
      return getTraining(params);
    },
    enabled: !!currentAgent?.id,
  });
};

const useCreateTraining = () => {
  const { currentAgent } = useMeStore();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
  });

  return useMutation({
    mutationKey: ["training", "create_qa_file", params],
    mutationFn: (data: ITrainingBody) => {
      if (!params) throw new Error("Agent id is missing");
      return createTraining(params, data);
    },
  });
};

const useUpdateTraining = () => {
  const { currentAgent } = useMeStore();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
  });

  return useMutation({
    mutationKey: ["training", "update_qa_file", params],
    mutationFn: ({ id, data }: { id: string; data: ITrainingBody }) => {
      if (!params) throw new Error("Agent id is missing");
      return updateTraining(params, id, data);
    },
  });
};

const useDeleteTraining = () => {
  const { currentAgent } = useMeStore();
  const params = createQueryParams({
    agent_id: currentAgent?.id,
  });

  return useMutation({
    mutationKey: ["training", "delete_qa_file", params],
    mutationFn: (id: string) => {
      if (!params) throw new Error("Agent id is missing");
      return deleteTraining(params, id);
    },
  });
};

export {
  useCreateTraining,
  useDeleteTraining,
  useGetTraining,
  useUpdateTraining,
};
