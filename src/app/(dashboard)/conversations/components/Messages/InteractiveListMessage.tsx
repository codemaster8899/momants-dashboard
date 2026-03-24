"use client";
import { MomantsLogo } from "@/components/ui/MomantsLogo";
import { List, X } from "lucide-react";
import { useState } from "react";
import { useConversationsStateStore } from "../../../../../stores/ui/useConversationsStateStore";
import { InteractiveListMessagePayload } from "../../../../../types/InteractiveMessage";
import { highlightText, useScrollToHighlight } from "../../../../../utils/HighLightText";
import { getFormattedTime } from "../../../../../utils/timeFormatters";
import { Message } from "../../types";
import { InteractiveMessageTimestamp } from "./UI/InteractiveMessageTimestamp";
import { StyledBody } from "./UI/StyledBody";
import { StyledFooter } from "./UI/StyledFooter";
import { StyledHeader } from "./UI/StyledHeader";

interface InteractiveButtonMessageProps {
	message: Message;
}

export const InteractiveListMessage = ({ message }: InteractiveButtonMessageProps) => {
	const { header, body, footer, action } = (
		message.message_content as {
			type: "interactive_list";
			interactive: InteractiveListMessagePayload;
		}
	).interactive;
	const [isListOpen, setIsListOpen] = useState(false);

	const date = new Date(message.created_at);
	const timeString = getFormattedTime(date);

	const { chatSearchQuery } = useConversationsStateStore();
	const containerRef = useScrollToHighlight(chatSearchQuery);

	const handleButtonClick = () => {
		setIsListOpen(!isListOpen);
	};

	const isAgent = message.from_agent;

	return (
		<div ref={containerRef} className={`flex items-start gap-2 m-[0_32px_10px_0]`}>
			{/* Avatar / Logo */}
			{isAgent && <MomantsLogo width={24} height={24} className="flex-shrink-0 mt-auto -mb-2" />}

			{/* Message bubble */}
			<div
				className={`bg-[#F6F6F6] text-[#151515] text-md leading-[1.2rem] max-w-[80%] w-fit break-words shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] font-sora rounded-lg flex flex-col overflow-hidden`}>
				{header && <StyledHeader header={header} />}
				{body && <StyledBody body={body} />}
				{footer ? (
					<StyledFooter footer={footer} timestamp={timeString} />
				) : (
					<InteractiveMessageTimestamp timestamp={timeString} />
				)}

				{/* Toggle list button */}
				{!isListOpen ? (
					<button
						onClick={handleButtonClick}
						className="w-full px-4 py-2 border-t border-gray-200 bg-gray-50 text-green-600 font-medium text-sm rounded-b-lg flex items-center justify-center gap-1.5 hover:bg-gray-100">
						<List className="h-5 w-5" />
						<span className="pt-[2px]">{highlightText(action.button, chatSearchQuery)}</span>
					</button>
				) : (
					<button
						onClick={handleButtonClick}
						className="w-full px-4 py-2 border-t border-gray-200 bg-gray-50 text-green-600 font-medium text-sm rounded-b-lg flex items-center justify-center gap-1.5 hover:bg-gray-100">
						<X height={20} className="text-green-600" />
						<span className="pt-[2px]">{highlightText(action.button, chatSearchQuery)}</span>
					</button>
				)}

				{/* List content */}
				{isListOpen && (
					<div className="w-full border-t bg-gray-50 border-gray-200">
						{action.sections.map((section, sectionIndex) => (
							<div className="not-first:border-t border-gray-200" key={sectionIndex}>
								{section.title && (
									<h3 className="text-sm text-gray-500 px-3 py-2 m-0 font-semibold bg-gray-100">
										{highlightText(section.title, chatSearchQuery)}
									</h3>
								)}
								{section.rows.map((row, rowIndex) => (
									<div
										className="px-3 py-2 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-100"
										key={rowIndex}>
										<h4 className="text-sm text-gray-800 m-0 font-normal">
											{highlightText(row.title, chatSearchQuery)}
										</h4>
									</div>
								))}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
