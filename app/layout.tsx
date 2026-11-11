import type { Metadata } from "next";
import { inter, instrumentSerif } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlobBackground } from "@/components/BlobBackground";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swe-mitwpu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "SWE MIT-WPU — Society of Women Engineers",
    description:
      "Engineering the Future, Together. Join the SWE MIT-WPU Student Chapter.",
    url: siteUrl,
    siteName: "SWE MIT-WPU",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero/swe-logo.png",
        width: 1200,
        height: 630,
        alt: "Society of Women Engineers MIT-WPU Chapter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWE MIT-WPU — Society of Women Engineers",
    description:
      "Engineering the Future, Together. Join the SWE MIT-WPU Student Chapter in Pune.",
    images: ["/images/hero/swe-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Society of Women Engineers (SWE) MIT-WPU Student Chapter",
    alternateName: "SWE MIT-WPU",
    url: siteUrl,
    logo: `${siteUrl}/images/hero/swe-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Survey No. 124, Paud Road, Kothrud",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411038",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/swe_mitwpu",
      "https://www.linkedin.com/company/swe-mit-wpu",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} h-full`}
    >
      <head>
        {/* Anti-Flicker Script for Instant Dark/Light Theme Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('swe-theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground transition-colors duration-300">
        {/* Skip to Content link for keyboard accessibility */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider>
          <div className="site-bg">
            <BlobBackground />
            <Navbar />
            <main id="main" tabIndex={-1} className="relative z-[1] flex-1 pt-16 md:pt-18 outline-none">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
