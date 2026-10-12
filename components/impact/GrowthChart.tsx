"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { yearlyGrowth } from "@/content/stats";

export function GrowthChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-80 flex items-center justify-center bg-card rounded-xl border border-border">
        <span className="text-xs font-mono text-muted-foreground animate-pulse">
          Loading growth analytics...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-80 pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={yearlyGrowth}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorMembers" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="5%" stop-color="#4A3AFF" stop-opacity={0.3} />
              <stop offset="95%" stop-color="#4A3AFF" stop-opacity={0.0} />
            </linearGradient>
            <linearGradient id="colorEvents" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="5%" stop-color="#6B5CFF" stop-opacity={0.2} />
              <stop offset="95%" stop-color="#6B5CFF" stop-opacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            className="text-border/40"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            stroke="currentColor"
            className="text-muted-foreground text-xs font-mono"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="currentColor"
            className="text-muted-foreground text-xs font-mono"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-card p-3 shadow-lg text-xs">
                    <p className="font-mono font-bold text-foreground mb-1">
                      Academic Year: {label}
                    </p>
                    <p className="text-primary font-medium">
                      Active Members: {payload[0]?.value}
                    </p>
                    {payload[1] && (
                      <p className="text-muted-foreground">
                        Events Conducted: {payload[1]?.value}
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="members"
            stroke="#4A3AFF"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorMembers)"
            name="Active Members"
          />
          <Area
            type="monotone"
            dataKey="events"
            stroke="#94A3B8"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#colorEvents)"
            name="Events Conducted"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
