import { redirect } from "next/navigation";

// The NurseHub certified test is now the base diagnostic. Keep this path alive
// for old links and redirect it to the single diagnostic entry point.
export default function NurseHubPage() {
  redirect("/diagnostic");
}
