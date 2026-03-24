"use client";

import { useGetTraining } from "@/hooks/fetch/training/useTraining";
import useTrainingFilters from "@/hooks/fetch/training/useTrainingFilters";
import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { ITrainingCategory, ITrainingItem } from "../types";

interface TrainingContextValue {
	qaFiles: ITrainingItem[];
	categories: ITrainingCategory[];
	counts: {
		open: number;
		trained: number;
	};
	totalPercentage: number;
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
	setQueryParam: (
		queryParam: Partial<Record<"file_type" | "category" | "search" | "page", string>>,
	) => void;
}

const TrainingContext = createContext<TrainingContextValue | undefined>(undefined);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
	const { setQueryParam } = useTrainingFilters();
	const { data, isLoading, isError, refetch } = useGetTraining();

	const value = useMemo<TrainingContextValue>(() => {
		const {
			qa_files = [],
			categories = [],
			open_count = 0,
			trained_count = 0,
			total_percentage = 0,
		} = data || {};

		return {
			qaFiles: qa_files,
			categories,
			counts: {
				open: open_count,
				trained: trained_count,
			},
			totalPercentage: total_percentage * 100,
			isLoading,
			isError,
			refetch,
			setQueryParam,
		};
	}, [data, isLoading, refetch, setQueryParam]);

	return <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>;
};

export const useTrainingContext = () => {
	const context = useContext(TrainingContext);

	if (!context) {
		throw new Error("useTrainingContext must be used within a TrainingProvider");
	}

	return context;
};
