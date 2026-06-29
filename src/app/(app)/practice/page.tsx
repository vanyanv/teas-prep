import { PracticeFlow } from "@/components/quiz/practice-flow";

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; topic?: string; subtopic?: string }>;
}) {
  const { section, topic, subtopic } = await searchParams;
  return (
    <PracticeFlow
      initialSection={section ?? ""}
      initialTopic={topic ?? ""}
      initialSubtopic={subtopic ?? ""}
    />
  );
}
