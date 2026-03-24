"use client";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import { useInboxMessages } from "@/hooks/fetch/inbox/useInboxMessages";
import { useConversationWebSocket } from "@/hooks/ws/useConversationWebSocket";
import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { MessageCircle } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Message } from "../types";
import { MessageBubble } from "./MessageBubble";

export const ChatSection = () => {
  const { selectedMemberId, lastMessageId } = useConversationsMemberStore();

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useInboxMessages(selectedMemberId);

  useConversationWebSocket();

  const messages: Message[] = useMemo(() => {
    if (!data) return [];
    const pages = data.pages ?? [];
    const flatMessages = pages.flatMap((page) => page.messages);

    return [...flatMessages].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
  }, [data]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    if (lastMessageId) {
      const target = messageRefs.current.get(lastMessageId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
    }

    // fallback: scroll to last message
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, lastMessageId]);

  // Lazy-load older messages when scrolling to the top
  useEffect(() => {
    if (!containerRef.current || !topSentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: containerRef.current,
        threshold: 0.1,
      },
    );

    observer.observe(topSentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div
      // inline to support different browsers :/
      style={{
        overflowY: "auto",
        msOverflowStyle: "none", // IE & Edge
        scrollbarWidth: "none", // Firefox
      }}
      ref={containerRef}
      className="flex-1 overflow-y-auto p-3"
    >
      {!selectedMemberId && (
        <EmptyState
          text="Select a conversation to see messages."
          Icon={MessageCircle}
        />
      )}

      {selectedMemberId && isPending && <LoadingState />}

      {selectedMemberId && isError && (
        <ErrorState text="Unable to load messages for this conversation." />
      )}

      <div ref={topSentinelRef} />

      {messages.map((message, idx) => {
        const isLast = idx === messages.length - 1;

        return (
          <div
            key={message.id ?? idx}
            ref={(el) => {
              if (!el) return;

              messageRefs.current.set(message.id, el);

              if (isLast) {
                lastMessageRef.current = el;
              }
            }}
          >
            <MessageBubble message={message} />
          </div>
        );
      })}
    </div>
  );
};
