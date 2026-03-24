"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useSetQueryParams = () => {
  const router = useRouter();

  const setQueryParam = useCallback(
    (queryParam: { [key: string]: string | undefined | null }) => {
      const params = new URLSearchParams(window.location.search);

      Object.entries(queryParam).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      router.push(`?${params.toString()}`);
    },
    [router],
  );

  return setQueryParam;
};

export default useSetQueryParams;
