import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const requestUrl = new URL(
    "https://connect.deezer.com/oauth/access_token.php",
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

  const text = await response.text();

  // TODO: better error checking here

  if (text === "Parameters missing") {
    return NextResponse.redirect("/", 302);
  }

  if (text === "wrong code") {
    return NextResponse.redirect("/", 302);
  }

  const paramsList = text.split("&");
  const paramsObject: { [key: string]: string } = {};

  for (const param of paramsList) {
    const [name, value] = param.split("=");
    paramsObject[name] = value;
  }

  if (!paramsObject.access_token) {
    return NextResponse.redirect("/", 302);
  }

  const redirectUrl = new URL(`${process.env.APP_URL}/home`);

  redirectUrl.searchParams.append("token", paramsObject.access_token);

  return NextResponse.redirect(redirectUrl, 302);
}
