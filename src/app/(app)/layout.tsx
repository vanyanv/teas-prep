import { requireUser } from "@/lib/session";
import { FocusModeProvider } from "@/components/focus-mode";
import { AppShell } from "@/components/app-shell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return (
    <FocusModeProvider>
      <AppShell>{children}</AppShell>
    </FocusModeProvider>
  );
}
