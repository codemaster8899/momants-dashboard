import { MouseEventHandler } from "react";
import { Plus } from "lucide-react";

interface NewButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  buttonText: string;
}

export const NewButton = ({
  onClick,
  className,
  buttonText
}: NewButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={` bg-black momants-light-small-white px-4 py-3 hover:bg-gray-800 flex items-center gap-2 rounded-3xl shadow ${
        className ?? ""
      }`}
    >
      <Plus size={16} color="#FFFFFF" />
      <span>{buttonText}</span>
    </button>
  );
};
