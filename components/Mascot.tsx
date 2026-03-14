"use client";

import { motion } from "framer-motion";

const floatTransition = { duration: 3, repeat: Infinity, ease: "easeInOut" as const };
const blinkTransition = { duration: 0.15, repeat: Infinity, repeatDelay: 3 };

interface MascotProps {
  className?: string;
  size?: number;
  wave?: boolean;
}

export default function Mascot({ className = "", size = 120, wave = false }: MascotProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={floatTransition}
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <motion.svg
        width={size}
        height={size * 0.7}
        viewBox="0 0 160 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Car body - friendly rounded shape */}
        <motion.ellipse
          cx="80"
          cy="72"
          rx="52"
          ry="28"
          fill="#2563EB"
          stroke="#1d4ed8"
          strokeWidth="2"
        />
        <motion.rect
          x="35"
          y="52"
          width="90"
          height="28"
          rx="14"
          fill="#2563EB"
          stroke="#1d4ed8"
          strokeWidth="2"
        />
        {/* Car top/cabin */}
        <motion.ellipse
          cx="80"
          cy="48"
          rx="32"
          ry="20"
          fill="#3b82f6"
          stroke="#2563eb"
          strokeWidth="2"
        />
        {/* Windshield */}
        <path
          d="M55 48 Q80 38 105 48 L105 58 Q80 52 55 58 Z"
          fill="#93c5fd"
          fillOpacity="0.6"
        />
        {/* Eyes */}
        <motion.ellipse
          cx="65"
          cy="42"
          rx="8"
          ry="10"
          fill="#0F172A"
          animate={wave ? { scaleY: [1, 0.2, 1] } : {}}
          transition={blinkTransition}
        />
        <motion.ellipse
          cx="95"
          cy="42"
          rx="8"
          ry="10"
          fill="#0F172A"
          animate={wave ? { scaleY: [1, 0.2, 1] } : {}}
          transition={blinkTransition}
        />
        {/* Eye shine */}
        <circle cx="67" cy="40" r="2" fill="white" />
        <circle cx="97" cy="40" r="2" fill="white" />
        {/* Smile */}
        <motion.path
          d="M68 52 Q80 58 92 52"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={wave ? { d: ["M68 52 Q80 58 92 52", "M68 54 Q80 50 92 54", "M68 52 Q80 58 92 52"] } : {}}
          transition={{ duration: 0.5, repeat: wave ? Infinity : 0, repeatDelay: 2 }}
        />
        {/* Wheels */}
        <motion.circle
          cx="48"
          cy="78"
          r="12"
          fill="#334155"
          stroke="#1e293b"
          strokeWidth="2"
        />
        <circle cx="48" cy="78" r="6" fill="#64748b" />
        <motion.circle
          cx="112"
          cy="78"
          r="12"
          fill="#334155"
          stroke="#1e293b"
          strokeWidth="2"
        />
        <circle cx="112" cy="78" r="6" fill="#64748b" />
        {/* Headlights (glow) */}
        <motion.ellipse
          cx="28"
          cy="68"
          rx="4"
          ry="6"
          fill="#fef08a"
          opacity="0.9"
          animate={{ opacity: [0.9, 0.5, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="132"
          cy="68"
          rx="4"
          ry="6"
          fill="#fef08a"
          opacity="0.9"
          animate={{ opacity: [0.9, 0.5, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Wave hand - small flag or arm */}
        {wave && (
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 15, -10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
            style={{ transformOrigin: "100px 35px" }}
          >
            <rect x="98" y="32" width="14" height="6" rx="2" fill="#22C55E" />
            <circle cx="112" cy="35" r="3" fill="#22C55E" />
          </motion.g>
        )}
      </motion.svg>
    </motion.div>
  );
}
