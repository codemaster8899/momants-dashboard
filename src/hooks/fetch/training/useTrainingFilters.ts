"use client";

import useSetQueryParams from "@/hooks/useSetQueryParam";
import { useSearchParams } from "next/navigation";

export type TFilter = "open" | "trained";

const useTrainingFilters = () => {
  const searchParams = useSearchParams();
  const setQueryParam = useSetQueryParams();

  const filter = (searchParams.get("file_type") || "open") as TFilter;
  const selectedCategory = searchParams.get("category") as string | null;
  const search = searchParams.get("search") as string | null;

  return { filter, selectedCategory, search, setQueryParam };
};

export default useTrainingFilters;
