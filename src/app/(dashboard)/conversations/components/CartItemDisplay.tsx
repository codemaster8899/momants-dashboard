"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Order } from "../types";
import { TicketDisplay } from "./TicketDisplay";

export const CartItemDisplay = ({ order, className }: { order: Order; className?: string }) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700">
				<p className="momants-light-extrasmall-gray">
					<span className="momants-light-extrasmall-darkgray">Total:</span> €{" "}
					{order.total_price.toFixed(2)}
				</p>
				{open ? <ChevronUp className="w-4" /> : <ChevronDown className="w-4" />}
			</button>

			{open && (
				<div className="ml-4">
					{order.tickets.map((ticket, index) => (
						<TicketDisplay key={index} ticket={ticket} className={className} />
					))}
				</div>
			)}
		</div>
	);
};
