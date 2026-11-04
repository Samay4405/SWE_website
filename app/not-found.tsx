import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E9E3FB] bg-[#F6F2FC] text-xs font-mono uppercase tracking-widest text-[#6538A5] mb-6">
        <Sparkles className="size-3 text-[#E8B94F]" />
        <span>404 · Navigation Error</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#1E1033] max-w-xl leading-tight">
        Lost in the <span className="font-accent">Constellation</span>?
      </h1>

      <p className="mt-4 text-base sm:text-lg text-[#6B6385] font-light max-w-md leading-relaxed">
        The coordinates you entered don’t correspond to any page or initiative in this orbit.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#1E1033] text-white hover:bg-[#6538A5] transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="size-4" />
          <span>Return to Chapter Home</span>
        </Link>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-[#E9E3FB] bg-white text-[#1E1033] hover:text-[#6538A5] hover:bg-[#F6F2FC] transition-all duration-300"
        >
          <span>Explore Events</span>
        </Link>
      </div>
    </div>
  );
}

