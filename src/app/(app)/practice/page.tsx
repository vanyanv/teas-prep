import { PracticeFlow } from "@/components/quiz/practice-flow";

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; topic?: string }>;
}) {
  const { section, topic } = await searchParams;
  return <PracticeFlow initialSection={section ?? ""} initialTopic={topic ?? ""} />;
}
