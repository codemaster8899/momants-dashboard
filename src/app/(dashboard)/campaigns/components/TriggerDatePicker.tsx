import { Popup } from "@/components/Layout/Popup";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { sameDay } from "@/utils/daysBetween";
import { timeToString } from "@/utils/timeToString";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DateObj {
  day: number;
  isCurrentMonth: boolean;
  date: Date;
}

interface TriggerDatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const TriggerDatePicker = ({
  isOpen,
  onClose,
  selectedDate,
  setSelectedDate,
}: TriggerDatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [tempSelectedDate, setTempSelectedDate] = useState<Date>(selectedDate);
  const [showError, setShowError] = useState(false);
  const timeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempSelectedDate(selectedDate);

    const baseDate = selectedDate ?? new Date();
    setCurrentMonth(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
  }, [isOpen, selectedDate]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateClick = (dateObj: DateObj): void => {
    if (!dateObj.isCurrentMonth || isDateDisabled(dateObj.date)) return;

    const timeString = timeRef.current?.value || "00:00";
    const [hours, minutes, _] = timeString.split(":");

    dateObj.date.setHours(Number(hours));
    dateObj.date.setMinutes(Number(minutes));

    setTempSelectedDate(dateObj.date);
  };

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date: Date): DateObj[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days: DateObj[] = [];

    const prevMonthDays = firstDay.getDay();
    const prevMonthLast = new Date(year, month, 0).getDate();

    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLast - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLast - i),
      });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push({
        day: d,
        isCurrentMonth: true,
        date: new Date(year, month, d),
      });
    }

    while (days.length < 42) {
      const nextDay = days.length - lastDay.getDate() - prevMonthDays + 1;
      days.push({
        day: nextDay,
        isCurrentMonth: false,
        date: new Date(year, month + 1, nextDay),
      });
    }

    return days;
  };

  const isDateDisabled = (date: Date): boolean => {
    const now = new Date();
    const minimumDateTime = new Date(now.getTime() + 15 * 60 * 1000);

    // Create a date at the end of the day being checked
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // If even the end of this day is before the minimum time, disable it
    return endOfDay < minimumDateTime;
  };

  const getMinTime = (): string => {
    if (!tempSelectedDate) return "00:00";

    const now = new Date();
    const isToday = sameDay(tempSelectedDate, now);

    if (isToday) {
      // logic: broadcast for today can only be set 15 + after current time
      const minimumDateTime = new Date(now.getTime() + 15 * 60 * 1000);
      return timeToString(minimumDateTime);
    }

    return "00:00";
  };

  const isValidSelection = (date: Date): boolean => {
    const now = new Date();
    const minimumDateTime = new Date(now.getTime() + 15 * 60 * 1000);
    return date >= minimumDateTime;
  };

  const DayGrid: React.FC<{ days: DateObj[] }> = ({ days }) => (
    <div className="px-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((d) => (
          <div key={d} className="text-center momants-medium-small-gray py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((dateObj, idx) => {
          const selected =
            dateObj.isCurrentMonth &&
            tempSelectedDate &&
            sameDay(dateObj.date, tempSelectedDate);

          return (
            <button
              key={idx}
              onClick={() => handleDateClick(dateObj)}
              disabled={isDateDisabled(dateObj.date)}
              className={`
                aspect-square my-1 flex items-center justify-center text-sm
                ${!dateObj.isCurrentMonth ? "text-gray-300 cursor-default" : "text-gray-900 hover:bg-gray-100"}
                ${selected ? "bg-black text-white rounded-md hover:bg-gray-700" : ""}
                ${isDateDisabled(dateObj.date) ? "!text-gray-300 cursor-not-allowed hover:bg-transparent" : ""}
              `}
            >
              {dateObj.day}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!isOpen) return null;

  const leftMonthDays = getDaysInMonth(currentMonth);
  const rightMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1,
  );
  const rightMonthDays = getDaysInMonth(rightMonth);

  const setTime = (time: string) => {
    const newDate = new Date(tempSelectedDate);
    const now = new Date();
    const minimumDateTime = new Date(now.getTime() + 15 * 60 * 1000);
    const [hours, minutes, _] = time.split(":");

    newDate.setHours(Number(hours));
    newDate.setMinutes(Number(minutes));

    if (minimumDateTime > newDate) {
      return; // if the selected time is below now + 15 min, reject time and return
    }

    setTempSelectedDate(newDate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />

      <div className="relative w-[800px] bg-white rounded-lg border border-gray-200 shadow-lg z-50">
        <div className="p-6">
          <div className="mb-4 px-6 flex items-center gap-2 momants-light-small-darkgray">
            <Calendar className="w-3 h-3" />
            {tempSelectedDate
              ? tempSelectedDate.toLocaleDateString()
              : "Select a date"}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-center mb-4 px-4">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1),
                    )
                  }
                >
                  <ChevronLeft />
                </button>
                <h3>
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </h3>
                <div />
              </div>
              <DayGrid days={leftMonthDays} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 px-4">
                <div />
                <h3>
                  {monthNames[rightMonth.getMonth()]} {rightMonth.getFullYear()}
                </h3>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1),
                    )
                  }
                >
                  <ChevronRight />
                </button>
              </div>
              <DayGrid days={rightMonthDays} />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <Field className="inline-block w-min">
            <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
            <Input
              ref={timeRef}
              onChange={(e) => setTime(e.target.value)}
              min={getMinTime()}
              type="time"
              id="time-picker-optional"
              step={60}
              defaultValue={timeToString(selectedDate)}
              className="bg-background rounded-lg appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </Field>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between">
          <div className="flex gap-4 px-4 rounded-xl border border-gray-200 ">
            <button onClick={onClose}>Cancel</button>
          </div>

          <button
            onClick={() => {
              if (tempSelectedDate && isValidSelection(tempSelectedDate)) {
                setSelectedDate(tempSelectedDate);
                onClose();
              } else {
                setShowError(true);
              }
            }}
            className="bg-black text-white px-6 py-2 rounded-xl"
          >
            Apply
          </button>
        </div>
      </div>

      {showError && (
        <Popup onClose={() => setShowError(false)}>
          <div className="bg-white border rounded-lg shadow-sm w-[600px] p-6">
            <h2 className="font-sans momants-semibold-mediumlarge-black">
              Invalid date
            </h2>
            <p className="sub-title mt-2 momants-light-small-gray">
              The broadcast should be scheduled at least 15 minutes from now.
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowError(false)}
                className="momants-light-small-white px-4 py-2 rounded-full bg-black hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};
