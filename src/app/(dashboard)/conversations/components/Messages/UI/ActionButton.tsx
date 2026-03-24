import { Reply } from "lucide-react";
import { highlightText } from "../../../../../../utils/HighLightText";
import { useConversationsStateStore } from "../../../../../../stores/ui/useConversationsStateStore";

type ActionButtonProps = {
  title: string;
  onClick?: () => void;
};

export const ActionButton = ({ title, onClick }: ActionButtonProps) => {
  const { chatSearchQuery } = useConversationsStateStore();
  const highlightedTitle = highlightText(title, chatSearchQuery);

  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-center w-full
        px-4 py-2
        border-t border-gray-200
        bg-gray-100
        text-green-700 font-medium text-[13px]
        cursor-pointer text-center
        transition-colors duration-200 ease-in-out
        hover:bg-gray-50
        rounded-lg
      "
    >
      <Reply size={15} className="mr-1 mb-[2px]" />
      {highlightedTitle}
    </button>
  );
};
