import { redirect } from "next/navigation";

// Temporary: the authed home moved to /today. This root page becomes the
// public marketing landing in the redesign's final phase.
export default function RootPage() {
  redirect("/today");
}
