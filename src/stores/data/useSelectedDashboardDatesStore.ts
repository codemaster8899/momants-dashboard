import { defaultDaysBetween, defaultTimeUnit, TimeUnit } from "@/constants";
import { create } from "zustand";

export type SelectedDates = {
	start: Date | null;
	end: Date | null;
};

type selectedDashboardDatesStore = {
	selectedDates: SelectedDates;
	setSelectedDates: (dates: SelectedDates) => void;

	timeUnit: TimeUnit;
	setTimeUnit: (timeUnit: TimeUnit) => void;
};

export const useSelectedDashboardDatesStore = create<selectedDashboardDatesStore>((set) => ({
	selectedDates: {
		start: new Date(Date.now() - defaultDaysBetween * 24 * 60 * 60 * 1000),
		end: new Date(), // today
	},
	setSelectedDates: (dates) => set({ selectedDates: dates }),

	timeUnit: defaultTimeUnit,
	setTimeUnit: (timeUnit: TimeUnit) => set({ timeUnit: timeUnit }),
}));
