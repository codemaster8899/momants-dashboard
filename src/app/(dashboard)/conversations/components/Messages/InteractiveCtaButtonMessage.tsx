import { MomantsLogo } from "@/components/ui/MomantsLogo";
import { ExternalLink } from "lucide-react";
import { useConversationsStateStore } from "../../../../../stores/ui/useConversationsStateStore";
import { InteractiveCTAMessagePayload } from "../../../../../types/InteractiveMessage";
import { useScrollToHighlight } from "../../../../../utils/HighLightText";
import { getFormattedTime } from "../../../../../utils/timeFormatters";
import { Message } from "../../types";
import { InteractiveMessageTimestamp } from "./UI/InteractiveMessageTimestamp";
import { StyledBody } from "./UI/StyledBody";
import { StyledFooter } from "./UI/StyledFooter";
import { StyledHeader } from "./UI/StyledHeader";

interface InteractiveCtaButtonMessageProps {
	message: Message;
}

export const InteractiveCtaButtonMessage = ({ message }: InteractiveCtaButtonMessageProps) => {
	const { header, body, footer, action } = (
		message.message_content as {
			type: "interactive_cta_url";
			interactive: InteractiveCTAMessagePayload;
		}
	).interactive;

	const { parameters } = action;
	const { display_text, url } = parameters;

	const { chatSearchQuery } = useConversationsStateStore();
	const containerRef = useScrollToHighlight(chatSearchQuery);

	const date = new Date(message.created_at);
	const timeString = getFormattedTime(date);

	const from_agent = message.from_agent;

	const handleClick = () => {
		window.open(url, "_blank", "noopener");
	};

	return (
		<div
			ref={containerRef}
			className={`flex items-end ${from_agent ? "justify-start" : "justify-end"}`}>
			{from_agent && <MomantsLogo width={24} height={24} className="mr-2" />}

			<div
				className={`relative max-w-xs break-words my-2 rounded-lg text-sm ${
					from_agent ? "bg-gray-100 text-black" : "bg-[#e2f6ca] text-black"
				} flex flex-col`}>
				{header && <StyledHeader header={header} />}
				{body && <StyledBody body={body} />}

				{footer ? (
					<StyledFooter footer={footer} timestamp={timeString} />
				) : (
					<InteractiveMessageTimestamp timestamp={timeString} />
				)}

				<button
					onClick={handleClick}
					className="w-full flex items-center justify-center mt-2 px-4 py-2 border-t border-gray-200 bg-white text-green-600 font-medium text-sm cursor-pointer text-center transition-colors duration-200 hover:bg-gray-100">
					<ExternalLink className="h-4 w-4 mr-1.5 pt-[3px]" />
					{display_text}
				</button>
			</div>
		</div>
	);
};
