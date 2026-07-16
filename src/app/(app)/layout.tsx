import { requireUser } from "@/lib/session";
import { FocusModeProvider } from "@/components/focus-mode";
import { AppShell } from "@/components/app-shell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <FocusModeProvider>
      <AppShell user={{ name: user.name, email: user.email }}>
        {children}
      </AppShell>
    </FocusModeProvider>
  );
}
