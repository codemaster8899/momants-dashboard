"use client";

import useSetQueryParams from "@/hooks/useSetQueryParam";
import { useSearchParams } from "next/navigation";

const useTemplateFilters = () => {
  const searchParams = useSearchParams();
  const setQueryParam = useSetQueryParams();

  const page = searchParams.get("page") || "1";
  const selectedCategory = searchParams.get("category") as string | null;
  const search = searchParams.get("search") as string | null;

  return { page, selectedCategory, search, setQueryParam };
};

export default useTemplateFilters;
