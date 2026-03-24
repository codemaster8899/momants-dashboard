import { Input } from "@/components/ui/input";
import { useState } from "react";
import { formatDateTimeMilitary } from "../../../../utils/formatDatetime";
import { TriggerDatePicker } from "./TriggerDatePicker";
import { DropdownInput } from "@/components/ui/DropDownInput";
import * as Select from "@radix-ui/react-select";

type ScheduleType = "once" | "recurring" | "routine";

interface IBroadcastPopupForm {
  selectedDate: Date;
  audienceList: string;
  setSelectedDate: (date: Date) => void;
  setAudienceList: (value: string) => void;
}

export const BroadcastPopupForm = ({
  selectedDate,
  audienceList,
  setSelectedDate,
  setAudienceList,
}: IBroadcastPopupForm) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [scheduleType, setScheduleType] = useState<ScheduleType>("once");
  const [recurringEvery, setRecurringEvery] = useState<number>(1);
  const [recurringUnit, setRecurringUnit] = useState<
    "days" | "weeks" | "months"
  >("days");
  const [routineDays, setRoutineDays] = useState<string[]>([]);
  const [routineTime, setRoutineTime] = useState<string>("09:00");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
    e.target.value = "";
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setSelectedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Audience list */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="audience_list" className="momants-light-small-black">
          Audience list (optional)
        </label>
        <input
          id="audience_list"
          type="text"
          onChange={(e) => setAudienceList(e.target.value)}
          placeholder="Enter a list"
          className="w-full border rounded-md px-3 py-2 pr-12 momants-light-small-darkgray focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
        <p className="momants-light-small-black">Schedule</p>

        <div className="flex flex-col gap-2">
          {/* Once */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="schedule_type"
              value="once"
              checked={scheduleType === "once"}
              onChange={() => setScheduleType("once")}
              className="mt-1 h-4 w-4 accent-black"
            />
            <div className="flex flex-col gap-1">
              <span className="momants-light-small-black">Once</span>
              {/* schedule button */}
              <button
                className="border border-gray-300 rounded-xl w-fit px-4 py-2 momants-light-small-black"
                onClick={() => setOpenDatePicker(true)}
              >
                {formatDateTimeMilitary(selectedDate)}
              </button>
            </div>
          </label>

          {/* Recurring */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="schedule_type"
              value="recurring"
              checked={scheduleType === "recurring"}
              onChange={() => setScheduleType("recurring")}
              className="mt-1 h-4 w-4 accent-black"
            />
            <div className="flex flex-col gap-2">
              <span className="momants-light-small-black">Recurring</span>
              <div className="flex items-center gap-2">
                <span className="momants-light-extrasmall-black">Every</span>
                <Input
                  type="number"
                  min={1}
                  value={recurringEvery}
                  onChange={(e) =>
                    setRecurringEvery(Number(e.target.value) || 1)
                  }
                  className="w-16 momants-light-small-black"
                />
                <select
                  value={recurringUnit}
                  onChange={(e) =>
                    setRecurringUnit(
                      e.target.value as "days" | "weeks" | "months",
                    )
                  }
                  className="rounded-md border border-gray-300 bg-white px-3 py-1 momants-light-small-darkgray"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </label>

          {/* Routine */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="schedule_type"
              value="routine"
              checked={scheduleType === "routine"}
              onChange={() => setScheduleType("routine")}
              className="mt-1 h-4 w-4 accent-black"
            />
            <div className="flex flex-col gap-2">
              <span className="momants-light-small-black">Routine</span>
              <div className="flex flex-wrap items-center gap-2">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => {
                  const key = `${day}-${index}`;
                  const isActive = routineDays.includes(key);

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setRoutineDays((prev) =>
                          prev.includes(key)
                            ? prev.filter((d) => d !== key)
                            : [...prev, key],
                        )
                      }
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
                        isActive
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}

                <Input
                  type="time"
                  value={routineTime}
                  onChange={(e) => setRoutineTime(e.target.value)}
                  className="w-fit bg-white momants-light-small-black"
                />
              </div>
            </div>
          </label>
        </div>

        <p className="momants-light-extrasmall-gray">
          Customize the scheduling for the campaign.
        </p>
      </div>

      {/* file selector */}
      {/* <div className="flex flex-col gap-1.5">
        	<Field>
					<label className="momants-light-small-black">New audience list</label>

					<div className="flex gap-2 items-center">
						<Input
							id="picture"
							type="file"
							multiple
							accept=".csv"
							onChange={handleFileChange}
							className="w-full text-transparent file:-ml-[6px] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:cursor-pointer"
						/>

						<a
							href="/csv/audience-template.csv"
							download="audience-template.csv"
							className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-md momants-semibold-extrasmall-darkgray">
							<Download />
							Download Template
						</a>
					</div>
					<small className="momants-semibold-extrasmall-gray -mt-2">
						* The filename will be the name of your audience list
					</small>
				</Field> 

        {selectedFiles.length > 0 && (
          <div className="flex flex-col gap-1 mt-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="p-1 flex items-center justify-between gap-2 text-sm text-gray-600"
              >
                <span className="truncate flex-1">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-black hover:text-gray-700 flex-shrink-0 p-1 rounded-full border border-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>*/}

      <TriggerDatePicker
        isOpen={openDatePicker}
        onClose={() => setOpenDatePicker(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};
