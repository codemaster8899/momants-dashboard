"use client";

import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import useGetInbox from "@/hooks/fetch/inbox/useInbox";
import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { Inbox } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import type { InboxItem, InboxResponse } from "../types";
import { InboxEntryDisplay } from "./InboxEntryDisplay";
import { SearchHeader } from "./SearchHeader";

export function InboxSection() {
  const {
    selectedMemberId,
    setSelectedMemberId,
    setSelectedMemberName,
    setConversationEndedAt,
    setTakeOver,
    setLastMessageId,
  } = useConversationsMemberStore();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInbox();

  const inboxData: InboxItem[] = useMemo(() => {
    if (!data) return [];
    const pages = data.pages as (InboxResponse | null)[];
    return pages.flatMap((page) => page?.inbox_entries ?? []);
  }, [data]);

  const toggleSelectedMember = (inboxEntry: InboxItem) => {
    const isSame = selectedMemberId === inboxEntry.conversation_id;

    setSelectedMemberId(isSame ? null : inboxEntry.conversation_id);
    setSelectedMemberName(isSame ? null : inboxEntry.member_name);

    setTakeOver(isSame ? false : inboxEntry.takeover);
    setConversationEndedAt(null);

    setLastMessageId(null);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !bottomSentinelRef.current) return;

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

    observer.observe(bottomSentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-[400px] mx-auto border-b border-r border-gray-200 flex flex-col h-full">
      <section className="h-16 p-3 border-b border-gray-200 flex-shrink-0">
        <SearchHeader />
      </section>
      <section
        ref={containerRef}
        className="px-2 py-1 flex-1 overflow-y-auto min-h-0"
      >
        {isLoading && <LoadingState />}
        {!isLoading && isError && <ErrorState text="Something went wrong" />}
        {!isLoading && !isError && inboxData.length === 0 && (
          <EmptyState Icon={Inbox} text="No conversations found" />
        )}

        {!isLoading &&
          !isError &&
          inboxData.map((inboxEntry: InboxItem, index: number) => (
            <InboxEntryDisplay
              inboxEntry={inboxEntry}
              key={index}
              onClick={() => toggleSelectedMember(inboxEntry)}
              isSelected={selectedMemberId === inboxEntry.conversation_id}
            />
          ))}

        <div ref={bottomSentinelRef} className="h-4" />

        {hasNextPage && isFetchingNextPage && <LoadingState />}
      </section>
    </div>
  );
}
