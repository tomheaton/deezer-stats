import { getBaseUrl } from "@/utils";
import { NextResponse } from "next/server";

export async function GET() {
  const url = new URL("https://connect.deezer.com/oauth/auth.php");

  url.searchParams.append("app_id", process.env.DEEZER_APP_ID ?? "123456");
  // url.searchParams.append("perms", "basic_access,email,listening_history");
  url.searchParams.append("perms", "listening_history");
  url.searchParams.append("redirect_uri", `${getBaseUrl()}/api/callback`);

  return NextResponse.redirect(url, 302);
}
