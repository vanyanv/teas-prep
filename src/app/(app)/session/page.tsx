import { requireUser } from "@/lib/session";
import { SessionFlow } from "@/components/session/session-flow";

export default async function SessionPage() {
  await requireUser();
  return <SessionFlow />;
}
