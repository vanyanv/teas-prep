import { Kicker } from "@/components/ui/page";
import { assetsForCredits } from "@/content/assets";

export const metadata = {
  title: "Credits and Attributions · TEAS 7 Prep",
  description:
    "Sources and licences for the diagrams and illustrations used in TEAS 7 Prep.",
};

const PROVIDER_LABEL: Record<string, string> = {
  SERVIER: "Servier Medical Art",
  WIKIMEDIA: "Wikimedia Commons",
  CDC_PHIL: "CDC Public Health Image Library",
  OPEN_ANATOMY: "Open Anatomy Project",
  CUSTOM: "Original artwork",
};

export default function CreditsPage() {
  const assets = assetsForCredits();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16">
      <Kicker>Credits</Kicker>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Credits and attributions
      </h1>
      <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-muted-foreground">
        Science diagrams in this product are adapted from openly licensed
        sources. Each entry below names the original creator, links the source
        and its licence, and states whether the work was modified. Where a
        licence requires attribution, it is given here and alongside the diagram
        itself.
      </p>

      {assets.length === 0 ? (
        <p className="mt-10 text-[15px] leading-relaxed text-muted-foreground">
          No third-party assets are in use yet. Every diagram currently shipping
          is original artwork created for this product.
        </p>
      ) : (
        <ul className="mt-10 flex flex-col gap-8">
          {assets.map((a) => (
            <li key={a.id} className="border-t pt-6">
              <h2 className="text-base font-semibold">{a.title}</h2>
              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                {a.description}
              </p>

              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                <dt className="text-muted-foreground">Creator</dt>
                <dd>{a.creator}</dd>

                <dt className="text-muted-foreground">Source</dt>
                <dd>
                  <a
                    href={a.originalSourceUrl}
                    className="underline underline-offset-4 hover:text-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {PROVIDER_LABEL[a.sourceProvider] ?? a.sourceProvider}
                  </a>
                </dd>

                <dt className="text-muted-foreground">Licence</dt>
                <dd>
                  <a
                    href={a.licenseUrl}
                    className="underline underline-offset-4 hover:text-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {a.licenseName}
                  </a>
                </dd>

                <dt className="text-muted-foreground">Modified</dt>
                <dd>
                  {a.adaptationAllowed
                    ? "Yes. Labels, callouts, and layout adapted for this product."
                    : "No."}
                </dd>
              </dl>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {a.attributionText}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-12 border-t pt-6 text-sm leading-relaxed text-muted-foreground">
        Not affiliated with or endorsed by ATI. ATI and TEAS are trademarks of
        Assessment Technologies Institute.
      </p>
    </div>
  );
}
