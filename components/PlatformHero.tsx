"use client";

import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Sparkles,
  RotateCcw,
  Calendar,
  SlidersHorizontal,
  LocateFixed,
  Loader2,
  Radar,
} from "lucide-react";
import { ServiceCategory } from "@/lib/mock-data";

interface PlatformHeroProps {
  selectedCategory: ServiceCategory | "Sve";
  setSelectedCategory: (cat: ServiceCategory | "Sve") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cityInput: string;
  setCityInput: (city: string) => void;
  radiusKm: number;
  setRadiusKm: (r: number) => void;
  searchMode: "default" | "city" | "nearby";
  onSearchByCity: (cityOverride?: string) => void;
  onSearchNearby: (radiusOverride?: number) => void;
  isLoadingSalons: boolean;
  onQuickRebook: () => void;
}

const CATEGORIES: (ServiceCategory | "Sve")[] = [
  "Sve",
  "Kosa",
  "Nokti",
  "Masaža",
  "Lice & Tijelo",
];

const RADIUS_OPTIONS = [5, 10, 20, 35, 50];
const POPULAR_CITIES = ["Bristol", "London", "München", "Sarajevo", "Berlin"];

export default function PlatformHero({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  cityInput,
  setCityInput,
  radiusKm,
  setRadiusKm,
  searchMode,
  onSearchByCity,
  onSearchNearby,
  isLoadingSalons,
  onQuickRebook,
}: PlatformHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#E7DFD5] bg-gradient-to-b from-[#F4EFE8] via-[#FAF8F5] to-[#FAF8F5] pt-28 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Gornja traka: Brzi Re-booking baner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#C6A87C]/40 bg-white/90 px-5 py-3.5 shadow-sm backdrop-blur-md sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-[#E5C89B]">
              <RotateCcw className="h-4 w-4" />
            </span>
            <p className="text-xs text-[#44403C] sm:text-sm">
              <span className="font-semibold text-[#1C1917]">
                Dobrodošli nazad!
              </span>{" "}
              Vaš zadnji tretman:{" "}
              <span className="font-medium text-[#9E7E4F]">
                Signature Balayage (Sara Kovač)
              </span>{" "}
              — Karton stila #7.1+Olaplex je spreman.
            </p>
          </div>
          <button
            onClick={onQuickRebook}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FAF3E8] px-4 py-1.5 text-xs font-semibold text-[#8A6D43] transition-colors hover:bg-[#1C1917] hover:text-white"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ponovi tretman (1-Klik)
          </button>
        </motion.div>

        {/* Naslov platforme */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="font-serif text-4xl leading-tight font-medium text-[#1C1917] sm:text-5xl">
            Pronađi salone u svom gradu ili{" "}
            <span className="italic text-[#9E7E4F]">u svojoj blizini</span> i
            rezerviši odmah.
          </h1>
          <p className="mt-3 text-sm text-[#57534E] sm:text-base">
            Pretraži bilo koji grad po imenu (npr. Bristol, London, München) ili
            uključi svoju trenutnu lokaciju sa radijusom u kilometrima.
          </p>
        </motion.div>

        {/* Glavni Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-8 rounded-3xl border border-[#D6CFC5] bg-white p-3.5 shadow-xl shadow-[#1C1917]/5"
        >
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            {/* Polje 1: Tretman ili naziv salona */}
            <div className="flex items-center gap-3 rounded-2xl bg-[#FAF8F5] px-4 py-3 lg:col-span-3">
              <Search className="h-5 w-5 shrink-0 text-[#9E7E4F]" />
              <div className="w-full">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#78716C]">
                  Filter tretmana / salona
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="npr. Hair, Nail, Spa..."
                  className="w-full bg-transparent text-sm font-medium text-[#1C1917] placeholder-[#A8A29E] focus:outline-none"
                />
              </div>
            </div>

            {/* Polje 2: Pretraga po imenu grada (NEZAVISNO OD GPS LOKACIJE) */}
            <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#FAF8F5] px-4 py-3 lg:col-span-5">
              <div className="flex w-full items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#9E7E4F]" />
                <div className="w-full">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#78716C]">
                    Pretraži po gradu (npr. Bristol, London, Sarajevo)
                  </label>
                  <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSearchByCity();
                    }}
                    placeholder="Upiši naziv grada..."
                    className="w-full bg-transparent text-sm font-medium text-[#1C1917] placeholder-[#A8A29E] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSearchByCity()}
                disabled={isLoadingSalons || !cityInput.trim()}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#1C1917] px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] transition-colors hover:bg-[#9E7E4F] disabled:opacity-40"
              >
                {isLoadingSalons && searchMode === "city" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Calendar className="h-3.5 w-3.5" />
                )}
                <span>Traži grad</span>
              </button>
            </div>

            {/* Polje 3: Pretraga oko MOJE LOKACIJE (GPS + Radijus u km) */}
            <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#C6A87C]/35 bg-[#FAF3E8]/50 px-4 py-3 lg:col-span-4">
              <div className="flex items-center gap-2">
                <Radar className="h-4 w-4 shrink-0 text-[#8A6D43]" />
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#8A6D43]">
                    Radijus oko mene
                  </label>
                  <select
                    value={radiusKm}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setRadiusKm(val);
                      if (searchMode === "nearby") {
                        onSearchNearby(val);
                      }
                    }}
                    className="bg-transparent text-sm font-bold text-[#1C1917] focus:outline-none"
                  >
                    {RADIUS_OPTIONS.map((km) => (
                      <option key={km} value={km}>
                        Do {km} km
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSearchNearby()}
                disabled={isLoadingSalons}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[#1C1917] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1C1917] shadow-sm transition-colors hover:bg-[#1C1917] hover:text-white disabled:opacity-50"
              >
                {isLoadingSalons && searchMode === "nearby" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <LocateFixed className="h-3.5 w-3.5 text-[#9E7E4F]" />
                )}
                <span>Moja lokacija</span>
              </button>
            </div>
          </div>

          {/* Donji red: Kategorije + Brzi izbor gradova */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EAE1] px-2 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? "bg-[#1C1917] text-white shadow-sm"
                        : "bg-[#FAF8F5] text-[#57534E] hover:bg-[#EFE9E0] hover:text-[#1C1917]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#78716C]">
              <SlidersHorizontal className="mr-1 h-3.5 w-3.5 text-[#9E7E4F]" />
              <span>Brzi gradovi:</span>
              {POPULAR_CITIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCityInput(c);
                    onSearchByCity(c);
                  }}
                  className="rounded-md bg-[#FAF3E8] px-2.5 py-1 text-[11px] font-semibold text-[#8A6D43] transition-colors hover:bg-[#1C1917] hover:text-white"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}