// AI SLOP from widget - should be reworked in the future
export type MessageWithTypePayload =
  | { type: "text"; content: string }
  | { type: "location"; lat: number; lon: number }
  | { type: "media_url"; content: string; text: string | null }
  | { type: "file"; url: string; text: string; name: string }
  | {
      type: "interactive_button";
      interactive: InteractiveButtonMessagePayload;
    }
  | {
      type: "interactive_list";
      interactive: InteractiveListMessagePayload;
    }
  | {
      type: "interactive_cta_url";
      interactive: InteractiveCTAMessagePayload;
    };

export interface InteractiveButtonMessagePayload {
  header?: InteractiveMessageHeader;
  body: InteractiveMessageBody;
  footer?: InteractiveMessageFooter | null;
  action: InteractiveButton;
  type: "button";
}

export interface InteractiveListMessagePayload {
  header?: InteractiveMessageHeader;
  body: InteractiveMessageBody;
  footer?: InteractiveMessageFooter | null;
  action: InteractiveList;
  type: "list";
}

export interface InteractiveCTAMessagePayload {
  header?: InteractiveMessageHeader;
  body: InteractiveMessageBody;
  footer?: InteractiveMessageFooter | null;
  action: CTAButton;
}

type InteractiveMessageHeader =
  | { type: "text"; text: string }
  | { type: "image"; image: { link: string } }
  | { type: "video"; video: { link: string } }
  | { type: "document"; document: { link: string; filename: string } };

export type InteractiveMessageBody = { type?: "text"; text: string };
export type InteractiveMessageFooter = { type?: "text"; text: string };

interface InteractiveReply {
  title: string;
  id: string;
}

interface InteractiveReplyButton {
  type: "reply";
  reply: InteractiveReply;
}

interface InteractiveButton {
  buttons: InteractiveReplyButton[];
}

interface InteractiveListRow {
  id: string;
  title: string;
}

interface InteractiveListSection {
  title: string;
  rows: InteractiveListRow[];
}

interface InteractiveList {
  button: string;
  sections: InteractiveListSection[];
}

interface CTAParameters {
  display_text: string;
  url: string;
}

export interface CTAButton {
  name: string;
  parameters: CTAParameters;
}
