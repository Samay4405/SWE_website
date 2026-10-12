import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-18">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
