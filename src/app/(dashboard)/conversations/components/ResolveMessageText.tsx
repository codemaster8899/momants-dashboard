import { MessageWithTypePayload } from "@/types/InteractiveMessage";
import { sliceString } from "@/utils/sliceString";

interface ResolveMessageTextProps {
	messageContent: MessageWithTypePayload;
	className: string;
}

export const ResolveMessageText = ({
	messageContent,
	className: classNames,
}: ResolveMessageTextProps) => {
	switch (messageContent.type) {
		case "text":
			return (
				<p className={`messageContent ${classNames}`}>
					{sliceString(messageContent.content, 100, true)}
				</p>
			);

		case "location":
			return <p className={`italic ${classNames}`}>Location was sent</p>;

		case "media_url":
			return (
				<p className={`italic ${classNames}`}>
					{sliceString(messageContent.content || "Media url was sent", 100, true)}
				</p>
			);

		case "file":
			return (
				<p className={`italic ${classNames}`}>
					{sliceString(messageContent.text || "File was sent", 100, true)}
				</p>
			);

		case "interactive_button":
			return (
				<p className={`italic ${classNames}`}>
					{sliceString(
						messageContent.interactive.body.text || "Interactive button was sent",
						100,
						true,
					)}
				</p>
			);

		case "interactive_list":
			return (
				<p className={`italic ${classNames}`}>
					{sliceString(
						messageContent.interactive.body.text || "Interactive list was sent",
						100,
						true,
					)}
				</p>
			);

		case "interactive_cta_url":
			return (
				<p className={`italic ${classNames}`}>
					{sliceString(
						messageContent.interactive.body.text || "Interactive button was sent",
						100,
						true,
					)}
				</p>
			);

		default:
			return <p className={`italic ${classNames}`}>unsupported message type</p>;
	}
};
