"use client";
import { useEffect, useRef } from "react";

export const highlightText = (text: string, search: string) => {
	if (!search.trim()) return text;

	const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const parts = text.split(new RegExp(`(${escapedSearch})`, "gi"));

	return (
		<>
			{parts.map((part, index) =>
				part.toLowerCase() === search.toLowerCase() ? (
					<mark key={index} style={{ backgroundColor: "#ffeb3b" }}>
						{part}
					</mark>
				) : (
					part
				),
			)}
		</>
	);
};

export const highlightMarkdown = (text: string, search: string) => {
	if (!search.trim()) return text;

	// Escape special regex characters in search term
	const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

	let isFirst = true;

	// Replace matching text with markdown wrapped in <mark> tags
	return text.replace(new RegExp(`(${escapedSearch})`, "gi"), (match) => {
		if (isFirst) {
			isFirst = false;
			return `<mark class="first-match" style="background-color: #ffeb3b;">${match}</mark>`;
		}
		return `<mark style="background-color: #ffeb3b;">${match}</mark>`;
	});
};

export const useScrollToHighlight = (searchText: string) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (searchText && containerRef.current) {
			// Small delay to ensure marks are rendered
			const timeoutId = setTimeout(() => {
				const firstMark = containerRef.current?.querySelector(".first-match");
				if (firstMark) {
					firstMark.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				}
			}, 100);

			return () => clearTimeout(timeoutId);
		}
	}, [searchText]);

	return containerRef;
};
