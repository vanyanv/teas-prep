import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

/**
 * Clerk components restyled to Calm Precision. var() references keep Clerk on
 * the live globals.css tokens, so its components follow the .dark theme swap
 * (next-themes sets color-scheme on <html>, which Clerk reads for dark mode).
 */
const clerkAppearance = {
  variables: {
    colorPrimary: "var(--primary)",
    colorPrimaryForeground: "var(--primary-foreground)",
    colorForeground: "var(--card-foreground)",
    colorBackground: "var(--card)",
    colorMuted: "var(--muted)",
    colorMutedForeground: "var(--muted-foreground)",
    colorInput: "var(--card)",
    colorInputForeground: "var(--card-foreground)",
    colorBorder: "var(--border)",
    colorRing: "var(--ring)",
    colorDanger: "var(--destructive)",
    colorSuccess: "var(--success)",
    colorWarning: "var(--warning)",
    borderRadius: "0.625rem",
    fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
  },
};

/**
 * The keyless dev instance is named "My Application"; these overrides keep the
 * card headers in the product's voice regardless of dashboard configuration.
 */
const clerkLocalization = {
  signIn: {
    start: {
      title: "Welcome back",
      subtitle: "Sign in to pick up your plan where you left off",
    },
  },
  signUp: {
    start: {
      title: "Create your account",
      subtitle: "Your diagnostic becomes a focused daily study plan",
    },
  },
};

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// viewport-fit=cover is required for env(safe-area-inset-*) to be non-zero on
// notched iPhones; the bottom nav and sticky action bars depend on it.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "TEAS 7 Prep",
  description:
    "Diagnose, plan, and practice your way to a strong ATI TEAS 7 score.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={clerkAppearance} localization={clerkLocalization}>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      >
        <body className="min-h-dvh antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
