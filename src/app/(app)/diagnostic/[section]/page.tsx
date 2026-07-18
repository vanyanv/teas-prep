import { notFound } from "next/navigation";

import { DiagnosticFlow } from "@/components/quiz/diagnostic-flow";
import { requireUser } from "@/lib/session";
import { parseSectionSlug, sectionLabel, sectionSlug } from "@/lib/teas-blueprint";

export default async function SectionDiagnosticPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  await requireUser();
  const { section: raw } = await params;
  const section = parseSectionSlug(raw);
  if (!section) notFound();
  return <DiagnosticFlow slug={sectionSlug(section)} label={sectionLabel(section)} />;
}
