"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LumiereLogo from "./LumiereLogo";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 border-b border-[#E7DFD5]/70 bg-[#FAF8F5]/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/">
          <LumiereLogo size={42} variant="dark" showWordmark={true} />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#57534E] md:flex">
          <Link href="#rezultati" className="transition-colors hover:text-[#1C1917]">
            Saloni &amp; Tretmani
          </Link>
          <Link href="#rezultati" className="transition-colors hover:text-[#1C1917]">
            Pametna Zamjena
          </Link>
          <Link
            href="/dashboard"
            className="font-semibold text-[#8A6D43] transition-colors hover:text-[#1C1917]"
          >
            Za Salone (Dashboard)
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full border border-[#D6CFC5] px-4 py-2 text-xs font-medium text-[#1C1917] transition-colors hover:border-[#1C1917] md:hidden"
          >
            Portal
          </Link>
          <Link
            href="#rezultati"
            className="rounded-full bg-[#1C1917] px-5 py-2.5 text-xs font-medium tracking-wider uppercase text-[#FAF8F5] transition-colors hover:bg-[#9E7E4F]"
          >
            Rezerviši termin
          </Link>
        </div>
      </div>
    </motion.header>
  );
}