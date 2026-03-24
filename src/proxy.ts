import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "./constants";

const logout = (request: NextRequest) => {
  const response = NextResponse.redirect(new URL("/", request.url));

  // delete any existing auth cookies just in case
  authCookieNames.forEach((name) => {
    response.cookies.delete(name);
  });

  return response;
};

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access");
  const refresh = cookieStore.get("refresh");
  // If access token exists, continue
  if (access) return NextResponse.next();

  // No access token: call refresh endpoint
  if (!refresh) return logout(request); // No refresh token either, redirect to login

  try {
    const refreshUrl = new URL("/api/refresh", request.url);
    const response = await fetch(refreshUrl.toString(), {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });

    if (!response.ok) return logout(request); // Refresh failed, redirect to login

    // send the cookie we just got to the next request after this proxy
    const nextResponse = NextResponse.next();
    const setCookies = response.headers.getSetCookie();
    setCookies.forEach((cookie) => {
      nextResponse.headers.append("Set-Cookie", cookie);
    });

    return nextResponse;
  } catch {
    return logout(request);
  }
}

export const config = {
  matcher: [
    "/conversations/:path*",
    "/campaigns/:path*",
    "/dashboard/:path*",
    "/qrcodes/:path*",
    "/templates/:path*",
    "/training/:path*",
  ],
};
