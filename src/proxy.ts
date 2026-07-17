import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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
  "/sign-in(.*)",
  "/sign-up(.*)",
  // Legacy auth paths; redirected to the Clerk pages in next.config.ts.
  "/signin",
  "/signup",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static assets, unless found in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
