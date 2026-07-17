import { requireUser } from "@/lib/session";
import { getAccess } from "@/lib/access";
import { SessionFlow } from "@/components/session/session-flow";
import { UpgradePanel } from "@/components/upgrade-panel";
import { PageContainer, PageHeader } from "@/components/ui/page";

export default async function SessionPage() {
  const user = await requireUser();

  // The free plan includes one full personalized session. After that, the
  // session surface itself explains what continuing costs; the API enforces.
  const access = await getAccess(user.id);
  if (!access.isPro && access.sessionsLeft <= 0) {
    return (
      <PageContainer width="narrow">
        <PageHeader
          kicker="Today's session"
          title="Your next session is ready to build."
          sub="You finished the personalized session included with the free plan."
        />
        <UpgradePanel
          className="mt-8"
          heading="Continue your daily sessions"
          body="Every day, TEAS Pro composes the session with the highest payoff: the lesson for your weakest skill, the questions that follow from it, and the review that just came due."
          unlocks={[
            "A fresh personalized session every day until your exam",
            "All 836 questions and every guided lesson",
            "Spaced review that keeps finished skills from fading",
          ]}
          after="/session"
          context="session"
        />
      </PageContainer>
    );
  }

  return <SessionFlow />;
}
