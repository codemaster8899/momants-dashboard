"use client";

import { Agent } from "@/stores/data/useMeStore";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Portal,
} from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { useState } from "react";
import { InformationPopup } from "./InformationPopup";

interface AgentToggleButtonProps {
	agents: Agent[];
	selectedAgent: Agent | null;
	handleAgentSelect: (agent: Agent | null) => void;
}

export const AgentToggleButton = ({
	agents,
	selectedAgent,
	handleAgentSelect,
}: AgentToggleButtonProps) => {
	const [openAddAgentPopup, setOpenAddAgentPopup] = useState(false);

	const closeAddAgentPopup = () => {
		setOpenAddAgentPopup(false);
		// TODO: send notification to slack
	};

	return (
		<>
			{/* notification received popup */}
			{openAddAgentPopup && (
				<InformationPopup
					title="Request Received"
					description="Your request has been successfully submitted."
					buttonText="Close"
					closePopup={closeAddAgentPopup}
				/>
			)}

			{/* button and dropdown */}
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="w-8 h-8 focus:outline-none flex items-center justify-center shrink-0 rounded-full">
						<img
							className="rounded-full w-6 h-6 object-cover"
							src={selectedAgent?.logo}
							alt="Agent Logo"
						/>
					</button>
				</DropdownMenuTrigger>

				<Portal>
					<DropdownMenuContent
						side="right"
						align="center"
						className="!z-[9999] min-w-[240px] bg-white border rounded-md shadow-lg p-1 m-3">
						<p className="momants-bold-small-black ml-2 p-1">Select your agent</p>
						<div className="overflow-auto max-h-[200px]">
							{/* add agent item */}
							<DropdownMenuItem
								onClick={() => setOpenAddAgentPopup(true)}
								className={`group flex justify-left items-center mx-auto px-3 py-2 hover:bg-gray-100 momants-light-small-black cursor-pointer rounded-md focus:outline-none`}>
								<div className="flex justify-center items-center bg-gray-200 group-hover:bg-gray-300 rounded-full p-1">
									<Plus className="text-black w-4 h-4" />
								</div>
								<p className="ml-4">Add agent</p>
							</DropdownMenuItem>

							{/* rest of the agents */}
							{agents.map((agent, idx) => {
								return (
									<DropdownMenuItem
										key={idx}
										onClick={() => handleAgentSelect(agent)}
										className={`${
											agent.id == selectedAgent?.id ? "border border-gray-300 bg-gray-50" : ""
										} flex justify-left items-center mx-auto px-3 py-2 hover:bg-gray-100 momants-light-small-black cursor-pointer rounded-md focus:outline-none`}>
										<img
											className="rounded-full w-6 h-6 object-cover"
											src={agent.logo}
											alt="Agent Logo"
										/>
										<p className="ml-4 max-w-[140px] truncate">{agent.name}</p>
									</DropdownMenuItem>
								);
							})}
						</div>
					</DropdownMenuContent>
				</Portal>
			</DropdownMenu>
		</>
	);
};
