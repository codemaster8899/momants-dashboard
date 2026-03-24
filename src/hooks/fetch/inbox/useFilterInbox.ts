"use client";

import useSetQueryParams from "@/hooks/useSetQueryParam";
import { useSelectedConversationsDatesStore } from "@/stores/data/useSelectedConversationsDatesStore";
import { useRouter, useSearchParams } from "next/navigation";

const useFilterInbox = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const {
		selectedDates: { start: start_date, end: end_date },
	} = useSelectedConversationsDatesStore();
	const setQueryParam = useSetQueryParams();

	const search = searchParams.get("search") as string | null;
	const conversation_type = searchParams.get("conversation_type") as string | null;

	return {
		setQueryParam,
		router,
		search,
		start_date,
		end_date,
		conversation_type,
	};
};

export default useFilterInbox;
