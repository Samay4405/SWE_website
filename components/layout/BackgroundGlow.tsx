import React from "react";
import "./BackgroundGlow.css";

export function BackgroundGlow() {
  return (
    <div className="bg-glow-container" aria-hidden="true">
      {/* 1. Top-Left (Blob 1 Spec) */}
      <div className="bg-glow-orb bg-glow-blob-1" />

      {/* 2. Right edge ~720px down (Blob 3 Spec) */}
      <div className="bg-glow-orb bg-glow-blob-2" />

      {/* 3. Left edge ~1450px down (Blob 1 Style) */}
      <div className="bg-glow-orb bg-glow-blob-3" />

      {/* 4. Right edge ~2200px down (Blob 2 Style) */}
      <div className="bg-glow-orb bg-glow-blob-4" />

      {/* 5. Left edge ~2950px down (Blob 3 Style) */}
      <div className="bg-glow-orb bg-glow-blob-5" />

      {/* 6. Right edge ~3700px down (Blob 1 Style) */}
      <div className="bg-glow-orb bg-glow-blob-6" />

      {/* 7. Left edge ~4450px down (Blob 3 Style) */}
      <div className="bg-glow-orb bg-glow-blob-7" />

      {/* 8. Bottom-Right (Blob 2 Spec) */}
      <div className="bg-glow-orb bg-glow-blob-bottom" />
    </div>
  );
}
