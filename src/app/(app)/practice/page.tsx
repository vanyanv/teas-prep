import { PracticeFlow } from "@/components/quiz/practice-flow";

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{
    section?: string;
    topic?: string;
    subtopic?: string;
    difficulty?: string;
    count?: string;
    mode?: string;
  }>;
}) {
  const { section, topic, subtopic, difficulty, count, mode } =
    await searchParams;
  return (
    <PracticeFlow
      initialSection={section ?? ""}
      initialTopic={topic ?? ""}
      initialSubtopic={subtopic ?? ""}
      initialDifficulty={difficulty ?? ""}
      initialCount={count ? Number(count) : 10}
      initialMode={mode === "review" ? "review" : "filter"}
    />
  );
}
