import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  // Validate required fields
  if (
    !body ||
    typeof body.identifier !== "string" ||
    typeof body.password !== "string" ||
    typeof body.rememberMe !== "boolean" ||
    !body.identifier.trim() ||
    !body.password.trim()
  ) {
    return new Response(
      JSON.stringify({
        error: "username, password and rememberMe are required",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  const rememberMe = body.rememberMe;
  const proxyURL = new URL("/dashboard/login", process.env.BASE_API_URL);

  const proxyRequest = new Request(proxyURL.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  try {
    const response = await fetch(proxyRequest);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid response" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cookieStore = await cookies();

    // set refresh token
    cookieStore.set({
      name: "refresh",
      value: data.refresh,
      httpOnly: true,
      path: "/",
      ...(rememberMe && { maxAge: 30 * 24 * 60 * 60 }), // 30 days if rememberMe, otherwise session cookie
    });

    // set access token
    cookieStore.set({
      name: "access_token",
      value: data.access,
      httpOnly: true,
      path: "/",
      maxAge: data.access_token_lifetime_seconds,
      domain: ".momants.ai",
      secure: true,
      sameSite: "none",
    });

    cookieStore.set({
      name: "access",
      value: data.access,
      httpOnly: true,
      path: "/",
      maxAge: data.access_token_lifetime_seconds,
    });

    // rememberMe
    cookieStore.set({
      name: "rememberMe",
      value: rememberMe.toString(),
      httpOnly: true,
      path: "/",
      ...(rememberMe && { maxAge: 30 * 24 * 60 * 60 }), // 30 days if rememberMe, otherwise session cookie
    });

    return new Response(null, { status: 200 });
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : "Unexpected exception";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
