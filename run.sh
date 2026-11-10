#!/usr/bin/env bash

# Resolve project root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PREV_DIR="$ROOT_DIR/.prev_version"

echo "=========================================================="
echo "  SWE MIT-WPU Website - Side-by-Side Dual Runner"
echo "=========================================================="

# 1. Setup worktree for previous version (HS-change) if not present
if [ ! -d "$PREV_DIR" ]; then
    echo "📦 Setting up .prev_version worktree for branch HS-change..."
    git worktree add "$PREV_DIR" HS-change
    
    # Link node_modules into worktree
    if [ ! -d "$PREV_DIR/node_modules" ]; then
        echo "🔗 Linking node_modules..."
        if command -v cygpath >/dev/null 2>&1; then
            WIN_PREV=$(cygpath -w "$PREV_DIR/node_modules")
            WIN_ROOT=$(cygpath -w "$ROOT_DIR/node_modules")
            cmd.exe /c "mklink /J \"$WIN_PREV\" \"$WIN_ROOT\"" 2>/dev/null || ln -s "$ROOT_DIR/node_modules" "$PREV_DIR/node_modules"
        else
            ln -s "$ROOT_DIR/node_modules" "$PREV_DIR/node_modules" 2>/dev/null || true
        fi
    fi

    # Ensure package-lock.json exists in worktree
    cp "$ROOT_DIR/package-lock.json" "$PREV_DIR/package-lock.json" 2>/dev/null || true

    # Configure Turbopack root in .prev_version/next.config.ts
    cat << 'EOF' > "$PREV_DIR/next.config.ts"
import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: path.resolve(".."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
EOF
fi

# 2. Cleanup handler to terminate background processes on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down both servers..."
    trap - SIGINT SIGTERM EXIT
    [ -n "$PID_REVAMP" ] && kill "$PID_REVAMP" 2>/dev/null || true
    [ -n "$PID_PREV" ] && kill "$PID_PREV" 2>/dev/null || true
    
    # Windows-specific: ensure node processes releasing ports 3000 & 3001
    if command -v netstat >/dev/null 2>&1; then
        for port in 3000 3001; do
            pids=$(netstat -ano 2>/dev/null | grep ":$port " | grep "LISTENING" | awk '{print $5}' | sort -u)
            for p in $pids; do
                if [ -n "$p" ] && [ "$p" != "0" ]; then
                    taskkill //F //PID "$p" 2>/dev/null || true
                fi
            done
        done
    fi
    exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# 3. Launch revamped version on port 3000
echo ""
echo "🌟 [1/2] Launching Revamped Version (experimental_stuff) on port 3000..."
cd "$ROOT_DIR"
npx next dev -p 3000 &
PID_REVAMP=$!

# 4. Launch previous version on port 3001
echo "⏳ [2/2] Launching Previous Version (HS-change) on port 3001..."
cd "$PREV_DIR"
npx next dev -p 3001 &
PID_PREV=$!

echo ""
echo "=========================================================="
echo "✅ Both servers are running:"
echo "   👉 Revamped: http://localhost:3000 (experimental_stuff)"
echo "   👉 Previous: http://localhost:3001 (HS-change)"
echo "=========================================================="
echo "Press Ctrl+C at any time to stop both servers."
echo ""

# Wait for both background processes
wait "$PID_REVAMP" "$PID_PREV"
