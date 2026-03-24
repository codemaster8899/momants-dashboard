"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Redirects users to /mobile on small screens. Adjust breakpoint as needed.
 */
export function useNoMobileRedirect() {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
		if (isMobile && pathname !== "/mobile") {
			router.replace("/mobile");
		}
	}, [pathname, router]);
}
