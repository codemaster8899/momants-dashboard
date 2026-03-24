"use client";

import { Popup } from "@/components/Layout/Popup";
import { DropdownInput } from "@/components/ui/DropDownInput";
import { addDays } from "@/utils/addDays";
import * as Select from "@radix-ui/react-select";
import { Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CampaignsResponse, TCampaignType, TCreateCampaign } from "../types";
import { BroadcastPopupForm } from "./BroadcastPopupForm";
import { TriggerPopupForm } from "./TriggerPopupForm";

interface CreateCampaignPopupProps {
	data: CampaignsResponse | null | undefined;
	isLoading?: boolean;
	onCancel: () => void;
	onConfirm: (body: TCreateCampaign) => void | Promise<void>;
}

export const CreateCampaignPopup = ({
	data,
	isLoading,
	onConfirm,
	onCancel,
}: CreateCampaignPopupProps) => {
	const router = useRouter();
	if (!data) return;
	const { approved_templates, message_platforms, campaign_types } = data;

	const [selectedTemplate, setSelectedTemplate] = useState<string>(
		approved_templates?.[0]?.template_id ?? "",
	);
	const [selectedPlatform, setSelectedPlatform] = useState<string>(
		message_platforms?.[0]?.value ?? "",
	);
	const [campaignType, setCampaignType] = useState<TCampaignType | null>(
		(campaign_types?.[0] as TCampaignType | undefined) ?? null,
	);
	const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
	const [audienceList, setAudienceList] = useState<string>("");

	const handleCreateCampaign = () => {
		if (!selectedTemplate || !selectedPlatform || !campaignType) return;

		const body: TCreateCampaign = {
			template_id: selectedTemplate,
			message_platform: selectedPlatform,
			campaign_type: campaignType,
			campaign: {
				audience_list: audienceList ? [audienceList] : [],
				broadcast_schedule: {
					type: "once",
					broadcast_datetime: selectedDate.toISOString(),
				},
			},
		};

		onConfirm(body);
	};

	return (
		<Popup onClose={onCancel}>
			<div className="bg-white border rounded-lg shadow-sm flex flex-col w-[600px] p-6 overflow-y-auto">
				<h2 className="text-left font-sans momants-semibold-large-black mt-6">Make a campaign</h2>

				{/* template */}
				<div className="mt-4 w-full">
					{(approved_templates?.length ?? 0) > 0 ? (
						<DropdownInput
							labelText={"Template"}
							setSelectedItem={setSelectedTemplate}
							selectedItem={selectedTemplate ?? ""}
							placeholder={"Select a template"}>
							{(approved_templates ?? []).map(({ template_id, template_name }) => (
								<Select.Item
									key={template_id}
									value={template_id}
									className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
									<Select.ItemText>{template_name}</Select.ItemText>
								</Select.Item>
							))}
						</DropdownInput>
					) : (
						<>
							<label className="momants-light-small-black">Template</label>
							<button
								onClick={() => router.push("/templates")}
								className="momants-light-small-darkgray w-full px-3 py-2 border flex items-center justify-between text-start rounded-md">
								No templates yet, create your first template
								<Link2 />
							</button>
						</>
					)}
				</div>

				{/* message platform */}
				<div className="mt-2">
					<DropdownInput
						labelText={"Message platform"}
						setSelectedItem={setSelectedPlatform}
						selectedItem={selectedPlatform ?? ""}
						placeholder={"Select a platform"}>
						{(message_platforms ?? []).map(({ display_name, value }) => (
							<Select.Item
								key={value}
								value={value}
								className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
								<Select.ItemText>{display_name}</Select.ItemText>
							</Select.Item>
						))}
					</DropdownInput>
				</div>

				{/* Radio Group */}
				{/* <label className="mt-4 momants-light-small-black">Campaign Type</label>
        <RadioGroup.Root
          value={campaignType}
          onValueChange={(value: string) =>
            setCampaignType(value as TCampaignType)
          }
          className="flex flex-col gap-2 mt-2"
        >
          {campaign_types.map((type) => (
            <RadioGroup.Item
              key={type}
              value={type}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="flex border w-5 h-5 border-gray-400 rounded-full items-center justify-center">
                <RadioGroup.Indicator className="h-[10px] w-[10px] bg-black rounded-full" />
              </div>
              <span className="momants-light-extrasmall-black capitalize">
                {type}
              </span>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root> */}
				<div className="mt-6">
					{/* depending on which button is clicked select last part from the form */}
					{campaignType === "broadcast" && (
						<BroadcastPopupForm
							selectedDate={selectedDate}
							audienceList={audienceList}
							setAudienceList={setAudienceList}
							setSelectedDate={setSelectedDate}
						/>
					)}
					{campaignType === "trigger" && <TriggerPopupForm />}
				</div>
				<div className="flex justify-between mt-6">
					<button
						onClick={onCancel}
						className="px-4 py-2 momants-light-small-darkgray rounded-full border border-gray-300 hover:bg-gray-100">
						Cancel
					</button>
					<button
						onClick={handleCreateCampaign}
						className="px-4 py-2 momants-light-small-white rounded-full bg-black hover:bg-gray-800 disabled:opacity-40"
						disabled={!selectedTemplate || !selectedPlatform || isLoading}>
						Confirm
					</button>
				</div>
			</div>
		</Popup>
	);
};
