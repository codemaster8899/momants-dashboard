"use client";

import { Popup } from "@/components/Layout/Popup";
import Select from "@/components/ui/Select";
import { useCreateTraining } from "@/hooks/fetch/training/useTraining";
import { useState } from "react";
import { useTrainingContext } from "./TrainingContext";

type CreateNewKnowledgeProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const CreateNewKnowledge = ({
  onConfirm,
  onCancel,
}: CreateNewKnowledgeProps) => {
  const { categories, refetch } = useTrainingContext();
  const [category, setCategory] = useState(
    categories?.[0]?.category_name || "",
  );
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { mutateAsync, isPending } = useCreateTraining();

  const handleConfirm = async () => {
    await mutateAsync({ category, question, answer });
    await refetch();
    onConfirm();
  };

  return (
    <Popup onClose={onCancel}>
      <div className="bg-white border rounded-lg shadow-sm flex flex-col w-[600px] p-6 max-h-[83.333vh] overflow-y-auto">
        <h2 className="font-sans momants-semibold-large-black">
          Add knowledge
        </h2>

        <label
          htmlFor="category-select"
          className="mt-4 momants-light-small-black"
        >
          Select category
        </label>
        <Select
          id="category-select"
          required
          value={category}
          handleChange={(value) => setCategory(value)}
          options={categories?.map((c) => c.category_name) || []}
        />

        <label
          htmlFor="question-input"
          className="mt-4 momants-light-small-black"
        >
          Question
        </label>
        <textarea
          id="question-input"
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
          className="mt-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black resize-none"
          rows={4}
        />

        <label
          htmlFor="answer-input"
          className="mt-4 momants-light-small-black"
        >
          Answer
        </label>
        <textarea
          id="answer-input"
          required
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
          className="mt-1 w-full border rounded-md px-3 py-2 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black resize-none"
          rows={2}
        />

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 momants-light-small-black rounded-full border border-gray-300 hover:bg-gray-100"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 momants-light-small-white rounded-full bg-black hover:bg-gray-800 disabled:opacity-40"
            disabled={!question.trim() || !answer.trim() || isPending}
          >
            Confirm
          </button>
        </div>
      </div>
    </Popup>
  );
};
