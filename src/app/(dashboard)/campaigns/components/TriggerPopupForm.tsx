import { DropdownInput } from "@/components/ui/DropDownInput";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";

const actionOptions = ["Action1", "Action2", "Action3"];
const timeOptions = ["before", "after"];
const timeUnits = ["seconds", "minutes", "hours"];

export const TriggerPopupForm = () => {
	const [actionOption, setActionOption] = useState(actionOptions[0]);
	const [timeOption, setTimeOption] = useState(timeOptions[0]);
	const [timeUnit, setTimeUnit] = useState(timeUnits[0]);

	return (
		<div className="flex flex-col gap-4">
			{/* Action */}
			<div className="flex flex-col gap-1.5">
				{/* template */}
				<DropdownInput
					labelText={"Action"}
					setSelectedItem={setActionOption}
					selectedItem={actionOption}
					placeholder={"Select a action"}>
					{actionOptions.map((item) => (
						<Select.Item
							key={item}
							value={item}
							className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
							<Select.ItemText>{item}</Select.ItemText>
						</Select.Item>
					))}
				</DropdownInput>
			</div>

			{/* time */}
			<div className="flex flex-col gap-1.5">
				<DropdownInput
					labelText={"Time"}
					setSelectedItem={setTimeOption}
					selectedItem={timeOption}
					placeholder={"Select a time"}>
					{timeOptions.map((item) => (
						<Select.Item
							key={item}
							value={item}
							className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
							<Select.ItemText>{item}</Select.ItemText>
						</Select.Item>
					))}
				</DropdownInput>
			</div>

			{/* Unit */}
			<div className="flex flex-col gap-1.5">
				<DropdownInput
					labelText={"Unit"}
					setSelectedItem={setTimeUnit}
					selectedItem={timeUnit}
					placeholder={"Select a unit"}>
					{timeUnits.map((item) => (
						<Select.Item
							key={item}
							value={item}
							className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
							<Select.ItemText>{item}</Select.ItemText>
						</Select.Item>
					))}
				</DropdownInput>
			</div>
		</div>
	);
};
