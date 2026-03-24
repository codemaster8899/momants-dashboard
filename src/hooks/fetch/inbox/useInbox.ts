import type { InboxResponse } from "@/app/(dashboard)/conversations/types";
import { API } from "@/lib/api";
import { useMeStore } from "@/stores/data/useMeStore";
import createQueryParams from "@/utils/createParams";
import { useInfiniteQuery } from "@tanstack/react-query";
import useFilterInbox from "./useFilterInbox";

const getInbox = async (params: string) => {
  const res = await API(`/dashboard/inbox${params}`)
    .then((res) => res.json())
    .catch(() => null);
  return res as InboxResponse | null;
};

const useGetInbox = () => {
  const { currentAgent } = useMeStore();
  const { search, start_date, end_date, conversation_type } = useFilterInbox();

  return useInfiniteQuery<InboxResponse | null>({
    queryKey: [
      "inbox",
      search,
      start_date,
      end_date,
      conversation_type,
      currentAgent?.id,
    ],
    enabled: !!currentAgent?.id,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      const includeFilters = page === 1;

      const params = createQueryParams({
        search,
        start_date: start_date ? start_date.toISOString() : undefined,
        end_date: end_date ? end_date.toISOString() : undefined,
        agent_id: currentAgent?.id,
        conversation_type,
        page,
        send_filters: includeFilters,
      });

      const res = await getInbox(params);
      return res;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;

      const nextPage = allPages.length + 1;
      if (nextPage > lastPage.total_pages) return undefined;

      return nextPage;
    },
  });
};

export default useGetInbox;
