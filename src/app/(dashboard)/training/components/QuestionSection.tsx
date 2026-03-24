"use client";

import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import LoadingState from "@/components/shared/LoadingState";
import { useDeleteTraining } from "@/hooks/fetch/training/useTraining";
import { useState } from "react";
import type { ITrainingItem } from "../types";
import { QuestionItemDisplay } from "./QuestionItemDisplay";
import { QuestionPopup } from "./QuestionPopup";
import { useTrainingContext } from "./TrainingContext";
import { TrainingNavBar } from "./TrainingNavBar";
import { PartyPopper } from "lucide-react";

export const QuestionSection = () => {
	const { qaFiles, refetch, isLoading, isError } = useTrainingContext();
	const { mutateAsync } = useDeleteTraining();
	const [completedCount, setCompletedCount] = useState(0);
	const [selectedItem, setSelectedItem] = useState<ITrainingItem | null>(null);
	const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

	const onClose = () => {
		setSelectedItem(null);
		setSelectedItemIndex(null);
		setCompletedCount(0);
		refetch();
	};

	const handleSelectItem = (item: ITrainingItem, index: number) => {
		setSelectedItem(item);
		setSelectedItemIndex(index);
	};

	const handleDelete = async (id: string) => {
		await mutateAsync(id);
		refetch();
	};

	const handlePrevious = () => {
		if (selectedItemIndex === null) return;
		const previousIndex = selectedItemIndex - 1;
		setSelectedItem(qaFiles[previousIndex]);
		setSelectedItemIndex(previousIndex);
	};

	const handleSkip = () => {
		if (selectedItemIndex === null) return;
		if (selectedItemIndex === qaFiles.length - 1) return onClose();
		const nextIndex = selectedItemIndex + 1;
		setSelectedItem(qaFiles[nextIndex]);
		setSelectedItemIndex(nextIndex);
	};

	return (
		<div className="flex flex-col h-full">
			{/* information header */}
			<div className="min-h-[70px] box-border w-full border-b border-gray-200 flex items-center px-6">
				<p className="momants-semibold-mediumlarge-black">Training</p>
			</div>

			{/* navigation bar */}
			<TrainingNavBar />

			{/* questions list */}
			{isLoading ? (
				<LoadingState />
			) : isError ? (
				<ErrorState />
			) : qaFiles.length > 0 ? (
				<div className="flex-1 overflow-y-auto min-h-0 px-6 py-4 flex flex-col gap-4">
					{qaFiles?.map((item, idx) => (
						<QuestionItemDisplay
							key={idx}
							item={item}
							onSelect={() => handleSelectItem(item, idx)}
							onDelete={handleDelete}
						/>
					))}

					{selectedItem && (
						<QuestionPopup
							item={selectedItem}
							itemIndex={selectedItemIndex!}
							itemsLength={qaFiles.length}
							onClose={onClose}
							onPrevious={handlePrevious}
							onSkip={handleSkip}
							completedCount={completedCount}
							setCompletedCount={setCompletedCount}
						/>
					)}
				</div>
			) : (
				<EmptyState text="Your agent is fully trained!" Icon={PartyPopper} />
			)}
		</div>
	);
};
