"use client";

import { motion } from "framer-motion";

/** Config: easy to adjust speed, colors, and number of shapes */
const BLOB_BASE = {
  colors: [
    "rgba(99, 102, 241, 0.5)",   // indigo-500
    "rgba(129, 140, 248, 0.45)", // indigo-400
    "rgba(79, 70, 229, 0.4)",    // indigo-600
    "rgba(139, 92, 246, 0.4)",   // violet-500
    "rgba(59, 130, 246, 0.45)",   // blue-500
    "rgba(96, 165, 250, 0.4)",   // blue-400
  ],
  sizes: [
    { w: 320, h: 320, blur: 80 },
    { w: 280, h: 280, blur: 70 },
    { w: 400, h: 400, blur: 90 },
    { w: 240, h: 240, blur: 60 },
    { w: 360, h: 360, blur: 85 },
    { w: 200, h: 200, blur: 50 },
    { w: 300, h: 300, blur: 75 },
    { w: 340, h: 340, blur: 82 },
  ],
} as const;

/** Blob positions (percent) and motion offsets */
const BLOB_POSITIONS: { left: number; top: number; moveX: number; moveY: number }[] = [
  { left: 10, top: 20, moveX: 40, moveY: 25 },
  { left: 70, top: 10, moveX: -35, moveY: 30 },
  { left: 50, top: 60, moveX: 30, moveY: -20 },
  { left: 85, top: 50, moveX: -45, moveY: 15 },
  { left: 20, top: 55, moveX: 25, moveY: -30 },
  { left: 60, top: 75, moveX: -30, moveY: -25 },
  { left: 35, top: 35, moveX: -20, moveY: 35 },
  { left: 75, top: 25, moveX: 35, moveY: -15 },
];

export type AnimatedBackgroundVariant = "hero" | "fullPage";

const HERO_CONFIG = {
  blobCount: 8,
  blobScale: 1.05,
  blobOpacityMultiplier: 1,
  gradientOpacity: 0.6,
  lineOpacity: 0.4,
  stripeOpacity: 0.25,
  durationMin: 18,
  durationMax: 32,
  showCenterHighlight: true,
};

const FULL_PAGE_CONFIG = {
  blobCount: 6,
  blobScale: 1,
  blobOpacityMultiplier: 1,
  gradientOpacity: 1,
  lineOpacity: 1,
  stripeOpacity: 1,
  durationMin: 22,
  durationMax: 38,
  showCenterHighlight: false,
};

interface AnimatedBackgroundProps {
  variant?: AnimatedBackgroundVariant;
  className?: string;
}

export default function AnimatedBackground({ variant = "hero", className = "" }: AnimatedBackgroundProps) {
  const config = variant === "hero" ? HERO_CONFIG : FULL_PAGE_CONFIG;
  const blobCount = config.blobCount;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ top: 0, left: 0, width: "100%", height: "100%" }}
      aria-hidden
    >
      {/* Base gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          opacity: config.gradientOpacity,
          background: `
            radial-gradient(ellipse 100% 80% at 30% 20%, rgba(99, 102, 241, 0.25), transparent 50%),
            radial-gradient(ellipse 80% 100% at 80% 80%, rgba(139, 92, 246, 0.2), transparent 45%),
            radial-gradient(ellipse 60% 60% at 50% 50%, rgba(59, 130, 246, 0.15), transparent 40%)
          `,
        }}
      />

      {/* Floating blurred blobs */}
      {BLOB_POSITIONS.slice(0, blobCount).map((pos, i) => {
        const baseSize = BLOB_BASE.sizes[i % BLOB_BASE.sizes.length];
        const size = {
          w: Math.round(baseSize.w * config.blobScale),
          h: Math.round(baseSize.h * config.blobScale),
          blur: Math.round(baseSize.blur * config.blobScale),
        };
        const color = BLOB_BASE.colors[i % BLOB_BASE.colors.length];
        const duration = config.durationMin + (i % 4) * 4;
        const delay = i * 0.8;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              width: size.w,
              height: size.h,
              marginLeft: -size.w / 2,
              marginTop: -size.h / 2,
              background: color,
              opacity: config.blobOpacityMultiplier,
              filter: `blur(${size.blur}px)`,
            }}
            animate={{
              x: [0, pos.moveX, 0],
              y: [0, pos.moveY, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: delay % 4,
            }}
          />
        );
      })}

      {/* Flowing route lines — use unique IDs per variant to avoid SVG conflicts when both mount */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: config.lineOpacity }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`lineGrad1-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id={`lineGrad2-${variant}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -5 22 Q 28 12 52 38 T 108 28 T 122 52"
          fill="none"
          stroke={`url(#lineGrad1-${variant})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="8 12"
          style={{ transform: "translateZ(0)" }}
          animate={{ strokeDashoffset: [0, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 105 72 Q 72 42 32 65 T -8 48"
          fill="none"
          stroke={`url(#lineGrad2-${variant})`}
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="6 10"
          style={{ transform: "translateZ(0)" }}
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Moving stripe layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: config.stripeOpacity,
          backgroundImage: `repeating-linear-gradient(
            100deg,
            transparent 0px,
            transparent 48px,
            rgba(99, 102, 241, 0.2) 48px,
            rgba(99, 102, 241, 0.2) 50px
          )`,
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100px 0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      {/* Hero only: light center gradient for text readability */}
      {config.showCenterHighlight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,255,255,0.12), transparent 65%)",
          }}
        />
      )}
    </div>
  );
}
