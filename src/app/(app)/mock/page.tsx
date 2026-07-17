import { MockFlow } from "@/components/quiz/mock-flow";
import { UpgradePanel } from "@/components/upgrade-panel";
import { PageContainer, PageHeader } from "@/components/ui/page";
import { requireUser } from "@/lib/session";
import { isPro } from "@/lib/access";

export default async function MockPage() {
  await requireUser();
  if (!(await isPro())) {
    return (
      <PageContainer width="narrow">
        <PageHeader
          kicker="Full practice exam"
          title="Sit the whole exam before you sit the real one."
          sub="Timed, in real TEAS section order with breaks, and scored the way the exam is."
        />
        <UpgradePanel
          className="mt-8"
          heading="Unlock full mock exams"
          body="A full mock is the closest thing to test day: real timing, real section order, and a score you can trust. Most students sit one or two in their final weeks."
          unlocks={[
            "Full-length TEAS simulations with section timing and breaks",
            "Timed section tests for focused endurance work",
            "Scoring and pacing breakdowns after every attempt",
          ]}
          after="/mock"
          context="mock"
        />
      </PageContainer>
    );
  }
  return <MockFlow />;
}
