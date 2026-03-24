import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh")?.value;

  if (!refresh) {
    return new Response(
      JSON.stringify({ error: "refresh token is required" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const proxyURL = new URL(
    "/dashboard/token/refresh",
    process.env.BASE_API_URL,
  );
  const proxyRequest = new Request(proxyURL.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refresh }),
  });

  try {
    const response = await fetch(proxyRequest);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid response from backend" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const rememberMe = cookieStore.get("rememberMe")?.value === "true";

    // set new refresh token
    cookieStore.set({
      name: "refresh",
      value: data.refresh,
      httpOnly: true,
      path: "/",
      ...(rememberMe && { maxAge: 30 * 24 * 60 * 60 }), // 30 days if rememberMe, otherwise session cookie
    });

    // set new access token
    cookieStore.set({
      name: "access_token",
      value: data.access,
      httpOnly: true,
      path: "/",
      maxAge: data.access_token_lifetime_seconds,
      domain: "staging-api.momants.ai",
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
