import { useConversationsStateStore } from "../../../../../../stores/ui/useConversationsStateStore";
import { InteractiveMessageBody } from "../../../../../../types/InteractiveMessage";
import { highlightMarkdown } from "../../../../../../utils/HighLightText";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface InteractiveMessageBodyProps {
  body: InteractiveMessageBody;
}

export const StyledBody = ({ body }: InteractiveMessageBodyProps) => {
  const { chatSearchQuery } = useConversationsStateStore();

  return (
    <div className="bg-gray-100 text-gray-900 rounded-lg font-sora font-normal text-[14px] mt-3 pt-0 px-3 pb-2 leading-[1.4]">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {highlightMarkdown(body.text, chatSearchQuery)}
      </ReactMarkdown>
    </div>
  );
};
