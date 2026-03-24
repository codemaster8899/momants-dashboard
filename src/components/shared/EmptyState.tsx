import { FolderOpen, LucideProps, Plus } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface IEmptyState {
  text: string;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  onOpen?: () => void;
}

function EmptyState({ text, Icon = FolderOpen, onOpen }: IEmptyState) {
  return (
    <div className="w-full h-full min-h-64 flex flex-col items-center justify-center gap-2">
      <Icon className="min-w-10 min-h-10 size-10 text-gray-500" />
      <span className="momants-semibold-small-gray">{text}</span>
      {onOpen &&<button
        type="button"
        className="bg-black text-white p-1 rounded-full"
        onClick={onOpen}
      >
        <Plus />
      </button>}
    </div>
  );
}

export default EmptyState;
