import { Kicker } from "@/components/ui/page";

export const metadata = {
  title: "Contact · TEAS 7 Prep",
  description: "How to reach TEAS 7 Prep with questions, feedback, or billing issues.",
};

const CONTACT_EMAIL = "chris@chrisneddys.com";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <Kicker>Contact</Kicker>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Talk to a person.
      </h1>
      <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
        Questions about the product, your subscription, or your account all go
        to the same place. Billing issues are handled first.
      </p>
      <p className="mt-6 text-base">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-md font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted-foreground">
        Expect a reply within two business days. If you are writing about a
        charge, include the email address on your account so it can be found
        quickly.
      </p>
    </div>
  );
}
