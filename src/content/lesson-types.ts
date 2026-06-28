import type { Section } from "@/lib/teas-blueprint";

export interface LessonBlock {
  heading: string;
  /** plain text; paragraphs separated by blank lines; "- " lines are bullets */
  body: string;
}

export interface Lesson {
  section: Section;
  topic: string; // blueprint topic key
  title: string;
  intro: string;
  sections: LessonBlock[];
}
