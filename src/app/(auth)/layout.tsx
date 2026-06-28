export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            TEAS 7 Prep
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Your study cockpit
          </h1>
        </div>
        {children}
      </div>
    </main>
  );
}
