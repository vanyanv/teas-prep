import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

/**
 * Clerk components restyled to Calm Precision. Values are the light-theme
 * OKLCH tokens from globals.css, inlined because Clerk derives shades from
 * them and needs concrete colors, not var() references.
 */
const clerkAppearance = {
  variables: {
    colorPrimary: "oklch(0.48 0.09 200)",
    colorPrimaryForeground: "oklch(0.99 0.005 85)",
    colorForeground: "oklch(0.24 0.02 255)",
    colorBackground: "oklch(0.995 0.002 85)",
    colorMuted: "oklch(0.955 0.007 85)",
    colorMutedForeground: "oklch(0.51 0.018 255)",
    colorInput: "oklch(0.995 0.002 85)",
    colorInputForeground: "oklch(0.24 0.02 255)",
    colorBorder: "oklch(0.905 0.01 85)",
    colorRing: "oklch(0.48 0.09 200)",
    colorDanger: "oklch(0.56 0.18 27)",
    colorSuccess: "oklch(0.6 0.12 160)",
    colorWarning: "oklch(0.63 0.13 75)",
    borderRadius: "0.625rem",
    fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
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
    <ClerkProvider appearance={clerkAppearance}>
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
