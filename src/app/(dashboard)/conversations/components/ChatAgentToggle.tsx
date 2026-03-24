"use client";
import { ConfirmPopup } from "@/components/Layout/ConfirmPopup";
import { Switch } from "@/components/ui/Switch";
import { useConversationsMemberStore } from "@/stores/data/useConversationsMemberStore";
import { isOlderThan24Hours } from "@/utils/olderThen";
import { useState } from "react";

export const ChatAgentToggle = () => {
	const [showPopup, setShowPopup] = useState(false);
	const [pendingToggle, setPendingToggle] = useState(false);

	const { takeOver, setTakeOver, conversationEndedAt } = useConversationsMemberStore();

	const disabled = isOlderThan24Hours(conversationEndedAt);
	const agentText = disabled
		? "The conversation is closed, you can not interact 24 hours after the last message is send"
		: "The AI Assistant is running the conversation";

	const handleSwitchChange = (newValue: boolean) => {
		setPendingToggle(newValue);
		setShowPopup(true);
	};

	const handleConfirm = () => {
		setShowPopup(false);
		setTakeOver(!takeOver);
	};

	const handleCancel = () => {
		setShowPopup(false);
	};

	return (
		<div className="flex h-12 border-b border-gray-200 items-center px-6">
			<p className="momants-light-extrasmall-gray">{agentText}</p>

			{!disabled && (
				<div className="flex items-center ml-auto gap-2">
					<Switch checked={!takeOver} length={40} onChange={handleSwitchChange} />
					<p className="momants-bold-small-black">🤖 AI Agent</p>
				</div>
			)}

			{showPopup && (
				<ConfirmPopup
					title={`${pendingToggle ? "Enable" : "Disable"} AI Assistant?`}
					description={`Click "Confirm" to ${
						pendingToggle ? "enable" : "disable"
					} "AI assistant" or "Cancel" to keep it ${!takeOver ? "active" : "inactive"}.`}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			)}
		</div>
	);
};
