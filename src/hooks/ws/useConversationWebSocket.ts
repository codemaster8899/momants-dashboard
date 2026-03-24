import type { Message } from "@/app/(dashboard)/conversations/types";
import { useWebSocket } from "@/hooks/ws/useWebSocket";
import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import type { MessageWithTypePayload } from "@/types/InteractiveMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

type ConversationWsPayload = {
  id?: string;
  conversation_id?: string;
  from_agent?: boolean;
  message_with_type?: MessageWithTypePayload;
  created_at?: string;
  touchpoints?: Message["touchpoints"];
  code?: number;
  message?: string;
  [key: string]: unknown;
};

export const useConversationWebSocket = () => {
  const { selectedMemberId, setLastMessageId } = useConversationsMemberStore();
  const queryClient = useQueryClient();

  const handleJsonMessage = useCallback(
    (payload: unknown) => {
      if (!selectedMemberId) return;
      if (!payload || typeof payload !== "object") return;

      const data = payload as ConversationWsPayload;

      if (typeof data.code === "number") return;

      if (!data.id || !data.message_with_type) return;

      const conversationId = data.conversation_id ?? selectedMemberId;
      if (conversationId !== selectedMemberId) return;

      const newMessage: Message = {
        id: data.id,
        conversation_id: conversationId,
        from_agent: Boolean(data.from_agent),
        // map message_with_type -> message_content
        message_content: data.message_with_type,
        created_at: data.created_at ?? new Date().toISOString(),
        touchpoints: (data.touchpoints as Message["touchpoints"]) ?? [],
      };

      queryClient.setQueryData(
        ["inbox-messages", selectedMemberId],
        (existing: any) => {
          if (!existing || !Array.isArray(existing.pages)) return existing;

          const pages = existing.pages as Array<{
            messages: Message[];
            details: unknown;
          }>;

          const lastPageIndex = pages.length - 1;
          if (lastPageIndex < 0) return existing;

          const lastPage = pages[lastPageIndex];

          if (lastPage.messages.some((m) => m.id === newMessage.id))
            return existing;

          const updatedPages = [...pages];
          updatedPages[lastPageIndex] = {
            ...lastPage,
            messages: [...lastPage.messages, newMessage],
          };

          return {
            ...existing,
            pages: updatedPages,
          };
        },
      );

      setLastMessageId(newMessage.id);
    },
    [queryClient, selectedMemberId, setLastMessageId],
  );

  const { isConnected, send } = useWebSocket({
    path: selectedMemberId ? `/ws/dashboard/${selectedMemberId}/` : "",
    enabled: Boolean(selectedMemberId),
    onJsonMessage: handleJsonMessage,
  });

  const sendMessage = useCallback(
    (content: string) => {
      if (!selectedMemberId || !content.trim()) return;

      send({ message: content });
    },
    [selectedMemberId, send],
  );

  const sendTakeover = useCallback(
    (takeover: boolean) => {
      if (!selectedMemberId) return;
      send({ takeover });
    },
    [selectedMemberId, send],
  );

  return {
    isConnected,
    sendMessage,
    sendTakeover,
  };
};
