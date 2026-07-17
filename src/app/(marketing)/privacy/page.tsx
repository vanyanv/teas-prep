import { Kicker } from "@/components/ui/page";

export const metadata = {
  title: "Privacy Policy · TEAS 7 Prep",
  description: "What TEAS 7 Prep collects, why, and what it will never do with your data.",
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What this covers",
    body: [
      "This policy describes what information TEAS 7 Prep collects when you use the website and study application, how it is used, and the choices you have. Using the product means agreeing to this policy.",
    ],
  },
  {
    title: "What we collect",
    body: [
      "Account information: your email address, your name if you provide one, and your sign-in credentials, which are managed by our authentication provider rather than stored by us.",
      "Study information you provide: your exam date, study preferences, answers to questions, confidence ratings, and lesson activity. This is the material the product exists to work with; without it there is no plan to personalize.",
      "Payment information: if you subscribe, payment is processed by our billing providers. We never see or store your card number. We keep only a reference to your subscription status.",
      "Technical basics: standard web logs and the minimal usage events needed to understand whether features like the diagnostic and study sessions are working.",
    ],
  },
  {
    title: "How it is used",
    body: [
      "To run the product: score your diagnostic, build and adapt your study plan, schedule review, and show your progress.",
      "To operate the business: process subscriptions, answer support email, and understand which parts of the product are used.",
      "We do not sell your personal information. We do not share it with advertisers. We do not use your study data for anything except your own study experience and aggregate product improvement.",
    ],
  },
  {
    title: "Who else touches your data",
    body: [
      "The product runs on infrastructure and service providers: hosting, a database, an authentication provider, and a payment processor. Each receives only what it needs to do its job, under its own contractual and legal obligations.",
    ],
  },
  {
    title: "Retention and deletion",
    body: [
      "Your study history is kept while your account exists, including if you cancel a subscription, so you can return without losing progress.",
      "You can request deletion of your account and its data at any time by emailing the address on the contact page. Deletion is permanent.",
    ],
  },
  {
    title: "Changes",
    body: [
      "If this policy changes in a way that matters, the date below will change and significant updates will be noted on this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <Kicker>Privacy</Kicker>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Privacy policy
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
