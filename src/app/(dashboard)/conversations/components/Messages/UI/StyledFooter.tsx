import rehypeRaw from "rehype-raw";
import { useConversationsStateStore } from "../../../../../../stores/ui/useConversationsStateStore";
import { InteractiveMessageFooter } from "../../../../../../types/InteractiveMessage";
import {
  highlightMarkdown,
  highlightText,
} from "../../../../../../utils/HighLightText";
import ReactMarkdown from "react-markdown";

interface StyledFooterProps {
  footer: InteractiveMessageFooter;
  timestamp: string;
}

export const StyledFooter = ({ footer, timestamp }: StyledFooterProps) => {
  const { chatSearchQuery } = useConversationsStateStore();

  return (
    <div className="flex justify-between items-center bg-white-dark px-3 py-2 rounded-lg">
      <span className="text-[0.8em] text-gray-500">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {highlightMarkdown(footer.text, chatSearchQuery)}
        </ReactMarkdown>
      </span>
      {timestamp && (
        <span className="text-[0.7em] text-gray-500">{timestamp}</span>
      )}
    </div>
  );
};
