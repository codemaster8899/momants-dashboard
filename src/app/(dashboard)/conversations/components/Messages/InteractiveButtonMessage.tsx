import { MomantsLogo } from "@/components/ui/MomantsLogo";
import { useConversationsStateStore } from "../../../../../stores/ui/useConversationsStateStore";
import { InteractiveButtonMessagePayload } from "../../../../../types/InteractiveMessage";
import { useScrollToHighlight } from "../../../../../utils/HighLightText";
import { getFormattedTime } from "../../../../../utils/timeFormatters";
import { Message } from "../../types";
import { ActionButton } from "./UI/ActionButton";
import { InteractiveMessageTimestamp } from "./UI/InteractiveMessageTimestamp";
import { StyledBody } from "./UI/StyledBody";
import { StyledFooter } from "./UI/StyledFooter";
import { StyledHeader } from "./UI/StyledHeader";

interface InteractiveButtonMessageProps {
	message: Message;
}

export const InteractiveButtonMessage = ({ message }: InteractiveButtonMessageProps) => {
	const { header, body, footer, action } = (
		message.message_content as {
			type: "interactive_button";
			interactive: InteractiveButtonMessagePayload;
		}
	).interactive;

	const { chatSearchQuery } = useConversationsStateStore();
	const containerRef = useScrollToHighlight(chatSearchQuery);

	const date = new Date(message.created_at);
	const timeString = getFormattedTime(date);

	const from_agent = message.from_agent;

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

				{action.buttons.map((button, index) => (
					<ActionButton key={index} title={button.reply.title} />
				))}
			</div>
		</div>
	);
};
