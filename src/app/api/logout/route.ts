import { authCookieNames } from "@/constants";
import { cookies } from "next/headers";

export async function GET() {
	const cookieStore = await cookies();

	// remove all auth cookies

	authCookieNames.forEach((name) => {
		cookieStore.delete(name);
	});

	return new Response(null, { status: 200 });
}
