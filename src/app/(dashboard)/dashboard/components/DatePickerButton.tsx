"use client";

import { CustomDatePickerPopup } from "@/components/Layout/DatePicker";
import { timeUnitOptions } from "@/constants";
import { useSelectedDashboardDatesStore } from "@/stores/data/useSelectedDashboardDatesStore";
import { formatDatePicker } from "@/utils/formatDatetime";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const DatePickerButton = () => {
  const [open, setOpen] = useState(false);
  const { selectedDates, setSelectedDates, timeUnit, setTimeUnit } =
    useSelectedDashboardDatesStore();

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center momants-light-small-darkgray w-[200px] gap-6 justify-between p-2 border rounded-xl hover:bg-gray-100 mb-2"
      >
        {formatDatePicker(selectedDates.start, selectedDates.end)}
        <ChevronDown size={18} className={open ? "rotate-180" : ""} />
      </button>

      {open && (
        <CustomDatePickerPopup
          isOpen={open}
          onClose={() => setOpen(false)}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          hideClearbutton={true}
          buttonOptions={[6, 29, 89, 179]} // -1 the true value because today counts as a full day
          timeUnits={timeUnitOptions}
          selectedTimeUnit={timeUnit}
          setTimeUnit={setTimeUnit}
        />
      )}
    </div>
  );
};
