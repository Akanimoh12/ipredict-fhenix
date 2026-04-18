"use client";

export function MoonBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Primary moon - large, slow rotation */}
      <div className="moon-orbit-1 absolute">
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-500/[0.03] via-indigo-500/[0.05] to-transparent blur-3xl" />
      </div>

      {/* Secondary moon - medium, counter-rotation */}
      <div className="moon-orbit-2 absolute">
        <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-cyan-400/[0.03] via-violet-400/[0.04] to-transparent blur-3xl" />
      </div>

      {/* Tertiary moon - small accent glow */}
      <div className="moon-orbit-3 absolute">
        <div className="h-[300px] w-[300px] rounded-full bg-gradient-to-r from-indigo-400/[0.04] to-purple-500/[0.03] blur-2xl" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
