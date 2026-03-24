import { defaultDaysBetween } from "@/constants";
import { create } from "zustand";

export type SelectedDates = {
	start: Date | null;
	end: Date | null;
};

type selectedConversationsDatesStore = {
	selectedDates: SelectedDates;
	setSelectedDates: (dates: SelectedDates) => void;
};

export const useSelectedConversationsDatesStore = create<selectedConversationsDatesStore>(
	(set) => ({
		selectedDates: {
			start: new Date(Date.now() - defaultDaysBetween * 24 * 60 * 60 * 1000),
			end: new Date(), // today
			// NOTE: check if on reload it gives the newest conversations in /conversations
		},
		setSelectedDates: (dates) => set({ selectedDates: dates }),
	}),
);
