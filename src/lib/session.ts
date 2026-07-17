import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";

import { track } from "@/lib/analytics";
import { db } from "@/lib/db";
import type { User } from "@/generated/prisma/client";

/**
 * Resolve the signed-in Clerk identity to our local User row, creating or
 * linking it on first contact. The local row is the anchor for every
 * learning-data relation, so subscription and auth changes never touch
 * study history.
 *
 * Linking order: by clerkId (normal case), then by verified email (accounts
 * that existed before the Clerk migration), then create.
 */
async function localUserForClerkId(clerkId: string): Promise<User> {
  const existing = await db.user.findUnique({ where: { clerkId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? null;
  const name =
    [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
    null;

  // Ties the new account back to the anonymous landing-page visit.
  const anonId = (await cookies()).get("aid")?.value ?? null;

  try {
    if (email) {
      const legacy = await db.user.findUnique({ where: { email } });
      if (legacy) {
        const linked = await db.user.update({
          where: { id: legacy.id },
          data: { clerkId, name: legacy.name ?? name },
        });
        await track("signup_completed", { linked: true }, { userId: linked.id, anonId });
        return linked;
      }
    }
    const created = await db.user.create({
      data: {
        clerkId,
        // Clerk requires an email for our enabled sign-in methods; the
        // fallback only guards the unique constraint against odd states.
        email: email ?? `${clerkId}@users.noreply.invalid`,
        name,
      },
    });
    await track("signup_completed", undefined, { userId: created.id, anonId });
    return created;
  } catch {
    // Two requests raced to create/link the same user; the other one won.
    const settled = await db.user.findUnique({ where: { clerkId } });
    if (settled) return settled;
    throw new Error("Could not resolve the signed-in user");
  }
}

/** Server-side guard for pages: returns the local user or redirects to sign-in. */
export async function requireUser(): Promise<User> {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return localUserForClerkId(userId);
}

/** Server-side guard for route handlers: returns the local user or null (caller sends the 401). */
export async function requireUserApi(): Promise<User | null> {
  const { userId } = await auth();
  if (!userId) return null;
  return localUserForClerkId(userId);
}
