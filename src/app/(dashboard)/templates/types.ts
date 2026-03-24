export type TStatus = "rejected" | "pending" | "approved";

export type TLocation = {
	latitude: number;
	longitude: number;
	name: string;
	address: string;
};

export type TButton = {
	type: "text";
	text: string;
};

export interface ITemplateBody {
	template_name: string;
	message_platform: string;
	category: string;
	language: string;
	body_text: string;
	buttons: TButton[];
}

export interface ITemplate extends ITemplateBody {
	header_location: TLocation;
	header_text: string;
	header_image_url: string;
	footer_text: string;
	status: TStatus;
	template_id: string;
}

interface IDataList {
	display_name: string;
	value: string;
}

export interface TemplateResponse {
	templates: ITemplate[];
	total_pages: number;
	statuses?: TStatus[];
	categories?: IDataList[];
	languages?: IDataList[];
	message_platforms?: IDataList[];
}
