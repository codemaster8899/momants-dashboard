export type ApprovedTemplate = {
	template_id: string;
	template_name: string;
};

export type MessagePlatform = {
	value: string;
	display_name: string;
};

export interface Campaign {
	campaign_id: string;
	template_name: string;
	campaign_type: string;
	status: string;
	send_status: string;
	message_platform: string;
	when_text: string;
}

export interface CampaignsResponse {
	campaigns: Campaign[];
	total_pages: number;
	approved_templates?: ApprovedTemplate[];
	message_platforms?: MessagePlatform[];
	trigger_actions?: string[];
	delays?: string[];
	send_statuses?: string[];
	statuses?: string[];
	campaign_types?: string[];
}

export interface CreateCampaignBody {
	template_id: string;
	message_platform: string;
	campaign_type: string;
	when: string;
	audience_list: string[];
}

export interface CreateCampaignResponse {
	campaign_id: string;
	success: boolean;
}

export interface DeleteCampaignResponse {
	success: boolean;
}

export interface BroadcastResponse {
	items: BroadcastItem[];
	count: number;
}

export type BroadcastItem = {
	id: string;
	name: string;
	active: boolean;
	broadcast_timing: string;
	template_name: string | null;
	send?: boolean;
};

export type TCreateCampaign = {
	template_id: string;
	message_platform: string;
	campaign_type: string;
	campaign: {
		audience_list: string[];
		broadcast_schedule: {
			type: "once";
			broadcast_datetime: string;
		};
	};
};

export type TCampaign = {
	campaign_id: string;
};

export type TApprovedTemplate = {
	template_id: string;
	template_name: string;
};

export type TMessagePlatform = {
	value: "whatsapp" | "messenger" | "sms";
	display_name: string;
};

export type TSendStatus = "sent" | "queued" | "on_trigger";

export type TCampaignStatus = "active" | "inactive";

export type TCampaignType = "trigger" | "broadcast";
