"use client";

import { motion } from "framer-motion";

interface LumiereLogoProps {
  size?: number;
  animated?: boolean;
  variant?: "dark" | "light";
  showWordmark?: boolean;
}

export default function LumiereLogo({
  size = 44,
  animated = false,
  variant = "dark",
  showWordmark = false,
}: LumiereLogoProps) {
  const strokeMain = variant === "dark" ? "#1C1917" : "#FAF8F5";
  const goldAccent = "#C6A87C";
  const goldBright = "#E5C89B";

  return (
    <div className="inline-flex items-center gap-3 select-none">
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="LUMIÈRE Monogram"
      >
        <defs>
          <linearGradient
            id="lumiereGold"
            x1="12"
            y1="10"
            x2="68"
            y2="70"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={goldBright} />
            <stop offset="50%" stopColor={goldAccent} />
            <stop offset="100%" stopColor="#8A6D43" />
          </linearGradient>
        </defs>

        {/* Vanjski luksuzni okvir sa odsječenim uglovima */}
        <motion.path
          d="M22 6H58L74 22V58L58 74H22L6 58V22L22 6Z"
          stroke="url(#lumiereGold)"
          strokeWidth="2"
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : false}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Unutrašnja tanka linija za dubinu */}
        <motion.path
          d="M24.5 11H55.5L69 24.5V55.5L55.5 69H24.5L11 55.5V24.5L24.5 11Z"
          stroke={strokeMain}
          strokeOpacity="0.22"
          strokeWidth="1"
          initial={animated ? { opacity: 0 } : false}
          animate={animated ? { opacity: 1 } : false}
          transition={{ duration: 1.1, delay: 0.45 }}
        />

        {/* Moćno veliko slovo L — vertikalni stub sa serifnim završetkom */}
        <motion.path
          d="M25 20H35M30 20V56H54V48"
          stroke={strokeMain}
          strokeWidth="4.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : false}
          transition={{ duration: 1.35, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Zlatna paralelna linija unutar L za arhitektonski 3D efekat */}
        <motion.path
          d="M36 24V50H50"
          stroke="url(#lumiereGold)"
          strokeWidth="2"
          strokeLinecap="square"
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : false}
          transition={{ duration: 1.15, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Četvorokraka iskra svjetlosti (Lumière) u gornjem desnom uglu */}
        <motion.path
          d="M53 20C53 25.5 54.5 27 60 27C54.5 27 53 28.5 53 34C53 28.5 51.5 27 46 27C51.5 27 53 25.5 53 20Z"
          fill="url(#lumiereGold)"
          initial={animated ? { scale: 0, opacity: 0 } : false}
          animate={animated ? { scale: 1, opacity: 1 } : false}
          transition={{ duration: 0.7, delay: 1.45, ease: "backOut" }}
          style={{ transformOrigin: "53px 27px" }}
        />
      </svg>

      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-serif text-2xl font-semibold tracking-[0.22em] leading-none ${
              variant === "dark" ? "text-[#1C1917]" : "text-[#FAF8F5]"
            }`}
          >
            LUMIÈRE
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.32em] text-[#9E7E4F]">
            Salon &amp; Spa Booking
          </span>
        </div>
      )}
    </div>
  );
}