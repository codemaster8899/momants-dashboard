import { TemplateIconBadge } from "./TemplateIconBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { MessageExample } from "./messageExample";
import { ITemplate } from "../types";

interface TemplateCardProps {
	item: ITemplate;
	onDelete: () => void;
}

export const TemplateCard = ({ item, onDelete }: TemplateCardProps) => {
  return (
		<div className="bg-white border rounded-lg shadow-sm flex flex-col gap-3 w-full h-fit">
			<div className="flex items-start gap-3 p-5">
				<TemplateIconBadge status={item.status} />
				<div className="flex flex-col">
					<h2
						className={`font-sans font-semibold leading-base align-middle momants-semibold-medium-black`}>
						{item.template_name} | {item.language.toUpperCase()}
					</h2>
					<small className="text-gray-700 capitalize">{item.status}</small>
				</div>
				{/* Options Dropdown menu */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className="ml-auto p-1 rounded hover:bg-gray-100 focus:outline-none">
							<EllipsisVertical className={`w-5 h-5 momants-semibold-medium-black`} />
						</button>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						side="bottom"
						align="end"
						className="min-w-[120px] bg-white border rounded-md shadow-md p-1 z-50">
						<DropdownMenuItem
							onClick={onDelete}
							className="mx-auto px-3 py-2 momants-light-small-black hover:bg-gray-100 cursor-pointer rounded-md focus:outline-none">
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<hr className="border-gray-200" />

			<div className="p-5 h-max">
				<MessageExample size="280px" messageText={item.body_text} buttons={item.buttons} />
			</div>
		</div>
	);
};
