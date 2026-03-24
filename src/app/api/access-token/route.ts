import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ access }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
