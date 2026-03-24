"use client";

import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { useConversationsStateStore } from "@/stores/ui/useConversationsStateStore";
import { ChatAgentToggle } from "./ChatAgentToggle";
import { ChatHeader } from "./ChatHeader";
import { ChatSection } from "./ChatSection";
import { ChatSectionInput } from "./ChatSectionInput";
import { DetailSection } from "./DetailSection";

export const MemberSection = () => {
  const { detailOpen } = useConversationsStateStore();
  const { selectedMemberId } = useConversationsMemberStore();
  const chatSectionWidth = detailOpen ? "w-2/3" : "w-full";

  return (
    <section className="flex h-full">
      {/* chat section */}
      <div className={`${chatSectionWidth} relative flex flex-col h-full`}>
        <ChatHeader />

        {/* do not show message, input and toggle component if
         not member is selected */}
        {selectedMemberId && (
          <>
            <ChatAgentToggle />
            <ChatSection />
            <ChatSectionInput />
          </>
        )}
      </div>

      {/* detail section */}
      {detailOpen && (
        <div className="w-1/3 border-l border-b border-gray-200">
          <DetailSection />
        </div>
      )}
    </section>
  );
};
