import { ConfirmPopup } from "@/components/Layout/ConfirmPopup";
import { Switch } from "@/components/ui/Switch";
import { Tag } from "@/components/ui/Tag";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { CampaignIconBadge } from "./CampaignIconBadge";
import { SendTag } from "./SendTag";

interface CampaignCardProps {
	title: string;
	templateName: string;
	tags: string[];
	active: boolean;
	send?: boolean;
	popupTitle: string;
	onToggle: (value: boolean) => void;
	onDelete: () => void;
}

export const CampaignCard = ({
	title,
	templateName,
	tags,
	send,
	active,
	onToggle,
	onDelete,
	popupTitle,
}: CampaignCardProps) => {
	const [showPopup, setShowPopup] = useState(false);
	const [pendingToggle, setPendingToggle] = useState(false);

	const activeHeaderStyle = active ? "momants-semibold-medium-black" : "momants-light-medium-gray";

	const activeSubHeaderStyle = active
		? "momants-light-extrasmall-black"
		: "momants-light-extrasmall-gray";

	const handleSwitchChange = (checked: boolean) => {
		setPendingToggle(checked);
		setShowPopup(true);
	};

	const handleConfirm = () => {
		setShowPopup(false);
		onToggle(pendingToggle);
	};

	const handleCancel = () => {
		setShowPopup(false);
	};

	return (
		<div className="bg-white border rounded-lg shadow-sm flex flex-col gap-3 w-full">
			<div className="flex items-start gap-3 p-5">
				<CampaignIconBadge active={active} />
				<div className="flex flex-col gap-1">
					<h2 className={`font-sans align-middle ${activeHeaderStyle}`}>{title}</h2>
					<p className={`leading-snug line-clamp-2 ${activeSubHeaderStyle}`}>
						template: <span className="momants-light-extrasmall-gray">{templateName}</span>{" "}
					</p>
				</div>
				{/* Options Dropdown menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="ml-auto p-1 rounded hover:bg-gray-100 focus:outline-none">
							<EllipsisVertical className={`w-5 h-5 ${activeHeaderStyle}`} />
						</button>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						side="bottom"
						align="end"
						className="min-w-[120px] bg-white border rounded-md shadow-md p-1 z-50">
						<DropdownMenuItem
							onClick={onDelete}
							className="mx-auto px-3 py-2 hover:bg-gray-100 momants-light-small-black cursor-pointer rounded-md focus:outline-none">
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<hr className="border-gray-200" />

			{showPopup && (
				<ConfirmPopup
					title={`${pendingToggle ? "Enable" : "Disable"} ${popupTitle}?`}
					description={`Click "Confirm" to ${
						pendingToggle ? "enable" : "disable"
					} "${title}" or "Cancel" to keep it ${active ? "active" : "inactive"}.`}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}

			<div className="flex items-center justify-between p-4 pt-2">
				<div className="flex gap-2 flex-wrap">
					{typeof send === "boolean" ? (
						<SendTag send={send} key="send-tag" />
					) : (
						<SendTag text="On trigger" send={true} key="sent-on-trigger" />
					)}

					{tags.map((tag, i) => (
						<Tag active={active} key={i}>
							{tag}
						</Tag>
					))}
				</div>

				{/* <Switch
					length={40}
					checked={active}
					onChange={handleSwitchChange}
					className="w-[44px] h-[24px] bg-[#E4E4E7] data-[state=checked]:bg-[#7EE128] rounded-full relative transition-colors duration-200 [&>span]:w-[20px] [&>span]:h-[20px] data-[state=unchecked]:[&>span]:translate-x-[2px] data-[state=checked]:[&>span]:translate-x-[22px] [&>span]:bg-white [&>span]:rounded-full [&>span]:transition-transform [&>span]:duration-200 [&>span]:absolute [&>span]:top-[2px] [&>span]:left-0"
				/> */}
			</div>
		</div>
	);
};
