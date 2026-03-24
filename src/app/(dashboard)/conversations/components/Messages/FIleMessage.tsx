import { MomantsLogo } from "@/components/ui/MomantsLogo";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useConversationsStateStore } from "../../../../../stores/ui/useConversationsStateStore";
import { highlightMarkdown } from "../../../../../utils/HighLightText";
import { AnchorLink } from "./UI/AnchorLink";

interface FileMessageProps {
	name: string;
	text: string;
	url: string;
	downloadButtonText: string;
	from_agent?: boolean;
	className?: string;
}

export const FileMessage = ({
	name,
	text,
	url,
	downloadButtonText,
	from_agent = true,
	className,
}: FileMessageProps) => {
	const { chatSearchQuery } = useConversationsStateStore();

	const timeString = new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div className={`flex items-end ${from_agent ? "justify-start" : "justify-end"}`}>
			{/* Avatar on the left for agent */}
			{from_agent && <MomantsLogo width={24} height={24} className="mr-2" />}

			<div
				className={`relative max-w-xs my-2 rounded-lg flex flex-col break-words text-sm ${
					from_agent ? "bg-gray-100 text-black" : "bg-[#e2f6ca] text-black"
				} ${className ?? ""}`}>
				{/* File text */}
				<p className="px-3 pt-2">{text}</p>

				{/* Download button */}
				<AnchorLink
					className={`
            flex items-center justify-center
            w-full min-w-[180px] max-w-[330px] h-[34px]
            mt-2 mb-2.5
            border border-gray-700
            rounded-2xl
            font-sora font-medium text-sm leading-[100%] tracking-normal
            ${url.includes("wa.me") ? "bg-gray-700 text-white" : "bg-white text-gray-800"}
            px-3
          `}
					href={url}
					download={name}>
					<ReactMarkdown rehypePlugins={[rehypeRaw]}>
						{highlightMarkdown(downloadButtonText, chatSearchQuery)}
					</ReactMarkdown>
				</AnchorLink>

				{/* Timestamp */}
				<span className="text-[0.65rem] text-gray-500 mt-1 self-end">{timeString}</span>
			</div>
		</div>
	);
};
