"use client";

import { PanelLeftOpen, PanelRightOpen, Search } from "lucide-react";
import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { useConversationsStateStore } from "@/stores/ui/useConversationsStateStore";
import { ChatSearchToggle } from "./ChatSearchToggle ";

export const ChatHeader = () => {
  const { selectedMemberId, selectedMemberName } =
    useConversationsMemberStore();
  const { detailOpen, setDetailOpen } = useConversationsStateStore();

  return (
    <div className="flex items-center h-16 border-b border-gray-200 p-3">
      {selectedMemberId && (
        <>
          <p className="momants-semibold-medium-black">{selectedMemberName}</p>

          <div className="ml-auto flex items-center gap-2">
            <ChatSearchToggle />
            {/* render the button depending on the fold state */}
            <button
              onClick={() => setDetailOpen(!detailOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {detailOpen ? (
                <PanelLeftOpen
                  size={15}
                  className="momants-light-extrasmall-gray"
                />
              ) : (
                <PanelRightOpen
                  size={15}
                  className="momants-light-extrasmall-gray"
                />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
