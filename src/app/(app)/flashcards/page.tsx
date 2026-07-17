import { FlashcardReview } from "@/components/flashcards/flashcard-review";
import { UpgradePanel } from "@/components/upgrade-panel";
import { PageContainer, PageHeader } from "@/components/ui/page";
import { requireUser } from "@/lib/session";
import { isPro } from "@/lib/access";

export default async function FlashcardsPage() {
  await requireUser();
  if (!(await isPro())) {
    return (
      <PageContainer width="narrow">
        <PageHeader
          kicker="A&P flashcards"
          title="Anatomy sticks when it comes back on schedule."
          sub="Spaced-repetition flashcards for the memorization-heavy science material."
        />
        <UpgradePanel
          className="mt-8"
          heading="Keep reviewing your weak skills"
          body="Spaced repetition brings each card back right before you would forget it, so anatomy and physiology stay ready without rereading chapters."
          unlocks={[
            "The full A&P flashcard deck on a spaced schedule",
            "Automatic review of questions you missed or guessed",
            "Review sessions folded into your daily plan",
          ]}
          after="/flashcards"
          context="flashcards"
        />
      </PageContainer>
    );
  }
  return <FlashcardReview />;
}
