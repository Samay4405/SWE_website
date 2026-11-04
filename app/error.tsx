"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Application Error Boundary caught error]:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-xs font-mono uppercase tracking-widest text-red-700 mb-6">
        <span>Application Notice</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1E1033] max-w-xl leading-tight">
        An Unexpected Error <span className="font-accent">Occurred</span>.
      </h1>

      <p className="mt-4 text-base text-[#6B6385] font-light max-w-md leading-relaxed">
        Something went wrong while rendering this section. You can retry the operation or return to the home screen.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#6538A5] text-white hover:bg-[#532D8A] transition-all duration-300 shadow-sm"
        >
          <RefreshCw className="size-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-[#E9E3FB] bg-white text-[#1E1033] hover:bg-[#F6F2FC] transition-all duration-300"
        >
          <Home className="size-4 text-[#6538A5]" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}

