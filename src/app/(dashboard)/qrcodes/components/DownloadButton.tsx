import { Download, ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type DownloadButtonProps = {
  DownloadTypes: ("png" | "svg" | "pdf")[];
  buttonText: string;
  className?: string;
  active?: boolean;
  onDownload?: (type: "png" | "svg" | "pdf") => void;
};

export const DownloadButton = ({
  DownloadTypes,
  buttonText,
  className,
  active,
  onDownload,
}: DownloadButtonProps) => {
  const activeTextClass = active
    ? "!momants-light-small-black"
    : "!momants-light-small-gray";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={`flex items-center gap-2 px-4 py-1 bg-white border border-solid !border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-0 ${activeTextClass} ${
          className ?? ""
        }`}
      >
        <Download size={15} />
        {buttonText}
        <ChevronDown size={15} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-white border border-gray-300 rounded-md shadow-md py-1">
        {DownloadTypes.map((type) => (
          <DropdownMenu.Item
            key={type}
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={() => onDownload?.(type)}
          >
            {type.toUpperCase()}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
