import { TimeUnit, timeUnitOption } from "@/constants";
import { daysBetween, sameDay, subtractDays } from "@/utils/daysBetween";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Popup } from "./Popup";

interface DateObj {
	day: number;
	isCurrentMonth: boolean;
	date: Date;
}

interface SelectedDates {
	start: Date | null;
	end: Date | null;
}

interface DayGridProps {
	days: DateObj[];
}

interface CustomDatePickerPopupProps {
	isOpen: boolean;
	onClose: () => void;
	selectedDates: SelectedDates;
	setSelectedDates: (dates: SelectedDates) => void;
	hideClearbutton?: boolean;
	buttonOptions?: number[];

	timeUnits?: timeUnitOption[];
	setTimeUnit?: (timeUnit: TimeUnit) => void;
	selectedTimeUnit?: TimeUnit | null;
}

export const CustomDatePickerPopup = ({
	isOpen,
	onClose,

	selectedDates,
	setSelectedDates,

	hideClearbutton = false,

	buttonOptions = [],

	timeUnits = [],
	selectedTimeUnit = null,
	setTimeUnit,
}: CustomDatePickerPopupProps) => {
	const [currentMonth, setCurrentMonth] = useState<Date>(() => {
		const now = new Date();
		return new Date(now.getFullYear(), now.getMonth(), 1);
	});

	useEffect(() => {
		// Reset tempSelectedDates when opening
		setTempSelectedDates(selectedDates);

		// Go to the month of the selected start date, or current month
		const startDate = selectedDates.start ?? new Date();
		setCurrentMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
	}, [isOpen, selectedDates]);

	// **Internal temporary state**
	const [tempSelectedDates, setTempSelectedDates] = useState<SelectedDates>(selectedDates);

	const [tempTypeUnit, setTempTypeUnit] = useState(selectedTimeUnit);

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setTempSelectedDates(selectedDates); // reset temp state when opened
	}, [isOpen, selectedDates]);

	const setButtonOption = (value: number) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set to midnight
		const start = subtractDays(today, value);
		start.setHours(0, 0, 0, 0); // Set to midnight
		setTempSelectedDates({ end: today, start });
	};

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
	const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	const getDaysInMonth = (date: Date): DateObj[] => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days: DateObj[] = [];

		// Previous month
		const prevMonthLastDay = new Date(year, month, 0).getDate();
		for (let i = startingDayOfWeek - 1; i >= 0; i--) {
			days.push({
				day: prevMonthLastDay - i,
				isCurrentMonth: false,
				date: new Date(year, month - 1, prevMonthLastDay - i),
			});
		}

		// Current month
		for (let day = 1; day <= daysInMonth; day++) {
			days.push({
				day,
				isCurrentMonth: true,
				date: new Date(year, month, day),
			});
		}

		// Next month
		const remainingDays = 42 - days.length;
		for (let day = 1; day <= remainingDays; day++) {
			days.push({
				day,
				isCurrentMonth: false,
				date: new Date(year, month + 1, day),
			});
		}

		return days;
	};

	const isFutureDate = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const check = new Date(date);
		check.setHours(0, 0, 0, 0);
		return check > today;
	};

	const getNextMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);
	const changeMonth = (direction: number) =>
		setCurrentMonth((prev) => {
			const newMonth = new Date(prev);
			newMonth.setMonth(prev.getMonth() + direction);
			return newMonth;
		});

	const handleDateClick = (dateObj: DateObj) => {
		if (!dateObj.isCurrentMonth || isFutureDate(dateObj.date)) return;

		if (!tempSelectedDates.start || tempSelectedDates.end) {
			setTempSelectedDates({ start: dateObj.date, end: null });
		} else {
			if (dateObj.date < tempSelectedDates.start) {
				setTempSelectedDates({
					start: dateObj.date,
					end: tempSelectedDates.start,
				});
			} else {
				setTempSelectedDates({
					start: tempSelectedDates.start,
					end: dateObj.date,
				});
			}
		}
	};

	const isStartOrEndDate = (date: Date) => {
		// check just the datetime without time
		if (tempSelectedDates.start && sameDay(date, tempSelectedDates.start)) {
			return true;
		}
		if (tempSelectedDates.end && sameDay(date, tempSelectedDates.end)) {
			return true;
		}

		return false;
	};

	const isMiddleDate = (date: Date) => {
		if (!tempSelectedDates.start || !tempSelectedDates.end) return false;
		const time = date.getTime();
		return time > tempSelectedDates.start.getTime() && time < tempSelectedDates.end.getTime();
	};

	const clearDates = () => setTempSelectedDates({ start: null, end: null });

	const leftMonthDays = getDaysInMonth(currentMonth);
	const rightMonth = getNextMonth(currentMonth);
	const rightMonthDays = getDaysInMonth(rightMonth);

	const DayGrid: React.FC<DayGridProps> = ({ days }) => (
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
					const darkTheme = dateObj.isCurrentMonth && isStartOrEndDate(dateObj.date);
					const middle = dateObj.isCurrentMonth && isMiddleDate(dateObj.date);

					return (
						<button
							key={idx}
							onClick={() => handleDateClick(dateObj)}
							disabled={isFutureDate(dateObj.date)}
							className={`
                aspect-square flex items-center justify-center text-sm my-1 transition-colors
                ${!dateObj.isCurrentMonth ? "text-gray-300 cursor-default" : "text-gray-900 hover:bg-gray-100"}
                ${darkTheme ? "!bg-black text-white hover:!bg-gray-700 rounded-md" : ""}
                ${middle ? "bg-gray-100 text-black hover:bg-gray-400" : ""}
                ${isFutureDate(dateObj.date) ? "!text-gray-300 hover:bg-transparent" : ""}
              `}>
							{dateObj.day}
						</button>
					);
				})}
			</div>
		</div>
	);

	// example:
	// user clicks on the hour time unit but sets dates to a date range
	// that is to big for hour time unit, so auto select the next smallest option
	// so that the api call does not crash
	useEffect(() => {
		// guard for if time units is not set
		if (!selectedTimeUnit || !setTempTypeUnit || !timeUnits) return;
		if (!tempSelectedDates.start || !tempSelectedDates.end) return;

		// find option with the same label name to get full object
		const timeUnitOption = timeUnits.find((option) => option.label === tempTypeUnit);
		if (!timeUnitOption) return;

		// check if current option still is below maxDifference
		if (
			timeUnitOption.maxDifference < daysBetween(tempSelectedDates.start, tempSelectedDates.end)
		) {
			//   // if curren option is not valid anymore
			//   //  select the first option that is valid
			let validOption = timeUnits.find(
				(option) =>
					option.maxDifference > daysBetween(tempSelectedDates.start!, tempSelectedDates.end!),
			);
			setTempTypeUnit(validOption?.label || null);
		}
	}, [tempSelectedDates]);

	if (!isOpen) return null;

	return (
		<Popup onClose={onClose}>
			<div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
			<div
				ref={containerRef}
				className="relative w-[800px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
				<div className="p-4">
					<div className="flex items-center justify-between mb-4 px-6">
						<div className="flex items-center gap-2 momants-light-small-darkgray">
							<Calendar className="w-3 h-3" />
							<span>
								{tempSelectedDates.start
									? tempSelectedDates.end
										? `${tempSelectedDates.start.toLocaleDateString()} - ${tempSelectedDates.end.toLocaleDateString()}`
										: tempSelectedDates.start.toLocaleDateString()
									: "Select a date"}
							</span>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<div className="flex items-center justify-between mb-2 px-2">
								<button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
									<ChevronLeft className="w-5 h-5 text-gray-700" />
								</button>
								<h3 className="font-semibold text-gray-700">
									{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
								</h3>
								<div className="w-6" />
							</div>
							<DayGrid days={leftMonthDays} />
						</div>
						<div>
							<div className="flex items-center justify-between mb-4 px-4">
								<div className="w-6" />
								<h3 className="font-semibold text-gray-700">
									{monthNames[rightMonth.getMonth()]} {rightMonth.getFullYear()}
								</h3>
								<button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded">
									<ChevronRight className="w-5 h-5 text-gray-700" />
								</button>
							</div>
							<DayGrid days={rightMonthDays} />
						</div>
					</div>
				</div>
				<div className="p-6 border-t border-gray-200">
					{/* New row of buttons above Cancel/Apply */}
					<div
						className={`flex mb-4 justify-between ${timeUnits?.length > 0 || buttonOptions?.length > 0 ? "border-b border-gray-200 pb-4" : ""}`}>
						<div className="flex gap-4">
							{buttonOptions?.length > 0 &&
								buttonOptions.map((buttonOption, idx) => {
									const today = new Date();

									const isToday = tempSelectedDates.end
										? tempSelectedDates.end.toDateString() === today.toDateString()
										: false;

									// rework needed: if no start date, pick today and today so it ends up 0, and no button will ever be 0 so it is safe
									const isActive =
										isToday &&
										Math.floor(
											// floor because we do not care about time, and daysBetween can output decimals
											daysBetween(tempSelectedDates.start || today, today),
										) === buttonOption;

									return (
										<button
											key={idx}
											className={`px-4 py-2 border-black rounded-3xl ${
												isActive
													? "momants-semibold-extrasmall-white bg-black hover:bg-gray-700"
													: "momants-semibold-extrasmall-black bg-gray-100 hover:bg-gray-300"
											}`}
											onClick={() => setButtonOption(buttonOption)}>
											{buttonOption + 1} days
										</button>
									);
								})}
						</div>

						{timeUnits && setTimeUnit && tempTypeUnit && (
							<div className="flex gap-4 items-center">
								<p className="text-xs">Time unit:</p>

								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<button
											type="button"
											className="min-w-[60px] capitalize momants-light-small-black border border-gray-200 rounded-3xl px-3 py-1 bg-white hover:bg-gray-50">
											{tempTypeUnit}
										</button>
									</DropdownMenuTrigger>

									<DropdownMenuPortal>
										<DropdownMenuContent
											align="start"
											className="z-[9999] min-w-[120px] p-2 m-2 bg-white shadow-lg rounded-md border border-gray-200">
											{timeUnits.map((unit) => {
												if (
													tempSelectedDates.start &&
													tempSelectedDates.end &&
													unit.maxDifference <
														daysBetween(tempSelectedDates.start, tempSelectedDates.end)
												) {
													return null;
												}

												return (
													<DropdownMenuItem
														key={unit.label}
														onSelect={() => setTempTypeUnit(unit.label)}
														className="capitalize px-3 py-1 hover:bg-gray-100 rounded-md cursor-pointer">
														{unit.label}
													</DropdownMenuItem>
												);
											})}
										</DropdownMenuContent>
									</DropdownMenuPortal>
								</DropdownMenu>
							</div>
						)}
					</div>

					{/* Existing Cancel / Clear / Apply row */}
					<div className="flex items-center justify-between">
						<div className="flex gap-4">
							<button
								onClick={onClose}
								className="px-4 py-2 momants-light-small-darkgray shadow hover:bg-gray-100 rounded-3xl">
								Cancel
							</button>
							{!hideClearbutton && (
								<button
									onClick={clearDates}
									className="px-4 py-2 momants-light-small-darkgray hover:bg-gray-100 rounded-3xl">
									Clear Dates
								</button>
							)}
						</div>
						<button
							onClick={() => {
								const finalDates = { ...tempSelectedDates };

								if (!tempSelectedDates.start && tempSelectedDates.end) {
									finalDates.start = tempSelectedDates.end;
								} else if (!tempSelectedDates.end && tempSelectedDates.start) {
									finalDates.end = tempSelectedDates.start;
								}

								if (finalDates.start && finalDates.end) {
									finalDates.start = new Date(new Date(finalDates.start).setHours(0, 0, 0, 0));
									finalDates.end = new Date(new Date(finalDates.end).setHours(23, 59, 59, 999));
								}

								// 2. Update both states with the corrected values
								setTempSelectedDates(finalDates);
								setSelectedDates(finalDates);

								// if there is time units, swt temp state to outside state
								if (setTimeUnit && tempTypeUnit) {
									setTimeUnit(tempTypeUnit);
								}
								onClose();
							}}
							className="px-6 py-2 bg-black momants-light-small-white rounded-3xl hover:bg-gray-800">
							Apply
						</button>
					</div>
				</div>
			</div>
		</Popup>
	);
};
