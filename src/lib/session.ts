import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Server-side guard: returns the signed-in user or redirects to /signin. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");
  return session.user;
}
