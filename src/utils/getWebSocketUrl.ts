const getWebSocketUrl = () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
	if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_BASE_API_URL");

	const wsUrl = baseUrl.replace(/^http/, "ws");

	return wsUrl;
};
export default getWebSocketUrl;
