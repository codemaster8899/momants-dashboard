"use client";

import { CustomDatePickerPopup } from "@/components/Layout/DatePicker";
import { useSelectedConversationsDatesStore } from "@/stores/data/useSelectedConversationsDatesStore";
import { Calendar } from "lucide-react";
import { useState } from "react";

export const DatePickerButton = () => {
  const [open, setOpen] = useState(false);
  const { selectedDates, setSelectedDates } =
    useSelectedConversationsDatesStore();

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-center p-2 border rounded-full hover:bg-gray-100"
      >
        <Calendar className="momants-light-extrasmall-gray w-4 h-4" />

        {(selectedDates.start || selectedDates.end) && (
          <span className="absolute top-0 right-0 flex momants-light-small-white h-2.5 w-2.5 items-center justify-center rounded-full bg-black " />
        )}
      </button>

      {open && (
        <CustomDatePickerPopup
          isOpen={open}
          onClose={() => setOpen(false)}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          buttonOptions={[6, 29, 89, 179]}
        />
      )}
    </div>
  );
};
