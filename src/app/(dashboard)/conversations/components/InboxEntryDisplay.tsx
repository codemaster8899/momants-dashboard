import { formatDateTime } from "@/utils/formatDatetime";
import { getIntegrationLogo } from "@/utils/getIntegrationLogo";
import { InboxItem } from "../types";
import { ResolveMessageText } from "./ResolveMessageText";

interface InboxEntryDisplayProps {
	inboxEntry: InboxItem;
	onClick: () => void;
	isSelected?: boolean;
}

export const InboxEntryDisplay = ({ inboxEntry, onClick, isSelected }: InboxEntryDisplayProps) => {
	const isSelectedClass = isSelected ? "bg-gray-100 border border-gray-300" : "hover:bg-gray-100";

	return (
		<div
			className={`flex p-3 ml-2 mr-2 mb-3 mt-2 gap-3 hover:cursor-pointer rounded-xl ${isSelectedClass}`}
			onClick={onClick}>
			<section>
				<div className="bg-white border border-gray-300 rounded-full flex items-center justify-center w-8 h-8">
					{getIntegrationLogo(inboxEntry.messaging_integration_type, 22)}
				</div>
			</section>
			<section>
				<div className="flex gap-2">
					<p className="momants-semibold-small-black">{inboxEntry.member_name}</p>

					{/* amount of messages circle */}
					<div
						className={`rounded-full bg-black font-semibold text-white flex items-center justify-center flex-shrink-0 ${
							inboxEntry.member_message_count > 9 ? "w-7 h-5 text-[10px]" : "w-5 h-5 text-xs"
						}`}>
						{inboxEntry.member_message_count}
					</div>
				</div>
				<ResolveMessageText
					messageContent={inboxEntry.last_message_content}
					className="momants-light-small-darkgray"
				/>
				{/* formatted datetime last seen */}
				<p className="momants-light-extrasmall-gray mt-[2px]">
					last seen {formatDateTime(inboxEntry.last_seen)}
				</p>
			</section>
		</div>
	);
};
