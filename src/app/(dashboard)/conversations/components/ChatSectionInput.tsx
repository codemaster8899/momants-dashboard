"use client";
import { useConversationWebSocket } from "@/hooks/ws/useConversationWebSocket";
import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { isOlderThan24Hours } from "@/utils/olderThen";
import { Send } from "lucide-react";
import { KeyboardEvent, useEffect, useState } from "react";

export const ChatSectionInput = () => {
  const { takeOver, conversationEndedAt } = useConversationsMemberStore();
  const { sendMessage } = useConversationWebSocket();
  const [messageText, setMessageText] = useState("");

  const canSend: boolean = Boolean(messageText.trim().length > 0);
  const oldConversation = isOlderThan24Hours(conversationEndedAt);

  let placeholderText = "Answer customer...";
  if (!takeOver) placeholderText = "Disable AI Assistant to start typing";
  if (oldConversation)
    placeholderText = "Cannot send message - the conversation is closed";

  const disabledInput = Boolean(!takeOver || oldConversation);

  const sendUserMessage = (): void => {
    if (!canSend) return;

    sendMessage(messageText);
    setMessageText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      sendUserMessage();
    }
  };

  //   if the takeover state gets changed, for exemple to not takeover
  //   all the text it the data should just clear
  useEffect(() => {
    setMessageText("");
  }, [takeOver]);

  return (
    <div className="px-5 py-4 bg-white">
      <div className="relative">
        <input
          disabled={disabledInput}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          type="text"
          className="w-full placeholder:momants-light-extrasmall-gray rounded-lg border border-gray-200 p-3 pr-12 disabled:bg-gray-100 focus:ring-0"
        />

        <button
          type="button"
          disabled={!canSend}
          onClick={sendUserMessage}
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${canSend ? "bg-black" : "bg-neutral-400"} p-1.5 rounded-full w-7 h-7 flex items-center justify-center`}
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};
