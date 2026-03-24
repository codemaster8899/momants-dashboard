"use client";

import useFilterInbox from "@/hooks/fetch/inbox/useFilterInbox";
import useGetInbox from "@/hooks/fetch/inbox/useInbox";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ActiveOption } from "./ActiveOption";
import { InactiveOption } from "./InactiveOption";

type FilterOption = {
	value: string;
	label: string;
};


export const FilterButton = () => {
	const { conversation_type, setQueryParam } = useFilterInbox();
	const { data } = useGetInbox();

	const firstPage = data?.pages?.[0] as { conversation_type_options?: FilterOption[] } | undefined;
	const filterOptions: FilterOption[] =
		firstPage?.conversation_type_options ?? [];

	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const toggleFilter = (label: string) => {
		const option = filterOptions.find((o) => o.label === label);
		if (!option) return;

		setQueryParam({
			conversation_type: option.value === conversation_type ? null : option.value,
		});
	};

	// Close popup if clicked outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div ref={containerRef} className="relative w-full">
			{/* Trigger Button */}
			<button
				className="relative flex items-center justify-center p-2 border rounded-full hover:bg-gray-100"
				onClick={() => setOpen((prev) => !prev)}>
				<SlidersHorizontal className="text-gray-500 w-4 h-4" />

				{/* number for the amount of filters that are selected */}
				{conversation_type && (
					<span className="absolute top-0 right-0 flex momants-light-small-white h-2.5 w-2.5 items-center justify-center rounded-full bg-black " />
				)}
			</button>

			{/* Dropdown / Popup */}
			{open && (
				<div className="absolute left-0 mt-2 w-[300px] bg-white border rounded shadow-md z-50 p-2">
					<h4 className="mb-3 momants-semibold-small-black">Filter conversations by</h4>
					<div className="flex flex-row flex-wrap gap-3">
						{filterOptions.map((option) => {
							const isActive = conversation_type === option.value;

							if (isActive) {
								return (
									<ActiveOption key={option.label} option={option} toggleFilter={toggleFilter} />
								);
							}

							return (
								<InactiveOption key={option.label} option={option} toggleFilter={toggleFilter} />
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
