"use client";

import useFilterInbox from "@/hooks/fetch/inbox/useFilterInbox";
import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

export const InboxSearch = () => {
	const { search, setQueryParam } = useFilterInbox();
	const [query, setQuery] = useState(search ?? "");
	const debouncedQuery = useDebounce(query, 500) as string;

	useEffect(() => {
		setQueryParam({ search: debouncedQuery });
	}, [debouncedQuery]);

	return (
		<div className="relative w-full">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 momants-light-extrasmall-gray w-3 h-3 focus:outline-none" />
			<input
				type="text"
				placeholder="Search for conversations"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full text-sm pl-8 pr-8 py-2 border rounded-3xl placeholder-gray-500 placeholder:text-sm"
			/>
			{query && (
				<button
					onClick={() => setQuery("")}
					className="absolute right-3 top-1/2 -translate-y-1/2 momants-light-extrasmall-gray hover:text-gray-600"
					aria-label="Clear search">
					<X className="w-3 h-3" />
				</button>
			)}
		</div>
	);
};
