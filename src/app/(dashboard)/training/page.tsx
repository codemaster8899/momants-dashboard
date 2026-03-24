"use client";

import { PageHeader } from "@/components/Layout/PageHeader";
import PageWrapper from "@/components/Layout/PageWrapper";
import LoadingState from "@/components/shared/LoadingState";
import { useMeStore } from "@/stores/data/useMeStore";
import { Suspense, useState } from "react";
import { CreateNewKnowledge } from "./components/CreateNewKnowledge";
import { EditAgentPopup } from "./components/EditAgentPopup";
import { InformationSection } from "./components/InformationSection";
import { QuestionSection } from "./components/QuestionSection";
import { TrainingProvider } from "./components/TrainingContext";

export default function Page() {
	const [showCreatePopup, setShowCreatePopup] = useState(false);
	const [showEditPopup, setShowEditPopup] = useState(false);
	const { currentAgent } = useMeStore();

	// ======== edit agent functions =============

	const handleEditAgent = () => {
		setShowEditPopup(true);
	};

	const handleEditCancel = () => {
		setShowEditPopup(false);
	};

	const handleEditConfirm = () => {
		setShowEditPopup(false);
	};

	// ======== create popup functions =============

	const handleNewKnowledge = () => {
		setShowCreatePopup(true);
	};

	const handleCreateCancel = () => {
		setShowCreatePopup(false);
	};

	const handleCreateConfirm = () => {
		setShowCreatePopup(false);
	};

	return (
		<PageWrapper title="Training" scrollable={false}>
			<PageHeader
				title={currentAgent?.name || ""}
				description="Your AI festival expert"
				buttonText="New knowledge"
				ExtraMainClassName="px-6"
				onNew={handleNewKnowledge}
				imageSource={currentAgent?.logo}
			/>

			<Suspense fallback={<LoadingState />}>
				<TrainingProvider>
					<main className="flex border overflow-hidden flex-1 min-h-0">
						<div className="w-[27%] border-gray-200 flex flex-col min-h-0">
							<InformationSection />
						</div>
						<div className="w-[73%] flex flex-col min-h-0">
							<QuestionSection />
						</div>
					</main>

					{showCreatePopup && (
						<CreateNewKnowledge onCancel={handleCreateCancel} onConfirm={handleCreateConfirm} />
					)}
				</TrainingProvider>
			</Suspense>

			{showEditPopup && (
				<EditAgentPopup onCancel={handleEditCancel} onConfirm={handleEditConfirm} />
			)}
		</PageWrapper>
	);
}
