"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { useTrainingContext } from "./TrainingContext";

interface ProgressTrackerProps {}

export const ProgressTracker = ({}: ProgressTrackerProps) => {
	const { totalPercentage } = useTrainingContext();

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-2">
				<p className="momants-semibold-small-black">Overall Expertise Growth</p>
				<p className="momants-light-small-gray">{totalPercentage}% trained</p>
			</div>
			<ProgressBar
				percentComplete={totalPercentage}
				barColor="bg-gradient-to-r from-yellow-200 to-green-300"
			/>
		</div>
	);
};
