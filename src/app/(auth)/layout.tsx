import Link from "next/link";

/** The same wordmark and voice as the landing, narrowed to one task. */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              TEAS 7
            </span>
            <span className="ml-1.5 font-semibold tracking-tight">Prep</span>
          </Link>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
            Take one diagnostic. Know what to study.
          </h1>
        </div>
        {children}
      </div>
    </main>
  );
}
