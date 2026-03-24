import PageWrapper from "@/components/Layout/PageWrapper";
import { Overview } from "./components";

function Dashboard() {
  return (
    <PageWrapper title="Dashboard" headerMargin="mt-6 ml-6">
      <Overview />
    </PageWrapper>
  );
}

export default Dashboard;
