export interface IUseGetQrCodes {
  agentId?: string;
}

export interface IQrCodeModal {
  name?: string;
  initial_message: string;
  message_platform: string;
  is_active?: boolean;
}

export interface IQrCodes {
  qr_code_id: string;
  name: string;
  initial_message: string;
  message_platform: string;
  redirect_url: string;
  page_views: number;
  is_active: boolean;
}

export interface IQrCodesCategories {
  value: string;
  display_name: string;
}

export interface IQrCodeResponse {
  qr_codes: IQrCodes[];
  message_platforms: IQrCodesCategories[];
}
