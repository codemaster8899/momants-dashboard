"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useConversationsStateStore } from "@/stores/ui/useConversationsStateStore";

export const ChatSearchToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const { chatSearchQuery, setChatSearchQuery } = useConversationsStateStore();

  const handleCollapse = () => {
    setExpanded(false);
    setChatSearchQuery("");
  };

  return (
    <div className="flex items-center gap-2">
      {expanded ? (
        <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 bg-white transition-all">
          <Search
            size={15}
            className="momants-light-extrasmall-gray flex-shrink-0"
          />
          <input
            type="text"
            value={chatSearchQuery}
            onChange={(e) => setChatSearchQuery(e.target.value)}
            onBlur={handleCollapse}
            autoFocus
            placeholder="Search"
            className="focus:outline-none w-full placeholder:text-sm font-normal"
          />
          <button
            onMouseDown={(e) => e.preventDefault()} // Prevents blur when clicking X
            onClick={handleCollapse}
            className="hover:momants-light-extrasmall-gray flex-shrink-0"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <button
          className="p-2 border border-gray-200 hover:bg-gray-100 bg-white rounded-full"
          onClick={() => setExpanded(true)}
        >
          <Search size={15} className="momants-light-extrasmall-gray" />
        </button>
      )}
    </div>
  );
};
