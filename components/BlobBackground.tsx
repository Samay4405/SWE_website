import React from "react";
import "./BlobBackground.css";

export function BlobBackground() {
  return (
    <div className="blob-bg-container" aria-hidden="true">
      {/* 1. Top-left, partly off-screen: A, ~520px, top 0%, left -180px */}
      <div className="blob blob-style-a blob-1" />

      {/* 2. Right side: C, ~400px, top 12%, right -140px */}
      <div className="blob blob-style-c blob-2" />

      {/* 3. Left side: B, ~500px, top 28%, left -200px */}
      <div className="blob blob-style-b blob-3" />

      {/* 4. Right side: A, ~480px, top 44%, right -180px */}
      <div className="blob blob-style-a blob-4" />

      {/* 5. Left side: C, ~420px, top 60%, left -140px */}
      <div className="blob blob-style-c blob-5" />

      {/* 6. Right side: B, ~540px, top 76%, right -200px */}
      <div className="blob blob-style-b blob-6" />

      {/* 7. Bottom-right, partly off-screen: B, ~560px, bottom -200px, right -200px */}
      <div className="blob blob-style-b blob-7" />

      {/* 8. Bottom-left: A, ~460px, bottom -120px, left -160px */}
      <div className="blob blob-style-a blob-8" />
    </div>
  );
}
