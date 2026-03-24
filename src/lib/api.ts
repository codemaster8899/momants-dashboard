let cachedAccess: string | null = null;

export function clearAccessTokenCache(): void {
	cachedAccess = null;
}

async function getAccessToken(): Promise<string> {
	if (cachedAccess) return cachedAccess;

	const res = await fetch("/api/access-token", {
		method: "GET",
		credentials: "include",
		headers: { Accept: "application/json" },
	});

	if (!res.ok) {
		const err = new Error("Not authenticated") as Error & { status?: number };
		err.status = res.status;
		throw err;
	}

	const data = (await res.json()) as { access: string };
	cachedAccess = data.access;
	return data.access;
}

async function refreshToken(): Promise<void> {
	const res = await fetch("/api/refresh", {
		method: "GET",
		credentials: "include",
		headers: { Accept: "application/json" },
	});
	if (!res.ok) throw new Error("Refresh failed");
	cachedAccess = null;
}

type APIInit = RequestInit & { skipRetry?: boolean };

function isNetworkError(msg: string): boolean {
	return msg === "Failed to fetch" || msg.includes("NetworkError") || msg.includes("Load failed");
}

export async function API(path: string, init: APIInit = {}): Promise<Response> {
	const { skipRetry, ...restInit } = init;
	const url = path.startsWith("http")
		? path
		: `/backend${path.startsWith("/") ? path : `/${path}`}`;

	const request = async (token: string) => {
		const headers = new Headers(restInit.headers);
		headers.set("Authorization", `Bearer ${token}`);
		if (!headers.has("Accept")) headers.set("Accept", "application/json");
		return await fetch(url, { ...restInit, headers });
	};

	try {
		const token = await getAccessToken();
		const res = await request(token);

		if (res.status === 401 && !skipRetry) {
			clearAccessTokenCache();
			await refreshToken();
			return request(await getAccessToken());
		}

		return res;
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		if (isNetworkError(msg)) {
			const origin = typeof window !== "undefined" ? window.location.origin : "";
			throw new Error(`${msg}. Ensure the backend allows CORS from this origin: ${origin}`);
		}
		throw err;
	}
}
