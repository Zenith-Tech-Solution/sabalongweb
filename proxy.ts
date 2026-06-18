import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const bypass = request.nextUrl.searchParams.get("bypass")
  const bypassSecret = process.env.MAINTENANCE_BYPASS

  if (pathname === "/maintenance") {
    if (bypass === bypassSecret) {
      const res = NextResponse.redirect(new URL("/", request.url))
      res.cookies.set("maintenance_bypass", bypassSecret, {
        maxAge: 60 * 60 * 24,
        path: "/",
      })
      return res
    }
    return NextResponse.next()
  }

  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next()

  const cookieBypass = request.cookies.get("maintenance_bypass")?.value
  if (bypass === bypassSecret || cookieBypass === bypassSecret) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/favicon.ico") {
    return NextResponse.next()
  }

  const url = new URL("/maintenance", request.url)
  if (bypass) url.searchParams.set("bypass", bypass)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
}
