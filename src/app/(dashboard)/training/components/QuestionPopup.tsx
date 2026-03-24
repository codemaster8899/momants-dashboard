"use client";

import { Popup } from "@/components/Layout/Popup";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ITrainingItem } from "../types";
import Select from "@/components/ui/Select";
import { useUpdateTraining } from "@/hooks/fetch/training/useTraining";
import { useTrainingContext } from "./TrainingContext";
import { Check, SkipBack, SkipForward } from "lucide-react";
import useTrainingFilters from "@/hooks/fetch/training/useTrainingFilters";
import { twMerge } from "tailwind-merge";

type CreateQrCodePopupProps = {
  item: ITrainingItem;
  itemIndex: number;
  itemsLength: number;
  completedCount: number;
  onClose: () => void;
  onSkip: () => void;
  onPrevious: () => void;
  setCompletedCount: Dispatch<SetStateAction<number>>;
};

export const QuestionPopup = ({
  item,
  itemIndex,
  itemsLength,
  onClose,
  onSkip,
  onPrevious,
  completedCount,
  setCompletedCount,
}: CreateQrCodePopupProps) => {
  const [category, setCategory] = useState(item.category);
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);
  const completedRef = useRef<string[]>([]);

  const { mutateAsync, isPending } = useUpdateTraining();
  const { filter } = useTrainingFilters();
  const { categories } = useTrainingContext();

  const isOpenTab = filter === "open";

  const handleConfirm = async () => {
    const id = item.qa_file_id;
    await mutateAsync({
      id,
      data: {
        category,
        question,
        answer,
      },
    });
    if (!completedRef.current.includes(id)) {
      setCompletedCount((prev) => prev + 1);
      completedRef.current = [...completedRef.current, id];
    }
    if (isOpenTab) onSkip();
    else onClose();
  };

  useEffect(() => {
    setCategory(item.category);
    setQuestion(item.question);
    setAnswer(item.answer);
  }, [item]);

  return (
    <Popup onClose={onClose}>
      <div className="flex flex-col items-center">
        <div className="bg-white border rounded-lg shadow-lg flex flex-col w-[600px] p-6 max-h-[83.333vh] overflow-y-auto">
          <div className="mb-2">
            <h2 className="momants-semibold-large-black">AI Agent Knowledge</h2>
            {filter !== "trained" && (
              <span className="momants-semibold-extrasmall-gray">
                {itemsLength - completedCount} more Open questions
              </span>
            )}
          </div>

          <label
            htmlFor="category-select"
            className="mt-4 momants-light-small-black"
          >
            Category
          </label>
          <Select
            id="category-select"
            required
            value={category}
            handleChange={(value) => setCategory(value)}
            options={categories?.map((c) => c.category_name) || []}
          />

          <label className="mt-4 momants-light-small-black">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            className="mt-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black resize-none"
            rows={3}
          />

          <label className="mt-4 momants-light-small-black">Answer</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter you answer"
            className="mt-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black resize-none"
            rows={4}
          />

          <div className="flex justify-between mt-6">
            {isOpenTab && (
              <button
                type="button"
                onClick={onPrevious}
                className="flex items-center gap-2 px-4 py-2 momants-light-small-black rounded-full border border-gray-300 hover:bg-gray-100"
                disabled={isPending || itemIndex === 0}
              >
                <SkipBack className="size-5" />
                Previous
              </button>
            )}
            <div className="flex gap-4 ml-auto">
              {isOpenTab && (
                <button
                  type="button"
                  onClick={onSkip}
                  className="flex items-center gap-2 px-4 py-2 momants-light-small-black rounded-full border border-gray-300 hover:bg-gray-100"
                  disabled={isPending}
                >
                  <SkipForward className="size-5" />
                  Skip
                </button>
              )}
              <button
                type="button"
                onClick={handleConfirm}
                className="flex items-center gap-2 px-4 py-2 momants-light-small-white rounded-full bg-black hover:bg-gray-800 disabled:opacity-40"
                disabled={!question.trim() || !answer.trim() || isPending}
              >
                <Check className="size-5" />
                {itemIndex === itemsLength - 1 || !isOpenTab
                  ? "Accept"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
        {isOpenTab &&
          [98, 96].map((width, index) => (
            <div
              key={index}
              style={{ width: `${width}%` }}
              className={twMerge(
                "h-3 border rounded-bl-lg rounded-br-lg shadow-lg",
                `bg-gray-${index + 2}00`,
                itemsLength - (index + 1) > itemIndex ? "block" : "hidden",
              )}
            />
          ))}
      </div>
    </Popup>
  );
};
