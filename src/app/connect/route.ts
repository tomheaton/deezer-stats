import { NextResponse } from "next/server";

export async function GET() {
  const url = new URL("https://connect.deezer.com/oauth/auth.php");

  url.searchParams.append("app_id", process.env.DEEZER_APP_ID ?? "123456");
  url.searchParams.append(
    "redirect_uri",
    // "https://deezer-stats.vercel.app/api/callback"
    "http://localhost:3000/api/callback"
  );
  url.searchParams.append("perms", "basic_access,email,listening_history");

  return NextResponse.redirect(url, 302);
}
