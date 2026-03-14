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
  const h = size * (80 / 120);

  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={floatTransition}
      whileHover={{ scale: 1.06, y: -4, rotate: 2 }}
    >
      <motion.svg
        width={size}
        height={h}
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle building silhouettes (advertising spaces) */}
        <motion.g opacity={0.12} fill="#0f172a">
          <rect x="4" y="52" width="14" height="24" rx="2" />
          <rect x="20" y="44" width="12" height="32" rx="2" />
          <rect x="102" y="48" width="14" height="28" rx="2" />
          <rect x="88" y="54" width="10" height="22" rx="2" />
        </motion.g>

        {/* Main body — friendly blob (brand/connector) */}
        <motion.ellipse
          cx="52"
          cy="48"
          rx="26"
          ry="28"
          fill="#2563eb"
          stroke="#1d4ed8"
          strokeWidth="2"
        />
        <motion.ellipse
          cx="52"
          cy="48"
          rx="22"
          ry="24"
          fill="#3b82f6"
          fillOpacity={0.4}
          stroke="none"
        />

        {/* Face — eyes */}
        <motion.ellipse
          cx="44"
          cy="44"
          rx="5"
          ry="6"
          fill="#0f172a"
          animate={wave ? { scaleY: [1, 0.15, 1] } : {}}
          transition={blinkTransition}
          style={{ transformOrigin: "44px 44px" }}
        />
        <motion.ellipse
          cx="60"
          cy="44"
          rx="5"
          ry="6"
          fill="#0f172a"
          animate={wave ? { scaleY: [1, 0.15, 1] } : {}}
          transition={blinkTransition}
          style={{ transformOrigin: "60px 44px" }}
        />
        <circle cx="45" cy="42.5" r="1.2" fill="white" />
        <circle cx="61" cy="42.5" r="1.2" fill="white" />

        {/* Smile */}
        <motion.path
          d="M42 52 Q52 58 62 52"
          stroke="#0f172a"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          animate={
            wave
              ? {
                d: [
                  "M42 52 Q52 58 62 52",
                  "M42 53.5 Q52 49 62 53.5",
                  "M42 52 Q52 58 62 52",
                ],
              }
              : {}
          }
          transition={{ duration: 0.5, repeat: wave ? Infinity : 0, repeatDelay: 2 }}
        />

        {/* Optional small banner ribbon (accent) */}
        <motion.path
          d="M28 38 L32 34 L36 38 L32 42 Z"
          fill="#22c55e"
          stroke="#16a34a"
          strokeWidth="1"
          animate={{ opacity: [0.9, 0.6, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
}
