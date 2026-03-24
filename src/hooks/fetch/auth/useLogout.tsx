import { clearAccessTokenCache } from "@/lib/api";
import { useMeStore } from "@/stores/data/useMeStore";
import { useCallback, useState } from "react";

export const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { clear } = useMeStore();

	const logout = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch("/api/logout", {
				method: "GET",
				credentials: "include",
			});

			if (res.ok) {
				clearAccessTokenCache();
				clear();
				return null;
			}

			const result = await res.json();
			setError(result?.error || "Unknown error");
			return result;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unexpected error");
			return { error };
		} finally {
			setLoading(false);
		}
	}, []);

	return { logout, loading, error };
};
