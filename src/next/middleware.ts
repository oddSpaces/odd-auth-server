import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  const dbUrl =
    process.env.AUTH_DB_URL || (process.env.NEXT_PUBLIC_AUTH_DB_URL as string);
  const apiSecret =
    process.env.AUTH_API_SECRET ||
    (process.env.NEXT_PUBLIC_AUTH_API_SECRET as string);
  const supabase = createServerClient(dbUrl, apiSecret, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // refreshing the auth token
  await supabase.auth.getUser();

  return supabaseResponse;
}
