import type { Metadata } from "next";
import { MotionLabClient } from "./MotionLabClient";

export const metadata: Metadata = {
  title: "Motion Lab | SWE MIT-WPU Design & Motion System",
  description:
    "Interactive showcase and testing suite for SWE MIT-WPU's motion tokens, micro-interactions, magnetic controls, and spatial depth.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MotionLabPage() {
  return <MotionLabClient />;
}
