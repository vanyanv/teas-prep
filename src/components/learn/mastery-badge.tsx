import { Badge } from "@/components/ui/badge";

/** Small mastery chip for Learn: not started / building / practicing / mastered. */
export function MasteryBadge({ pct }: { pct: number | null }) {
  if (pct == null) {
    return <Badge variant="outline">Not started</Badge>;
  }
  if (pct >= 80) return <Badge variant="success">Mastered · {pct}%</Badge>;
  if (pct >= 60) return <Badge variant="primary">Practicing · {pct}%</Badge>;
  return <Badge variant="warning">Building · {pct}%</Badge>;
}
