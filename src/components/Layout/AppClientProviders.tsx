"use client";

import { useNoMobileRedirect } from "@/hooks/useNoMobileRedirect";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type AppClientProvidersProps = {
	children: ReactNode;
};

export const AppClientProviders = ({ children }: AppClientProvidersProps) => {
	const [queryClient] = useState(() => new QueryClient());

	useNoMobileRedirect();

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
