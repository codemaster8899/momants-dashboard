"use client";
import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { History } from "lucide-react";
import { useState } from "react";
import { Order } from "../types";
import { CartItemDisplay } from "./CartItemDisplay";

// TODO: delete this fake data and implement real data fetching logic
interface FakeOrderDetails {
	[memberId: string]: Order[] | []; // can be an array of Orders or an empty array
}

const fakeOrderDetails: FakeOrderDetails = {
	"3fa85f64-5717-4562-b3fc-2c963f660001": [
		{
			id: "123e4567-e89b-12d3-a456-426614174000",
			created_at: "2026-01-22T12:00:00Z",
			total_price: 99.99,
			tickets: [
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
		},
		{
			id: "223e4567-e89b-12d3-a456-426614174001",
			created_at: "2026-01-20T09:30:00Z",
			total_price: 45.5,
			tickets: [
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
		},
	],
	"3fa85f64-5717-4562-b3fc-2c963f660002": [
		{
			id: "223e4567-e89b-12d3-a456-426614174001",
			created_at: "2026-01-20T09:30:00Z",
			total_price: 45.5,
			tickets: [
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
		},
	],
	"3fa85f64-5717-4562-b3fc-2c963f660003": [],
};

export const OrderHistoryDisplay = () => {
	const { selectedMemberId } = useConversationsMemberStore();
	const [orders, setOrders] = useState<Order[] | null>(
		fakeOrderDetails[selectedMemberId as string],
	);

	return (
		<div className="border border-gray-300 rounded-md p-3">
			<div className="flex items-center gap-1">
				<History className="w-4" />
				<span className="momants-semibold-small-black">Order history</span>
			</div>

			{/* showing options in order history */}
			<div className="mt-1">
				{orders && orders.length > 0 ? (
					orders.map((order, idx) => (
						<CartItemDisplay order={order} key={idx} className="-ml-[1px]" />
					))
				) : (
					<span className="momants-light-extrasmall-gray">No order history</span>
				)}
			</div>
		</div>
	);
};
