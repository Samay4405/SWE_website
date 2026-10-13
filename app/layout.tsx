import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://swe-mitwpu.vercel.app"
  ),
  robots: { index: true, follow: true },
  title: {
    default: "SWE MIT-WPU — Society of Women Engineers",
    template: "%s | SWE MIT-WPU",
  },
  description:
    "Society of Women Engineers, MIT-WPU Student Chapter, Pune. Engineering the Future, Together. Join a community of aspiring engineers building technical excellence, leadership, and impact.",
  keywords: [
    "SWE",
    "Society of Women Engineers",
    "MIT-WPU",
    "Pune",
    "Women in Engineering",
    "Student Chapter",
    "STEM",
  ],
  openGraph: {
    title: "SWE MIT-WPU — Society of Women Engineers",
    description:
      "Engineering the Future, Together. Join the SWE MIT-WPU Student Chapter.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main" className="flex-1 pt-16 md:pt-18">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
