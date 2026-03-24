import { PageHeader } from "../../../components/Layout/PageHeader";
import PageWrapper from "../../../components/Layout/PageWrapper";
import { InboxSection } from "./components/InboxSection";
import { MemberSection } from "./components/MemberSection";

// Disable static prerendering for this page to avoid
// SSR issues from client-only stores/charts during build.
export const dynamic = "force-dynamic";

export default function Page() {
	return (
		<PageWrapper title="Conversations" scrollable={false}>
			<PageHeader
				title="Conversations"
				description="Conversations you need to manage"
				ExtraMainClassName="pl-6"
			/>
			<main className="flex mt-6 border overflow-hidden flex-1 min-h-0">
				<div className="w-2/8 border-gray-200 flex flex-col min-h-0">
					<InboxSection />
				</div>
				<div className="flex-1 flex flex-col min-h-0">
					<MemberSection />
				</div>
			</main>
		</PageWrapper>
	);
}
