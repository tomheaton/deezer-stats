import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const requestUrl = new URL(
    "https://connect.deezer.com/oauth/access_token.php"
  );

  requestUrl.searchParams.append("code", url.searchParams.get("code") ?? "");
  requestUrl.searchParams.append("secret", process.env.DEEZER_APP_SECRET ?? "");
  requestUrl.searchParams.append("app_id", process.env.DEEZER_APP_ID ?? "");

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
    },
  });

  console.log("response status:", response.status);
  console.log("response:", JSON.stringify(response, null, 2));
  console.log("content-type:", response.headers.get("content-type"));

  const text = await response.text();

  const redirectUrl = new URL("http://localhost:3000/app");
  const token = text.split("=")[1].split("&")[0];
  redirectUrl.searchParams.append("token", token);

  // return NextResponse.json({ message: "deezer-stats", data: token });
  return NextResponse.redirect(redirectUrl, 302);
}
