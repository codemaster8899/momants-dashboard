import type { MessageWithTypePayload } from "../../../types/InteractiveMessage";

export interface InboxFilterOption {
	value: string;
	label: string;
}

export interface InboxResponse {
	inbox_entries: InboxItem[];
	total_pages: number;
	conversation_type_options: InboxFilterOption[];
	integration_type_options: InboxFilterOption[];
	count?: number;
}

export type InboxItem = {
	conversation_id: string;
	member_message_count: number;
	last_message_content: MessageWithTypePayload;
	last_seen: string; // ISO string
	member_name: string;
	messaging_integration_type: string;
	conversation_type: string;
	takeover: boolean;
};

export interface InboxMessageMember {
	conversation_id?: string;
	created_at?: string;
	id?: string;
	member_identifier?: string | null;
	phone?: string | null;
	name?: string | null;
	user_language?: string | null;
	messaging_integration_type?: string | null;
	unique_messaging_integration_identifier?: string | null;
}

export interface InboxMessageApiItem {
	id?: string;
	conversation_id?: string;
	from_agent: boolean;
	message_content: MessageWithTypePayload;
	created_at: string;
	member?: InboxMessageMember;
}

export interface InboxMessagesResponse {
	items: InboxMessageApiItem[];
	count: number;
}

export interface InboxMessagesApiDetails {
	shopping_cart: ShoppingCartResponse | null;
	order_history: Order[];
	customer_journey: Touchpoint[];
}

export interface InboxMessagesApiResponse {
	messages: InboxMessageApiItem[];
	details: InboxMessagesApiDetails;
}

export interface Ticket {
	ticket_name: string | null;
	ticket_option_name: string | null;
	quantity: number;
	start_date: string | null; // ISO date string
	start_time: string | null; // HH:mm:ss
}

export interface Order {
	id: string; // UUID
	created_at: string; // ISO date string
	total_price: number;
	tickets: Ticket[];
}

export interface ShoppingCartResponse {
	items: Ticket[];
	count: number;
}

export interface OrderHistoryResponse {
	items: Order[];
	count: number;
}

export interface Touchpoint {
	event: "Close page" | "Message" | "Navigate";
	page_url: string;
	created_at: string; // ISO date string
}

export interface Message {
	from_agent: boolean;
	message_content: MessageWithTypePayload;
	conversation_id: string; // UUID
	created_at: string; // same ISO string
	id: string; // UUID
	touchpoints: Touchpoint[];
}
