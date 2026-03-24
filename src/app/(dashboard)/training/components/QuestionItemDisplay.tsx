"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ITrainingItem } from "../types";
import { MoreVerticalIcon } from "lucide-react";

interface QuestionItemDisplayProps {
  item: ITrainingItem;
  onSelect: () => void;
  onDelete?: (id: string) => void;
}

export const QuestionItemDisplay = ({
  item,
  onSelect,
  onDelete,
}: QuestionItemDisplayProps) => {
  const handleDelete = () => {
    onDelete?.(item.qa_file_id);
  };

  return (
    <div
      onClick={onSelect}
      className="flex gap-2 relative border border-gray-200 hover:cursor-pointer rounded-lg p-4 shadow hover:shadow-md transition-shadow"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 focus:outline-none">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          sideOffset={4}
          className="absolute right-0 bg-white border rounded-md shadow-md p-1 z-50 min-w-[120px]"
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="px-3 py-2 momants-light-small-black hover:bg-gray-100 text-black cursor-pointer rounded-md focus:outline-none"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {!item.answer && (
        <div className="mt-1.5 w-[10px] h-[10px] bg-orange-400 rounded-full"></div>
      )}

      <div>
        <h3 className="momants-semibold-medium-black mb-2">{item.question}</h3>
        <p className="momants-light-small-gray line-clamp-4 h-20">{item.answer}</p>
      </div>
    </div>
  );
};
