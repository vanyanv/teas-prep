import type { Section } from "@/lib/teas-blueprint";

export interface QuickRefGroup {
  heading: string;
  items: string[];
}

export interface QuickReference {
  section: Section;
  title: string;
  groups: QuickRefGroup[];
}
