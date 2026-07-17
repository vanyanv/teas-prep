import { requireUser } from "@/lib/session";
import { billingEnabled } from "@/lib/access";
import { FocusModeProvider } from "@/components/focus-mode";
import { AppShell } from "@/components/app-shell";
import { UpgradedNotice } from "@/components/upgraded-notice";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <FocusModeProvider>
      <AppShell
        user={{ name: user.name, email: user.email }}
        showBilling={billingEnabled()}
      >
        <UpgradedNotice />
        {children}
      </AppShell>
    </FocusModeProvider>
  );
}
