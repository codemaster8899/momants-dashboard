"use client";

import { cn } from "@/lib/utils";

type SwitchProps = {
	className?: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	disabled?: boolean;
	length?: number; // total width of the switch
};

export function Switch({
	className,
	checked = false,
	onChange,
	disabled,
	length = 48,
}: SwitchProps) {
	const handleClick = () => {
		if (disabled) return;
		onChange?.(!checked);
	};

	const height = length / 2; // typical ratio: height = 50% of width
	const knobSize = height - 2; // small padding inside
	const translateX = checked ? length - knobSize - 2 : 2; // move knob

	return (
		<div
			onClick={handleClick}
			style={{ width: length, height }}
			className={cn(
				"relative inline-flex items-center rounded-full transition-colors duration-200 cursor-pointer",
				checked ? "bg-green-500" : "bg-gray-300",
				disabled && "opacity-50 cursor-not-allowed",
				className,
			)}>
			<div
				style={{
					width: knobSize,
					height: knobSize,
					transform: `translateX(${translateX}px)`,
				}}
				className="absolute bg-white rounded-full shadow-md transition-transform duration-200"
			/>
		</div>
	);
}
