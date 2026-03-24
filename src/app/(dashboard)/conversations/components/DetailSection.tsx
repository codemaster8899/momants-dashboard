"use client";

import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { OrderHistoryDisplay } from "./OrderHistoryDisplay";
import { ShoppingCartDisplay } from "./ShoppingCartDisplay";

export const DetailSection = () => {
  const { selectedMemberId } = useConversationsMemberStore();

  const detailHeaderText = selectedMemberId ? "Details" : "";

  return (
    <section className="h-full flex flex-col">
      {/* detail header */}
      <div className="h-16 border-b text-md font-[500] border-gray-200 p-4 flex items-center">
        {detailHeaderText}
      </div>

      {/* scrollable detail content */}
      {selectedMemberId && (
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* shopping cart section */}
          <ShoppingCartDisplay />

          {/* order history section */}
          <OrderHistoryDisplay />

          {/* TODO: Customer Journey widget paused, to be implemented later, see zustand store select message */}
          {/* <JourneyDisplay /> */}
        </div>
      )}
    </section>
  );
};
