import { Message } from "../types";
import { FileMessage } from "./Messages/FIleMessage";
import { InteractiveButtonMessage } from "./Messages/InteractiveButtonMessage";
import { InteractiveCtaButtonMessage } from "./Messages/InteractiveCtaButtonMessage";
import { InteractiveListMessage } from "./Messages/InteractiveListMessage";
import { LocationMessage } from "./Messages/LocationMessage";
import { MediaMessage } from "./Messages/MediaMessage";
import { TextMessage } from "./Messages/TextMessage";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  // check if message is old message format
  if (typeof message.message_content == "string") {
    return (
      <TextMessage
        text={message.message_content}
        from_agent={message.from_agent}
        createdAt={message.created_at}
      />
    );
  }

  switch (message.message_content.type) {
    case "interactive_button":
      return <InteractiveButtonMessage message={message} />;

    case "interactive_list":
      return <InteractiveListMessage message={message} />;

    case "interactive_cta_url":
      return <InteractiveCtaButtonMessage message={message} />;

    case "location":
      return (
        <LocationMessage
          lon={Number(message.message_content.lon)}
          lat={Number(message.message_content.lat)}
          height={250}
          width={350}
        />
      );

    case "media_url":
      return (
        <MediaMessage
          src={message.message_content.content}
          alt="media"
          height={300}
          width={300}
          className="media-message"
        />
      );

    case "file":
      return (
        <FileMessage
          url={message.message_content.url}
          text={message.message_content.text}
          name={message.message_content.name}
          downloadButtonText="Download here"
        />
      );

    case "text":
      return (
        <TextMessage
          text={message.message_content.content}
          from_agent={message.from_agent}
          createdAt={message.created_at}
        />
      );

    default:
      return (
        <TextMessage
          text="content could not be rendered"
          from_agent={message.from_agent}
          createdAt={message.created_at}
        />
      );
  }
};
