import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Next 16 proxy (the middleware convention): first line of route protection.
 * Everything is private unless listed here; pages and API routes still run
 * their own `requireUser()`/`requireUserApi()` checks, so a matcher mistake
 * fails closed rather than open.
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/pricing",
  "/privacy",
  "/terms",
  "/contact",
  // Attribution for CC BY licensed artwork. The licence requires credit to be
  // accessible to anyone who sees the work, so this must not sit behind auth.
  "/credits",
  "/sign-in(.*)",
  "/sign-up(.*)",
  // Legacy auth paths; redirected to the Clerk pages in next.config.ts.
  "/signin",
  "/signup",
  // Anonymous browser events and Svix-signed Clerk webhooks.
  "/api/events",
  "/api/webhooks/clerk",
]);

const isApiRoute = createRouteMatcher(["/api(.*)", "/trpc(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    if (isApiRoute(req)) {
      // API calls must fail with a 401, never a redirect: a redirected fetch
      // returns the sign-in page with status 200, which client flows would
      // read as success and drop the user's answers.
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else {
      await auth.protect();
    }
  }

  // Anonymous funnel id: lets "landing visit → signup" join up in analytics.
  const res = NextResponse.next();
  if (!req.cookies.get("aid")) {
    res.cookies.set("aid", crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return res;
});

export const config = {
  matcher: [
    // Skip Next.js internals and static assets, unless found in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
