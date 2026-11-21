"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LumiereLogo from "./LumiereLogo";

let hasPlayedInCurrentSession = false;

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(!hasPlayedInCurrentSession);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    if (hasPlayedInCurrentSession) {
      setIsVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      hasPlayedInCurrentSession = true;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      setIsVisible(false);
    }, 2850);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }}
    >
      {isVisible && (
        <motion.div
          key="lumiere-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#141210] text-[#FAF8F5]"
        >
          <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-[#C6A87C]/15 blur-3xl" />

          <div className="relative flex flex-col items-center">
            <LumiereLogo size={104} animated={true} variant="light" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.75,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="mt-6 text-center"
            >
              <p className="font-serif text-3xl font-medium tracking-[0.28em] text-[#FAF8F5]">
                LUMIÈRE
              </p>
              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.38em] text-[#C6A87C]">
                Precision Beauty &amp; Style
              </p>
            </motion.div>

            <div className="mt-8 h-[1.5px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 1.85,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className="h-full w-full bg-gradient-to-r from-[#8A6D43] via-[#E5C89B] to-[#C6A87C]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}