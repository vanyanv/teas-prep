import { Kicker } from "@/components/ui/page";

export const metadata = {
  title: "Terms of Service · TEAS 7 Prep",
  description: "The terms that govern using TEAS 7 Prep.",
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "The service",
    body: [
      "TEAS 7 Prep is a study tool for the ATI TEAS exam: a diagnostic, practice questions, lessons, study planning, and progress tracking. It is an independent study resource, not affiliated with or endorsed by ATI. ATI and TEAS are registered trademarks of Assessment Technologies Institute.",
    ],
  },
  {
    title: "Your account",
    body: [
      "You need an account to study. Keep your credentials to yourself; you are responsible for activity under your account. One account is for one person.",
    ],
  },
  {
    title: "Subscriptions and billing",
    body: [
      "The free plan includes the diagnostic, your results, and a limited sample of the study experience. TEAS Pro is a monthly subscription, currently $4.99 per month, that unlocks the full product.",
      "Subscriptions renew automatically each month until canceled. You can cancel anytime from your billing page; access continues through the end of the period you paid for, and no further charges are made.",
      "If a renewal payment fails and cannot be collected, the subscription ends and the account returns to the free plan. Your study history is kept either way.",
    ],
  },
  {
    title: "No outcome guarantees",
    body: [
      "The product improves preparation; it does not promise results. No specific TEAS score, admission decision, or other outcome is guaranteed or implied, and you should treat any product that promises one with suspicion.",
    ],
  },
  {
    title: "Acceptable use",
    body: [
      "Do not copy, scrape, resell, or redistribute the question bank or lessons; they are copyrighted content licensed to you for personal study. Do not attempt to break, probe, or overload the service.",
    ],
  },
  {
    title: "Content and availability",
    body: [
      "Questions and lessons are reviewed for accuracy but may contain errors; corrections ship regularly. The service is provided as is, and while outages are rare, uninterrupted availability is not warranted.",
    ],
  },
  {
    title: "Liability",
    body: [
      "To the maximum extent permitted by law, liability for any claim arising from use of the service is limited to the amount you paid in the twelve months before the claim.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "These terms may be updated as the product evolves. Material changes will be reflected in the date below, and continued use after a change means acceptance.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <Kicker>Terms</Kicker>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Terms of service
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Effective July 16, 2026
      </p>
      <div className="mt-10 space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-base font-semibold tracking-tight">
              {section.title}
            </h2>
            <div className="mt-2 space-y-3">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="max-w-prose text-[15px] leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
