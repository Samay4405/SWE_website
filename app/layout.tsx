import type { Metadata } from "next";
import { inter, instrumentSerif } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
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
      className={`${inter.variable} ${instrumentSerif.variable} h-full`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-white">
        <div className="site-bg">
          <Navbar />
          <main className="relative z-[1] flex-1 pt-16 md:pt-18">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
