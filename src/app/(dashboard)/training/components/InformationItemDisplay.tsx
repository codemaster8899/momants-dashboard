import { ProgressBar } from "@/components/ui/ProgressBar";
import { ITrainingCategory } from "../types";
import { twMerge } from "tailwind-merge";

interface InformationItemDisplayProps {
  item: ITrainingCategory;
  onClick?: () => void;
  isSelected?: boolean;
}

export const InformationItemDisplay = ({
  item,
  onClick,
  isSelected,
}: InformationItemDisplayProps) => {
  const percentComplete = (item.completed_count / item.total_count) * 100;

  const barColor: string = "bg-black";
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "group hover:bg-gray-100 m-2 px-8 p-4 rounded-xl hover:cursor-pointer",
        isSelected ? "bg-gray-100 border border-gray-300" : "",
      )}
    >
      <p className="momants-bold-small-black">{item.category_name}</p>
      <p className="momants-light-small-darkgray">
        <span className="font-semibold">{item.completed_count}</span> /{" "}
        {item.total_count} questions
      </p>
      <div className="mt-2">
        <ProgressBar
          percentComplete={percentComplete}
          barColor={barColor}
          backgroundColor={
            isSelected ? "bg-white" : `bg-gray-200 group-hover:bg-white`
          }
        />
      </div>
    </div>
  );
};
