/**
 * Copy and plan facts shared by the landing page, the pricing page, and the
 * in-app upgrade surfaces. One source so the price, the promise, and the CTA
 * phrase never drift apart.
 */

/** The one primary CTA phrase, everywhere. */
export const CTA_LABEL = "Start Free Diagnostic";

export const PRICE = "$4.99";
export const PRICE_PERIOD = "month";
export const PRICE_BADGE = "Founding member price";

export const PLAN_NAME = "TEAS Pro";

/** Real product facts. Never invent counts. */
export const FACTS = "836 questions · 4 sections · 12 topics · 85 skills";

export const PRO_FEATURES = [
  "All 836 questions in every exam format",
  "Complete adaptive study plan, paced to your exam date",
  "All 85 guided lessons with quick checks",
  "Spaced review that brings weak skills back before you forget",
  "Timed section tests",
  "Full TEAS simulations, scored the way the exam is",
  "Progress, mastery, and readiness insights",
] as const;

export const FREE_FEATURES = [
  "The full diagnostic across all four sections",
  "Complete results with your three highest-priority skills",
  "Your first personalized study session",
  "Sample guided lessons, one per section",
  "A preview of your complete study plan",
] as const;

export const PRICING_SUPPORT =
  "No credit card required to begin. Upgrade after seeing your results. Cancel anytime.";

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is included in the free diagnostic?",
    a: "The complete diagnostic across Reading, Math, Science, and English, your full results, your three highest-priority skills, one personalized study session, and sample lessons. The free account does not expire.",
  },
  {
    q: "Do I need a credit card to begin?",
    a: "No. Create a free account and take the diagnostic. A card is only asked for if you decide to upgrade after seeing your results.",
  },
  {
    q: "What is included with TEAS Pro?",
    a: "Everything: all 836 questions, the complete adaptive study plan, all 85 guided lessons, spaced review, timed section tests, full mock exams, and complete progress insights. It is one plan at $4.99 per month.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes, from your billing page in a couple of clicks. You keep Pro access through the end of the period you already paid for, and your account then returns to the free plan.",
  },
  {
    q: "Is this affiliated with ATI?",
    a: "No. This is an independent study resource. ATI and TEAS are registered trademarks of Assessment Technologies Institute, which does not sponsor or endorse this product.",
  },
  {
    q: "Does this guarantee a particular TEAS score?",
    a: "No, and nothing honest can. What it gives you is an accurate picture of where you stand, a plan focused on the skills worth your time, and practice that mirrors the real exam.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes. It is designed phone-first: sessions, lessons, and full practice exams all work on a phone, with the primary action always in reach of your thumb.",
  },
  {
    q: "How is my study plan personalized?",
    a: "The diagnostic measures every skill, and you mark how confident you were on each answer, so a lucky guess never counts as mastery. Weak skills are ranked by how much of the exam they carry, spread across the days you have before your exam date, and brought back for review on a spaced schedule.",
  },
  {
    q: "What happens to my progress if I cancel?",
    a: "Nothing is deleted. Your history, mastery, and review schedule are kept, and the free plan limits simply apply again. If you resubscribe, you pick up exactly where you left off.",
  },
];
