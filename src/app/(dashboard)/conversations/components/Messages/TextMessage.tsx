import { MomantsLogo } from "@/components/ui/MomantsLogo";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useConversationsStateStore } from "../../../../../stores/ui/useConversationsStateStore";
import { highlightMarkdown, useScrollToHighlight } from "../../../../../utils/HighLightText";
import { getFormattedTime } from "../../../../../utils/timeFormatters";

type TextMessageProps = {
	text: string;
	from_agent: boolean;
	createdAt: string;
};

const components = {
	a: ({ node, ...props }: any) => (
		<a
			{...props}
			className="text-green-500 underline font-medium hover:text-green-600"
			target="_blank"
			rel="noopener noreferrer"
		/>
	),
};

export const TextMessage = ({ text, from_agent, createdAt }: TextMessageProps) => {
	const { chatSearchQuery } = useConversationsStateStore();
	const containerRef = useScrollToHighlight(chatSearchQuery);

	const date = new Date(createdAt);
	const timeString = getFormattedTime(date);

	return (
		<div
			ref={containerRef}
			className={`flex items-end ${from_agent ? "justify-start" : "justify-end"}`}>
			{from_agent && <MomantsLogo width={24} height={24} className="" />}

			<div
				className={`relative max-w-xs break-words m-2 px-4 py-2 rounded-lg text-sm ${
					from_agent ? "bg-gray-100 text-black" : "bg-[#e2f6ca] text-black"
				}`}>
				<ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
					{highlightMarkdown(text, chatSearchQuery)}
				</ReactMarkdown>

				<span className="mt-1 block text-right text-[10px] text-gray-500">{timeString}</span>
			</div>
		</div>
	);
};
