import type {
	InboxMessageApiItem,
	InboxMessagesApiDetails,
	InboxMessagesApiResponse,
	Message,
} from "@/app/(dashboard)/conversations/types";
import { API } from "@/lib/api";
import { useMeStore } from "@/stores/data/useMeStore";
import createQueryParams from "@/utils/createParams";
import { useInfiniteQuery } from "@tanstack/react-query";

const DEFAULT_LIMIT = 50;

const getInboxMessages = async (conversationId: string, params: string) => {
	const res = await API(`/dashboard/inbox/${conversationId}${params}`)
		.then((response) => response.json())
		.catch(() => null);

	return res as InboxMessagesApiResponse | null;
};

type InboxMessagesPage = {
	messages: Message[];
	details: InboxMessagesApiDetails | null;
};

export const useInboxMessages = (conversationId: string | null) => {
	const { currentAgent } = useMeStore();

	return useInfiniteQuery<InboxMessagesPage>({
		queryKey: ["inbox-messages", conversationId],
		enabled: !!conversationId && !!currentAgent?.id,
		initialPageParam: undefined as string | undefined,
		queryFn: async ({ pageParam }) => {
			if (!conversationId) {
				return { messages: [], details: null };
			}

			const params = createQueryParams({
				before: pageParam as string | undefined,
				limit: DEFAULT_LIMIT,
				agent_id: currentAgent?.id,
			});

			const res = await getInboxMessages(conversationId, params);
			if (!res || !Array.isArray(res.messages)) {
				return { messages: [], details: null };
			}

			const mappedMessages: Message[] = res.messages.map((item: InboxMessageApiItem) => ({
				id: item.id ?? "",
				from_agent: item.from_agent,
				message_content: item.message_content,
				conversation_id: conversationId,
				created_at: item.created_at,
				touchpoints: [],
			}));

			return {
				messages: mappedMessages,
				details: res.details ?? null,
			};
		},
		getNextPageParam: (lastPage) => {
			if (!lastPage.messages.length || lastPage.messages.length < DEFAULT_LIMIT) {
				return undefined;
			}

			const oldestMessage = lastPage.messages[lastPage.messages.length - 1];
			return oldestMessage.created_at;
		},
	});
};
