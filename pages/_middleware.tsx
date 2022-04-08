import { NextResponse } from "next/server";

export default function middleware(req) {
  const { cookies } = req;

  let parsedCookies;
  let token = undefined;
  try {
    parsedCookies = JSON.parse(cookies.userData);
    token = parsedCookies.token;
  } catch (err) {}

  const url = req.url;
  const { origin } = req.nextUrl;

  if (url.includes("/auth")) {
    if (token !== undefined) return NextResponse.redirect(`${origin}/`);
  }

  if (url.includes("/place/new")) {
    if (!token) return NextResponse.redirect(`${origin}/`);
  }
  return NextResponse.next();
}
