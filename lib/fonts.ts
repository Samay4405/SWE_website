import { Instrument_Serif, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "600"],
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  style: ["italic"],
  weight: "400",
});
