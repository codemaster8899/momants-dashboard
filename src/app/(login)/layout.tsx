import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayout {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayout) {
  const cookieStore = await cookies();
  const hasRefresh = cookieStore.has("refresh");
  const hasAccess = cookieStore.has("access");

  // if access and refresh user is authenticated,
  // so do not let user access login
  if (hasAccess && hasRefresh) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
