"use client";
import { ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useConversationsMemberStore } from "../../../../stores/data/useConversationsMemberStore";
import { Ticket } from "../types";
import { TicketDisplay } from "./TicketDisplay";

const fakeShoppingCartDetails: { [memberId: string]: Ticket[] | [] } = {
	"3fa85f64-5717-4562-b3fc-2c963f660001": [
		{
			ticket_name: "Movie Ticket",
			ticket_option_name: "3D Glasses",
			quantity: 1,
			start_date: "2026-01-25",
			start_time: "21:00:00",
		},
		{
			ticket_name: null,
			ticket_option_name: null,
			quantity: 1,
			start_date: "2026-01-28",
			start_time: "18:00:00",
		},
		{
			ticket_name: "Movie Ticket",
			ticket_option_name: "3D Glasses",
			quantity: 1,
			start_date: "2026-01-25",
			start_time: "21:00:00",
		},
		{
			ticket_name: null,
			ticket_option_name: null,
			quantity: 1,
			start_date: "2026-01-28",
			start_time: "18:00:00",
		},
	],
	"3fa85f64-5717-4562-b3fc-2c963f660002": [
		{
			ticket_name: "VIP Concert Ticket",
			ticket_option_name: "Front Row Seat",
			quantity: 2,
			start_date: "2026-02-15",
			start_time: "19:00:00",
		},
		{
			ticket_name: "Standard Concert Ticket",
			ticket_option_name: null,
			quantity: 3,
			start_date: "2026-02-15",
			start_time: null,
		},
		{
			ticket_name: "Poor people Concert Ticket",
			ticket_option_name: null,
			quantity: 3,
			start_date: null,
			start_time: "19:00:00",
		},
		{
			ticket_name: "Child Concert Ticket",
			ticket_option_name: null,
			quantity: 3,
			start_date: null,
			start_time: null,
		},
	],
	"3fa85f64-5717-4562-b3fc-2c963f660003": [],
};

export const ShoppingCartDisplay = () => {
	const { selectedMemberId } = useConversationsMemberStore();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ChevronIcon = isOpen ? ChevronUp : ChevronDown;

	const tickets: Ticket[] = fakeShoppingCartDetails[selectedMemberId as string] ?? [];

	return (
		<div className="border border-gray-300 rounded-md p-2">
			<button
				type="button"
				onClick={() => setIsOpen((v) => !v)}
				className="flex w-full items-center justify-between rounded hover:bg-gray-100 p-2">
				<div className="flex items-center gap-1">
					<ShoppingCart className="w-4" />
					<span className="momants-semibold-small-black">Shopping cart</span>
				</div>

				<ChevronIcon className="w-4 momants-semibold-small-gray" />
			</button>

			{isOpen && (
				<div className="mt-1 momants-light-extrasmall-black">
					{tickets.length > 0 ? (
						tickets.map((ticket, index) => <TicketDisplay key={index} ticket={ticket} />)
					) : (
						<span className="momants-light-extrasmall-gray">No items</span>
					)}
				</div>
			)}
		</div>
	);
};
